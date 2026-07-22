// utils/settings-storage.js - Resilient settings persistence.
//
// chrome.storage.sync can fail or be unavailable per-profile (quota,
// throttling, sync backend disabled), and those failures used to be
// invisible: no set() callback checked chrome.runtime.lastError, so a
// toggle looked saved while storage kept its old values and every page
// load came back all-defaults. Settings now dual-write to sync AND local,
// and reads merge local over sync over defaults — the machine-local copy
// always wins, so persistence survives a broken sync backend while sync
// still propagates across devices when it works. Failures log loudly.
//
// Uses the callback-style chrome.* API, which Firefox also supports, so
// callers need no browser/chrome branching.

export function storageSet(patch, done) {
    let pending = 2;
    const finish = () => {
        pending -= 1;
        if (pending === 0 && done) done();
    };
    const writeArea = (area, label) => {
        try {
            area.set(patch, () => {
                if (chrome.runtime.lastError) {
                    console.warn(`e-primer: storage.${label}.set failed:`, chrome.runtime.lastError.message);
                }
                finish();
            });
        } catch (e) {
            console.warn(`e-primer: storage.${label}.set threw:`, e && e.message);
            finish();
        }
    };
    writeArea(chrome.storage.sync, 'sync');
    writeArea(chrome.storage.local, 'local');
}

export function storageRemove(keys, done) {
    let pending = 2;
    const finish = () => {
        pending -= 1;
        if (pending === 0 && done) done();
    };
    const removeArea = (area, label) => {
        try {
            area.remove(keys, () => {
                if (chrome.runtime.lastError) {
                    console.warn(`e-primer: storage.${label}.remove failed:`, chrome.runtime.lastError.message);
                }
                finish();
            });
        } catch (e) {
            console.warn(`e-primer: storage.${label}.remove threw:`, e && e.message);
            finish();
        }
    };
    removeArea(chrome.storage.sync, 'sync');
    removeArea(chrome.storage.local, 'local');
}

export function storageGet(defaults, done) {
    const readArea = (area, keys, label, cb) => {
        try {
            area.get(keys, (items) => {
                if (chrome.runtime.lastError) {
                    console.warn(`e-primer: storage.${label}.get failed:`, chrome.runtime.lastError.message);
                    cb({});
                    return;
                }
                cb(items || {});
            });
        } catch (e) {
            console.warn(`e-primer: storage.${label}.get threw:`, e && e.message);
            cb({});
        }
    };
    readArea(chrome.storage.sync, defaults, 'sync', (syncItems) => {
        // Querying local with a keys ARRAY returns only keys actually stored
        // there, so anything never dual-written falls through to sync/defaults
        readArea(chrome.storage.local, Object.keys(defaults), 'local', (localItems) => {
            done(Object.assign({}, defaults, syncItems, localItems));
        });
    });
}
