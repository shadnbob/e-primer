// Tests for the resilient settings-storage adapter: dual-write to sync+local,
// reads merging local over sync over defaults, and survival of a broken
// storage.sync backend (the silent-failure mode that made popup toggles
// appear to never persist).
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { storageGet, storageSet, storageRemove } from '../../src/utils/settings-storage.js';

function installChrome({ syncSetFails = false, syncGetFails = false } = {}) {
    const sync = {};
    const local = {};

    // Real Chrome scopes runtime.lastError to the current callback, so each
    // mock op sets it (or clears it) before invoking its own callback — a
    // nested call from within a failing callback must not inherit the error
    const failCb = (cb, result) => {
        global.chrome.runtime.lastError = { message: 'simulated sync failure' };
        cb(result);
        global.chrome.runtime.lastError = null;
    };
    const okCb = (cb, result) => {
        global.chrome.runtime.lastError = null;
        cb(result);
    };

    global.chrome = {
        runtime: { lastError: null },
        storage: {
            sync: {
                set: (obj, cb) => {
                    if (syncSetFails) return failCb(cb);
                    Object.assign(sync, obj);
                    okCb(cb);
                },
                get: (defaults, cb) => {
                    if (syncGetFails) return failCb(cb, {});
                    const out = { ...defaults };
                    Object.keys(defaults).forEach(k => { if (k in sync) out[k] = sync[k]; });
                    okCb(cb, out);
                },
                remove: (keys, cb) => {
                    (Array.isArray(keys) ? keys : [keys]).forEach(k => delete sync[k]);
                    okCb(cb);
                }
            },
            local: {
                set: (obj, cb) => {
                    Object.assign(local, obj);
                    okCb(cb);
                },
                // Array-of-keys form: returns only keys actually stored
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
            }
        }
    };
    return { sync, local };
}

describe('settings-storage adapter', () => {
    let warnSpy;

    beforeEach(() => {
        warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
        warnSpy.mockRestore();
        delete global.chrome;
    });

    it('dual-writes to sync and local, and reads back over defaults', () => {
        const { sync, local } = installChrome();
        let doneCalled = false;
        storageSet({ highlightSpectrum: false }, () => { doneCalled = true; });

        expect(doneCalled).toBe(true);
        expect(sync.highlightSpectrum).toBe(false);
        expect(local.highlightSpectrum).toBe(false);

        let result;
        storageGet({ highlightSpectrum: true, highlightWeasel: true }, r => { result = r; });
        expect(result.highlightSpectrum).toBe(false); // stored
        expect(result.highlightWeasel).toBe(true);    // default preserved
    });

    it('persists via local when sync.set silently fails, and reads it back', () => {
        const { sync, local } = installChrome({ syncSetFails: true });
        storageSet({ highlightDebate: false }, () => {});

        expect(sync.highlightDebate).toBeUndefined(); // sync write failed
        expect(local.highlightDebate).toBe(false);     // local write survived
        expect(warnSpy).toHaveBeenCalled();            // failure was surfaced

        let result;
        storageGet({ highlightDebate: true }, r => { result = r; });
        expect(result.highlightDebate).toBe(false);    // local overlay wins
    });

    it('local overlay beats a stale sync value', () => {
        const { sync, local } = installChrome();
        sync.enableAnalysis = true;   // stale cross-device value
        local.enableAnalysis = false; // this machine's latest write

        let result;
        storageGet({ enableAnalysis: true }, r => { result = r; });
        expect(result.enableAnalysis).toBe(false);
    });

    it('falls back to defaults+local when sync.get fails', () => {
        const { local } = installChrome({ syncGetFails: true });
        local.highlightFallacy = false;

        let result;
        storageGet({ highlightFallacy: true, highlightIsms: true }, r => { result = r; });
        expect(result.highlightFallacy).toBe(false);
        expect(result.highlightIsms).toBe(true);
        expect(warnSpy).toHaveBeenCalled();
    });

    it('removes keys from both areas', () => {
        const { sync, local } = installChrome();
        sync.highlight_custom_x = true;
        local.highlight_custom_x = true;

        let doneCalled = false;
        storageRemove(['highlight_custom_x'], () => { doneCalled = true; });
        expect(doneCalled).toBe(true);
        expect('highlight_custom_x' in sync).toBe(false);
        expect('highlight_custom_x' in local).toBe(false);
    });

    it('keys never dual-written still come from sync', () => {
        const { sync } = installChrome();
        sync.analysisMode = 'problems'; // saved before the dual-write era

        let result;
        storageGet({ analysisMode: 'balanced' }, r => { result = r; });
        expect(result.analysisMode).toBe('problems');
    });
});
