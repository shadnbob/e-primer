// options/options.js - Options page logic. Bundled to options.js by build.js.
//
// Hosts the management surfaces that outgrew the popup: run behavior
// (auto/on-demand + disabled sites), highlight density, the ignored-words
// list, and full custom-dictionary CRUD with import/export. The popup keeps
// quick toggles and counts.
//
// Changes are written to storage and then broadcast to every open tab
// (updateSettings / reloadCustomDictionaries messages); tabs without the
// content script simply error, which is swallowed.

import { BiasConfig } from '../config/BiasConfig.js';
import { escapeHtml, sanitizeColor } from '../utils/sanitize.js';

document.addEventListener('DOMContentLoaded', function() {
    let currentSettings = {};
    let customGroups = [];
    let editingGroupId = null;

    // ---- storage & broadcast -------------------------------------------

    function loadAll() {
        chrome.storage.local.get('customGroups', function(data) {
            const stored = data.customGroups;
            customGroups = (stored && stored.version === 1 && stored.groups)
                ? Object.values(stored.groups)
                : [];

            const defaults = Object.assign({}, BiasConfig.getDefaultSettings());
            customGroups.forEach(g => { defaults[g.settingKey] = g.enabled !== false; });

            chrome.storage.sync.get(defaults, function(items) {
                currentSettings = items;
                renderAll();
            });
        });
    }

    function saveSettings(done) {
        chrome.storage.sync.set(currentSettings, function() {
            broadcast({ action: 'updateSettings', settings: currentSettings });
            if (done) done();
        });
    }

    function saveCustomGroups(done) {
        const groups = {};
        let maxCounter = 0;
        customGroups.forEach(g => {
            groups[g.id] = g;
            const m = g.id.match(/_(\d+)$/);
            if (m) maxCounter = Math.max(maxCounter, parseInt(m[1], 10));
        });
        chrome.storage.local.set({ customGroups: { version: 1, idCounter: maxCounter, groups } }, function() {
            chrome.storage.sync.set(currentSettings, function() {
                broadcast({ action: 'reloadCustomDictionaries' });
                if (done) done();
            });
        });
    }

    function broadcast(message) {
        chrome.tabs.query({}, function(tabs) {
            tabs.forEach(tab => {
                if (tab.id === undefined) return;
                chrome.tabs.sendMessage(tab.id, message, function() {
                    // Tabs without the content script reject; that's fine
                    void chrome.runtime.lastError;
                });
            });
        });
    }

    function flash(id) {
        const el = document.getElementById(id);
        if (!el) return;
        el.classList.add('show');
        setTimeout(() => el.classList.remove('show'), 1600);
    }

    // ---- rendering -------------------------------------------------------

    function renderAll() {
        document.querySelectorAll('input[name="siteMode"]').forEach(input => {
            input.checked = input.value === (currentSettings.siteMode || 'auto');
        });
        document.querySelectorAll('input[name="density"]').forEach(input => {
            input.checked = input.value === (currentSettings.highlightDensity || 'standard');
        });
        document.getElementById('disabledSites').value = (currentSettings.disabledSites || []).join('\n');
        document.getElementById('ignoredWords').value = (currentSettings.ignoredWords || []).join('\n');
        renderGroupList();
    }

    function renderGroupList() {
        const list = document.getElementById('groupList');
        if (!customGroups.length) {
            list.innerHTML = '<div class="empty">No custom groups yet.</div>';
            return;
        }
        list.innerHTML = customGroups.map(g => `
            <div class="group-row">
                <span class="group-dot" style="background: ${sanitizeColor(g.color)};"></span>
                <span class="group-name">${escapeHtml(g.name)}</span>
                <span class="group-count">${g.words.length} terms</span>
                <button class="btn secondary" data-edit="${escapeHtml(g.id)}">Edit</button>
            </div>
        `).join('');
        list.querySelectorAll('[data-edit]').forEach(btn => {
            btn.addEventListener('click', () => openEditor(btn.dataset.edit));
        });
    }

    function parseLines(value) {
        return Array.from(new Set(
            value.split('\n').map(s => s.trim().toLowerCase()).filter(Boolean)
        ));
    }

    // ---- run behavior / density / ignored words --------------------------

    document.querySelectorAll('input[name="siteMode"]').forEach(input => {
        input.addEventListener('change', e => {
            currentSettings.siteMode = e.target.value === 'ondemand' ? 'ondemand' : 'auto';
            saveSettings();
        });
    });

    document.querySelectorAll('input[name="density"]').forEach(input => {
        input.addEventListener('change', e => {
            currentSettings.highlightDensity = e.target.value;
            saveSettings();
        });
    });

    document.getElementById('saveSites').addEventListener('click', () => {
        currentSettings.disabledSites = parseLines(document.getElementById('disabledSites').value);
        document.getElementById('disabledSites').value = currentSettings.disabledSites.join('\n');
        saveSettings(() => flash('sitesSaved'));
    });

    document.getElementById('saveIgnored').addEventListener('click', () => {
        currentSettings.ignoredWords = parseLines(document.getElementById('ignoredWords').value);
        document.getElementById('ignoredWords').value = currentSettings.ignoredWords.join('\n');
        saveSettings(() => flash('ignoredSaved'));
    });

    // ---- custom dictionary CRUD ------------------------------------------

    function openEditor(groupId) {
        editingGroupId = groupId || null;
        const editor = document.getElementById('editor');
        const del = document.getElementById('deleteGroup');

        if (groupId) {
            const g = customGroups.find(x => x.id === groupId);
            if (!g) return;
            document.getElementById('editorTitle').textContent = 'Edit: ' + g.name;
            document.getElementById('groupName').value = g.name;
            document.getElementById('groupDesc').value = g.description || '';
            document.getElementById('groupColor').value = sanitizeColor(g.color);
            document.getElementById('groupWords').value = (g.words || []).join('\n');
            del.style.display = 'inline-block';
        } else {
            document.getElementById('editorTitle').textContent = 'New Custom Group';
            document.getElementById('groupName').value = '';
            document.getElementById('groupDesc').value = '';
            document.getElementById('groupColor').value = '#e67e22';
            document.getElementById('groupWords').value = '';
            del.style.display = 'none';
        }
        editor.style.display = 'block';
        document.getElementById('groupName').focus();
    }

    function closeEditor() {
        document.getElementById('editor').style.display = 'none';
        editingGroupId = null;
    }

    document.getElementById('addGroup').addEventListener('click', () => openEditor(null));
    document.getElementById('cancelGroup').addEventListener('click', closeEditor);

    document.getElementById('saveGroup').addEventListener('click', () => {
        const name = document.getElementById('groupName').value.trim();
        const description = document.getElementById('groupDesc').value.trim();
        const color = sanitizeColor(document.getElementById('groupColor').value);
        const words = document.getElementById('groupWords').value
            .split('\n').map(w => w.trim()).filter(Boolean);

        if (!name) { alert('Group name is required'); return; }
        if (!words.length) { alert('Add at least one word or phrase'); return; }

        if (editingGroupId) {
            const g = customGroups.find(x => x.id === editingGroupId);
            if (g) {
                g.name = name;
                g.description = description;
                g.color = color;
                g.words = words.slice(0, 1000);
                g.hoverContent = { basicTip: description || 'Custom detection: ' + name };
                g.updatedAt = Date.now();
            }
        } else {
            const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '').substring(0, 30);
            const id = 'custom_' + slug + '_' + Date.now();
            customGroups.push({
                id, name, color, description,
                enabled: true,
                words: words.slice(0, 1000),
                hoverContent: { basicTip: description || 'Custom detection: ' + name },
                settingKey: 'highlight_' + id,
                statKey: id + 'Count',
                className: 'bias-highlight-custom-' + id,
                createdAt: Date.now(),
                updatedAt: Date.now()
            });
            currentSettings['highlight_' + id] = true;
        }

        saveCustomGroups(() => {
            renderGroupList();
            closeEditor();
        });
    });

    document.getElementById('deleteGroup').addEventListener('click', () => {
        if (!editingGroupId) return;
        if (!confirm('Delete this custom group?')) return;
        const removed = customGroups.find(g => g.id === editingGroupId);
        customGroups = customGroups.filter(g => g.id !== editingGroupId);
        if (removed) delete currentSettings[removed.settingKey];
        saveCustomGroups(() => {
            renderGroupList();
            closeEditor();
        });
    });

    document.getElementById('exportGroups').addEventListener('click', () => {
        if (!customGroups.length) { alert('No custom groups to export'); return; }
        const data = {
            version: 1,
            exportedAt: new Date().toISOString(),
            groups: customGroups.map(g => ({
                name: g.name, color: g.color, description: g.description,
                words: g.words, hoverContent: g.hoverContent
            }))
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'custom-dictionaries.json';
        a.click();
        URL.revokeObjectURL(url);
    });

    document.getElementById('importGroups').addEventListener('click', () => {
        document.getElementById('importFile').click();
    });

    document.getElementById('importFile').addEventListener('change', event => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = e => {
            try {
                const data = JSON.parse(e.target.result);
                if (!data.groups || !Array.isArray(data.groups)) {
                    alert('Invalid import file format');
                    return;
                }
                let imported = 0;
                for (const g of data.groups) {
                    if (!g.name || customGroups.length >= 50) continue;
                    const slug = String(g.name).toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '').substring(0, 30);
                    const id = 'custom_' + slug + '_' + Date.now() + '_' + imported;
                    customGroups.push({
                        id,
                        name: String(g.name),
                        color: sanitizeColor(g.color),
                        description: g.description || '',
                        enabled: true,
                        words: (g.words || []).slice(0, 1000),
                        hoverContent: g.hoverContent || { basicTip: g.description || 'Custom: ' + g.name },
                        settingKey: 'highlight_' + id,
                        statKey: id + 'Count',
                        className: 'bias-highlight-custom-' + id,
                        createdAt: Date.now(),
                        updatedAt: Date.now()
                    });
                    currentSettings['highlight_' + id] = true;
                    imported++;
                }
                saveCustomGroups(() => {
                    renderGroupList();
                    alert('Imported ' + imported + ' group(s)');
                });
            } catch (err) {
                alert('Failed to import: ' + err.message);
            }
        };
        reader.readAsText(file);
        event.target.value = '';
    });

    loadAll();
});
