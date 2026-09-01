// Tests for the local-only settings-storage adapter: settings persist in
// chrome.storage.local only (on-device, per profile), with a one-time
// migration that pulls legacy values out of storage.sync and then CLEARS
// sync so previously-uploaded settings are scrubbed from the sync backend.
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { storageGet, storageSet, storageRemove } from '../../src/utils/settings-storage.js';

function installChrome({ syncGetFails = false, noSync = false } = {}) {
    const sync = {};
    const local = {};
    let syncCleared = false;

    const okCb = (cb, result) => {
        global.chrome.runtime.lastError = null;
        if (cb) cb(result);
    };
    const failCb = (cb, result) => {
        global.chrome.runtime.lastError = { message: 'simulated failure' };
        if (cb) cb(result);
        global.chrome.runtime.lastError = null;
    };

    global.chrome = {
        runtime: { lastError: null },
        storage: {
            local: {
                set: (obj, cb) => { Object.assign(local, obj); okCb(cb); },
                get: (keys, cb) => {
                    const out = {};
                    (Array.isArray(keys) ? keys : Object.keys(keys)).forEach(k => {
                        if (k in local) out[k] = local[k];
                    });
                    okCb(cb, out);
                },
                remove: (keys, cb) => {
                    (Array.isArray(keys) ? keys : [keys]).forEach(k => delete local[k]);
                    okCb(cb);
                }
            },
            sync: noSync ? undefined : {
                get: (keys, cb) => {
                    if (syncGetFails) return failCb(cb, {});
                    // null = everything actually stored
                    okCb(cb, { ...sync });
                },
                clear: (cb) => {
                    Object.keys(sync).forEach(k => delete sync[k]);
                    syncCleared = true;
                    okCb(cb);
                }
            }
        }
    };
    return { sync, local, wasCleared: () => syncCleared };
}

describe('settings-storage adapter (local-only)', () => {
    let warnSpy;

    beforeEach(() => {
        warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
        warnSpy.mockRestore();
        delete global.chrome;
    });

    it('writes to local only and reads back over defaults', () => {
        const { sync, local } = installChrome();
        local._syncScrubbed = true; // already migrated

        storageSet({ highlightSpectrum: false });
        expect(local.highlightSpectrum).toBe(false);
        expect(Object.keys(sync)).toHaveLength(0); // sync never written

        let result;
        storageGet({ highlightSpectrum: true, highlightWeasel: true }, r => { result = r; });
        expect(result.highlightSpectrum).toBe(false); // stored
        expect(result.highlightWeasel).toBe(true);    // default preserved
        expect(result._syncScrubbed).toBeUndefined(); // marker never leaks out
    });

    it('first read migrates legacy sync values into local and clears sync', () => {
        const { sync, local, wasCleared } = installChrome();
        sync.enableAnalysis = false;      // legacy value, sync only
        sync.highlightDebate = false;
        local.highlightDebate = true;     // local already has a newer value

        let result;
        storageGet({ enableAnalysis: true, highlightDebate: true, highlightIsms: true }, r => { result = r; });

        expect(result.enableAnalysis).toBe(false);  // migrated from sync
        expect(result.highlightDebate).toBe(true);  // local wins over sync
        expect(result.highlightIsms).toBe(true);    // default preserved

        expect(local.enableAnalysis).toBe(false);   // persisted locally
        expect(local.highlightDebate).toBe(true);   // not clobbered by sync
        expect(local._syncScrubbed).toBe(true);     // marker set
        expect(wasCleared()).toBe(true);            // sync backend scrubbed
        expect(Object.keys(sync)).toHaveLength(0);
    });

    it('after migration, reads never touch sync again', () => {
        const { sync, local } = installChrome();
        local._syncScrubbed = true;
        sync.enableAnalysis = false; // would only appear if sync were read

        let result;
        storageGet({ enableAnalysis: true }, r => { result = r; });
        expect(result.enableAnalysis).toBe(true);
        expect(Object.keys(sync)).toHaveLength(1); // untouched, not cleared
    });

    it('keeps working from local/defaults when the scrub read fails, and retries later', () => {
        const { local } = installChrome({ syncGetFails: true });
        local.highlightFallacy = false;

        let result;
        storageGet({ highlightFallacy: true, highlightIsms: true }, r => { result = r; });
        expect(result.highlightFallacy).toBe(false);
        expect(result.highlightIsms).toBe(true);
        expect(local._syncScrubbed).toBeUndefined(); // no marker: scrub retries
        expect(warnSpy).toHaveBeenCalled();
    });

    it('handles storage.sync being entirely unavailable', () => {
        const { local } = installChrome({ noSync: true });
        local.highlightCivics = false;

        let result;
        storageGet({ highlightCivics: true }, r => { result = r; });
        expect(result.highlightCivics).toBe(false);
        expect(local._syncScrubbed).toBe(true); // nothing to scrub, marked done
    });

    it('removes keys from local', () => {
        const { local } = installChrome();
        local.highlight_custom_x = true;

        let doneCalled = false;
        storageRemove(['highlight_custom_x'], () => { doneCalled = true; });
        expect(doneCalled).toBe(true);
        expect('highlight_custom_x' in local).toBe(false);
    });
});
