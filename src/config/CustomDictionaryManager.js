import { BiasConfig } from './BiasConfig.js';

export class CustomDictionaryManager {
    static MAX_GROUPS = 50;
    static MAX_WORDS_PER_GROUP = 1000;
    static STORAGE_KEY = 'customGroups';
    static SCHEMA_VERSION = 1;
    static ID_PREFIX = 'custom_';
    static CSS_CLASS_PREFIX = 'bias-highlight-custom-';

    constructor() {
        this.groups = new Map();
        this.compiledPatterns = new Map();
        this.listeners = new Map();
        this._idCounter = 0;
        this._loaded = false;
    }

    async load() {
        try {
            const data = await this._storageGet(CustomDictionaryManager.STORAGE_KEY);
            const stored = data[CustomDictionaryManager.STORAGE_KEY];
            if (stored && stored.version === CustomDictionaryManager.SCHEMA_VERSION) {
                for (const [id, group] of Object.entries(stored.groups || {})) {
                    this.groups.set(id, group);
                }
                this._idCounter = stored.idCounter || 0;
            }
            this._compileAll();
            this._loaded = true;
        } catch (error) {
            console.warn('CustomDictionaryManager: failed to load', error?.message ?? String(error));
            this._loaded = true;
        }
    }

    async save() {
        const payload = {
            version: CustomDictionaryManager.SCHEMA_VERSION,
            idCounter: this._idCounter,
            groups: Object.fromEntries(this.groups)
        };
        await this._storageSet({ [CustomDictionaryManager.STORAGE_KEY]: payload });
    }

