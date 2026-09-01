// utils/settings-storage.js - Local-only settings persistence.
//
// Settings live in chrome.storage.local ONLY: on-device, per browser
// profile, never uploaded anywhere. storage.sync is deliberately not used
// for saving — cross-browser syncing of which categories a person reads
// with is a privacy trade we don't want (and sync can also fail or
// throttle silently, which once made popup toggles appear to never
// persist).
//
// The one remaining touch of storage.sync is a one-time SCRUB: earlier
// versions saved settings there, so on first read we migrate anything
// found in sync into local and then clear sync — removing the
// already-uploaded values from the sync backend rather than just
// abandoning them. A local marker keeps every later read local-only.
//
// Every operation checks chrome.runtime.lastError and logs loudly.
// Uses the callback-style chrome.* API, which Firefox also supports.

const SCRUB_MARKER = '_syncScrubbed';

export function storageSet(patch, done) {
    try {
        chrome.storage.local.set(patch, () => {
            if (chrome.runtime.lastError) {
                console.warn('e-primer: storage.local.set failed:', chrome.runtime.lastError.message);
            }
            if (done) done();
        });
    } catch (e) {
        console.warn('e-primer: storage.local.set threw:', e && e.message);
        if (done) done();
    }
}

export function storageRemove(keys, done) {
    try {
        chrome.storage.local.remove(keys, () => {
            if (chrome.runtime.lastError) {
                console.warn('e-primer: storage.local.remove failed:', chrome.runtime.lastError.message);
            }
            if (done) done();
        });
    } catch (e) {
        console.warn('e-primer: storage.local.remove threw:', e && e.message);
        if (done) done();
    }
}

export function storageGet(defaults, done) {
    // Array-of-keys form returns only keys actually stored, so unsaved
    // keys fall through to defaults
    const wanted = Object.keys(defaults).concat([SCRUB_MARKER]);
    readLocal(wanted, (localItems) => {
        if (localItems[SCRUB_MARKER]) {
            delete localItems[SCRUB_MARKER];
            done(Object.assign({}, defaults, localItems));
            return;
        }
        migrateAndScrubSync(localItems, (syncItems) => {
            delete localItems[SCRUB_MARKER];
            done(Object.assign({}, defaults, syncItems, localItems));
        });
    });
}

function readLocal(keys, cb) {
    try {
        chrome.storage.local.get(keys, (items) => {
            if (chrome.runtime.lastError) {
                console.warn('e-primer: storage.local.get failed:', chrome.runtime.lastError.message);
                cb({});
                return;
            }
            cb(items || {});
        });
    } catch (e) {
        console.warn('e-primer: storage.local.get threw:', e && e.message);
        cb({});
    }
}

// One-time: pull whatever the old versions left in storage.sync (null =
// only keys actually stored there), persist it into local under the
// values local doesn't already have, then clear sync so the settings no
// longer exist in the sync backend. Concurrent runs (several tabs on
// first load) are harmless — set/clear are idempotent here.
function migrateAndScrubSync(localItems, cb) {
    let syncArea;
    try {
        syncArea = chrome.storage.sync;
        if (!syncArea || typeof syncArea.get !== 'function') throw new Error('storage.sync unavailable');
    } catch (e) {
        storageSet({ [SCRUB_MARKER]: true });
        cb({});
        return;
    }

    try {
        syncArea.get(null, (syncItems) => {
            if (chrome.runtime.lastError) {
                console.warn('e-primer: storage.sync.get failed during scrub:', chrome.runtime.lastError.message);
                // Don't set the marker: retry the scrub on a later load
                cb({});
                return;
            }
            syncItems = syncItems || {};
            const keep = {};
            for (const [key, value] of Object.entries(syncItems)) {
                if (!(key in localItems)) keep[key] = value;
            }
            keep[SCRUB_MARKER] = true;
            storageSet(keep, () => {
                try {
                    syncArea.clear(() => {
                        if (chrome.runtime.lastError) {
                            console.warn('e-primer: storage.sync.clear failed:', chrome.runtime.lastError.message);
                        }
                    });
                } catch (e) {
                    console.warn('e-primer: storage.sync.clear threw:', e && e.message);
                }
            });
            delete keep[SCRUB_MARKER];
            cb(keep);
        });
    } catch (e) {
        console.warn('e-primer: storage.sync.get threw during scrub:', e && e.message);
        cb({});
    }
}