    _generateId(name) {
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '').substring(0, 30);
        this._idCounter++;
        return `${CustomDictionaryManager.ID_PREFIX}${slug}_${this._idCounter}`;
    }

    async createGroup({ name, color = '#e67e22', description = '', words = [], hoverContent = {} }) {
        if (this.groups.size >= CustomDictionaryManager.MAX_GROUPS) {
            throw new Error(`Maximum of ${CustomDictionaryManager.MAX_GROUPS} custom groups reached`);
        }
        if (!name || !name.trim()) {
            throw new Error('Group name is required');
        }

        const id = this._generateId(name);
        const group = {
            id,
            name: name.trim(),
            color,
            description: description.trim(),
            enabled: true,
            words: words.slice(0, CustomDictionaryManager.MAX_WORDS_PER_GROUP),
            hoverContent: {
                basicTip: hoverContent.basicTip || description.trim() || `Custom detection: ${name.trim()}`,
                whenConcerning: hoverContent.whenConcerning || '',
                whenAcceptable: hoverContent.whenAcceptable || '',
                suggestion: hoverContent.suggestion || ''
            },
            settingKey: `highlight_${id}`,
            statKey: `${id}Count`,
            className: `${CustomDictionaryManager.CSS_CLASS_PREFIX}${id}`,
            createdAt: Date.now(),
            updatedAt: Date.now()
        };

        this.groups.set(id, group);
        this._compileGroup(id);
        await this.save();
        this._emit('groupCreated', group);
        return group;
    }

    async updateGroup(id, updates) {
        const group = this.groups.get(id);
        if (!group) throw new Error(`Group not found: ${id}`);

        if (updates.name !== undefined) group.name = updates.name.trim();
        if (updates.color !== undefined) group.color = updates.color;
        if (updates.description !== undefined) group.description = updates.description.trim();
        if (updates.enabled !== undefined) group.enabled = updates.enabled;
        if (updates.words !== undefined) {
            group.words = updates.words.slice(0, CustomDictionaryManager.MAX_WORDS_PER_GROUP);
        }
        if (updates.hoverContent !== undefined) {
            group.hoverContent = { ...group.hoverContent, ...updates.hoverContent };
        }
        group.updatedAt = Date.now();

        this._compileGroup(id);
        await this.save();
        this._emit('groupUpdated', group);
        return group;
    }

    async deleteGroup(id) {
        const group = this.groups.get(id);
        if (!group) throw new Error(`Group not found: ${id}`);

        this.groups.delete(id);
        this.compiledPatterns.delete(id);
        await this.save();
        this._emit('groupDeleted', { id });
    }

    getGroup(id) {
        return this.groups.get(id) || null;
    }

    getAllGroups() {
        return Array.from(this.groups.values());
    }

    getEnabledGroups() {
        return this.getAllGroups().filter(g => g.enabled);
    }

    getCompiledPatterns(groupId) {
        return this.compiledPatterns.get(groupId) || [];
    }

    getAllCompiledPatterns() {
        return this.compiledPatterns;
    }

    _compileAll() {
        this.compiledPatterns.clear();
        for (const id of this.groups.keys()) {
            this._compileGroup(id);
        }
    }

    _compileGroup(id) {
        const group = this.groups.get(id);
        if (!group) return;

        const compiled = [];
        for (const word of group.words) {
            const pattern = this._compileWord(word, id);
            if (pattern) compiled.push(pattern);
        }
        this.compiledPatterns.set(id, compiled);
    }

    _compileWord(word, groupId) {
        const clean = word.trim();
        if (!clean) return null;

        try {
            const isComplex = clean.includes('\\') || clean.includes('(') || clean.includes('[');
            let regexPattern;

            if (isComplex) {
                regexPattern = clean;
            } else {
                const escaped = clean.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                regexPattern = clean.includes(' ') ? escaped : `\\b${escaped}\\b`;
            }

            const regex = new RegExp(regexPattern, 'gi');
            regex.test('test string');

            return {
                source: clean,
                regex,
                type: groupId,
                isComplex
            };
        } catch (error) {
            console.warn(`CustomDictionaryManager: invalid pattern "${clean}"`, error?.message ?? String(error));
            return null;
        }
    }

    getSettingsDefaults() {
        const defaults = {};
        for (const group of this.groups.values()) {
            defaults[group.settingKey] = group.enabled;
        }
        return defaults;
    }

    getEmptyStats() {
        const stats = {};
        for (const group of this.groups.values()) {
            stats[group.statKey] = 0;
        }
        return stats;
    }

    getGroupBySettingKey(settingKey) {
        for (const group of this.groups.values()) {
            if (group.settingKey === settingKey) return group;
        }
        return null;
    }

    generateCSS() {
        let css = '';
        for (const group of this.groups.values()) {
            css += `
.${group.className} {
    background-color: ${group.color}33;
    border-bottom: 2px solid ${group.color};
    cursor: pointer;
    transition: background-color 0.2s ease;
}
.${group.className}:hover {
    background-color: ${group.color}55;
}
`;
        }
        return css;
    }

    async exportGroups(groupIds = null) {
        const groups = groupIds
            ? groupIds.map(id => this.groups.get(id)).filter(Boolean)
            : this.getAllGroups();

        return {
            version: CustomDictionaryManager.SCHEMA_VERSION,
            exportedAt: new Date().toISOString(),
            groups: groups.map(g => ({
                name: g.name,
                color: g.color,
                description: g.description,
                words: g.words,
                hoverContent: g.hoverContent
            }))
        };
    }

    async importGroups(data) {
        if (!data || !data.groups || !Array.isArray(data.groups)) {
            throw new Error('Invalid import data format');
        }

        const imported = [];
        for (const groupData of data.groups) {
            if (!groupData.name) continue;
            if (this.groups.size >= CustomDictionaryManager.MAX_GROUPS) break;

            const group = await this.createGroup({
                name: groupData.name,
                color: groupData.color || '#e67e22',
                description: groupData.description || '',
                words: groupData.words || [],
                hoverContent: groupData.hoverContent || {}
            });
            imported.push(group);
        }
        return imported;
    }

    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(callback);
    }

    off(event, callback) {
        const cbs = this.listeners.get(event);
        if (cbs) {
            this.listeners.set(event, cbs.filter(cb => cb !== callback));
        }
    }

    _emit(event, data) {
        const cbs = this.listeners.get(event) || [];
        for (const cb of cbs) {
            try { cb(data); } catch (e) { console.warn('Event listener error:', e); }
        }
    }

    _storageGet(key) {
        return new Promise((resolve, reject) => {
            if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
                chrome.storage.local.get(key, (result) => {
                    if (chrome.runtime.lastError) {
                        reject(new Error(chrome.runtime.lastError.message));
                    } else {
                        resolve(result);
                    }
                });
            } else {
                resolve({});
            }
        });
    }

    _storageSet(data) {
        return new Promise((resolve, reject) => {
            if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
                chrome.storage.local.set(data, () => {
                    if (chrome.runtime.lastError) {
                        reject(new Error(chrome.runtime.lastError.message));
                    } else {
                        resolve();
                    }
                });
            } else {
                resolve();
            }
        });
    }
}
