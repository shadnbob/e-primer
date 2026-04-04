import { describe, test, expect, beforeEach, vi } from 'vitest';
import { CustomDictionaryManager } from '../../src/config/CustomDictionaryManager.js';

describe('CustomDictionaryManager', () => {
    let manager;

    beforeEach(() => {
        vi.stubGlobal('chrome', {
            storage: {
                local: {
                    get: vi.fn((key, cb) => cb({})),
                    set: vi.fn((data, cb) => cb())
                }
            },
            runtime: { lastError: null }
        });
        manager = new CustomDictionaryManager();
    });

    describe('Initialization', () => {
        test('should start empty', () => {
            expect(manager.groups.size).toBe(0);
            expect(manager.compiledPatterns.size).toBe(0);
        });

        test('should load from storage', async () => {
            chrome.storage.local.get.mockImplementation((key, cb) => cb({
                customGroups: {
                    version: 1,
                    idCounter: 3,
                    groups: {
                        custom_jargon_1: {
                            id: 'custom_jargon_1',
                            name: 'Jargon',
                            color: '#ff0000',
                            description: 'Tech jargon',
                            enabled: true,
                            words: ['synergy', 'leverage'],
                            hoverContent: { basicTip: 'Tech jargon detected' },
                            settingKey: 'highlight_custom_jargon_1',
                            statKey: 'custom_jargon_1Count',
                            className: 'bias-highlight-custom-custom_jargon_1'
                        }
                    }
                }
            }));

            await manager.load();
            expect(manager.groups.size).toBe(1);
            expect(manager.getGroup('custom_jargon_1').name).toBe('Jargon');
            expect(manager.compiledPatterns.get('custom_jargon_1').length).toBe(2);
        });

        test('should handle missing storage gracefully', async () => {
            await manager.load();
            expect(manager.groups.size).toBe(0);
            expect(manager._loaded).toBe(true);
        });

        test('should ignore incompatible schema versions', async () => {
            chrome.storage.local.get.mockImplementation((key, cb) => cb({
                customGroups: { version: 999, groups: { x: {} } }
            }));
            await manager.load();
            expect(manager.groups.size).toBe(0);
        });
    });

    describe('CRUD Operations', () => {
        beforeEach(async () => {
            await manager.load();
        });

        test('should create a group', async () => {
            const group = await manager.createGroup({
                name: 'Corporate Speak',
                color: '#3498db',
                description: 'Corporate buzzwords',
                words: ['synergy', 'leverage', 'paradigm shift']
            });

            expect(group.id).toMatch(/^custom_corporate_speak_/);
            expect(group.name).toBe('Corporate Speak');
            expect(group.color).toBe('#3498db');
            expect(group.words).toHaveLength(3);
            expect(group.enabled).toBe(true);
            expect(group.settingKey).toMatch(/^highlight_custom_/);
            expect(group.statKey).toMatch(/Count$/);
            expect(manager.groups.size).toBe(1);
        });

        test('should compile patterns on create', async () => {
            const group = await manager.createGroup({
                name: 'Test',
                words: ['hello', 'world']
            });

            const patterns = manager.getCompiledPatterns(group.id);
            expect(patterns).toHaveLength(2);
            expect(patterns[0].regex).toBeInstanceOf(RegExp);
            expect(patterns[0].regex.test('hello world')).toBe(true);
        });

        test('should update a group', async () => {
            const group = await manager.createGroup({ name: 'Test', words: ['a'] });
            const updated = await manager.updateGroup(group.id, {
                name: 'Updated',
                words: ['b', 'c'],
                color: '#ff0000'
            });

            expect(updated.name).toBe('Updated');
            expect(updated.words).toEqual(['b', 'c']);
            expect(updated.color).toBe('#ff0000');
            expect(updated.updatedAt).toBeGreaterThanOrEqual(updated.createdAt);
        });

        test('should recompile patterns on update', async () => {
            const group = await manager.createGroup({ name: 'Test', words: ['a'] });
            expect(manager.getCompiledPatterns(group.id)).toHaveLength(1);

            await manager.updateGroup(group.id, { words: ['x', 'y', 'z'] });
            expect(manager.getCompiledPatterns(group.id)).toHaveLength(3);
        });

        test('should delete a group', async () => {
            const group = await manager.createGroup({ name: 'Test', words: ['a'] });
            expect(manager.groups.size).toBe(1);

            await manager.deleteGroup(group.id);
            expect(manager.groups.size).toBe(0);
            expect(manager.compiledPatterns.has(group.id)).toBe(false);
        });

        test('should throw on delete nonexistent group', async () => {
            await expect(manager.deleteGroup('fake_id')).rejects.toThrow('Group not found');
        });

        test('should throw on update nonexistent group', async () => {
            await expect(manager.updateGroup('fake_id', {})).rejects.toThrow('Group not found');
        });

        test('should require group name', async () => {
            await expect(manager.createGroup({ name: '' })).rejects.toThrow('Group name is required');
            await expect(manager.createGroup({ name: '  ' })).rejects.toThrow('Group name is required');
        });

        test('should enforce max groups limit', async () => {
            for (let i = 0; i < CustomDictionaryManager.MAX_GROUPS; i++) {
                await manager.createGroup({ name: `Group ${i}`, words: ['a'] });
            }
            await expect(manager.createGroup({ name: 'One too many' }))
                .rejects.toThrow(/Maximum/);
        });

        test('should enforce max words per group', async () => {
            const words = Array.from({ length: 1500 }, (_, i) => `word${i}`);
            const group = await manager.createGroup({ name: 'Big', words });
            expect(group.words.length).toBe(CustomDictionaryManager.MAX_WORDS_PER_GROUP);
        });
    });

    describe('Pattern Compilation', () => {
        beforeEach(async () => {
            await manager.load();
        });

        test('should compile simple words with word boundaries', async () => {
            const group = await manager.createGroup({ name: 'T', words: ['leverage'] });
            const patterns = manager.getCompiledPatterns(group.id);
            expect(patterns[0].regex.source).toContain('\\b');
            expect(patterns[0].regex.test('leverage')).toBe(true);
            expect(patterns[0].regex.flags).toBe('gi');
        });

        test('should compile multi-word phrases without word boundaries', async () => {
            const group = await manager.createGroup({ name: 'T', words: ['moving forward'] });
            const patterns = manager.getCompiledPatterns(group.id);
            expect(patterns[0].regex.source).not.toContain('\\b');
            expect(patterns[0].regex.test('we are moving forward with the plan')).toBe(true);
        });

        test('should compile regex patterns as-is', async () => {
            const group = await manager.createGroup({ name: 'T', words: ['\\b(synergy|leverage)\\b'] });
            const patterns = manager.getCompiledPatterns(group.id);
            expect(patterns[0].isComplex).toBe(true);
            expect('synergy'.match(patterns[0].regex)).toBeTruthy();
            expect('leverage'.match(patterns[0].regex)).toBeTruthy();
        });

        test('should skip invalid regex gracefully', async () => {
            const group = await manager.createGroup({ name: 'T', words: ['valid', '(invalid['] });
            const patterns = manager.getCompiledPatterns(group.id);
            expect(patterns).toHaveLength(1);
            expect(patterns[0].source).toBe('valid');
        });

        test('should skip empty words', async () => {
            const group = await manager.createGroup({ name: 'T', words: ['a', '', '  ', 'b'] });
            const patterns = manager.getCompiledPatterns(group.id);
            expect(patterns).toHaveLength(2);
        });
    });

    describe('Settings and Stats', () => {
        beforeEach(async () => {
            await manager.load();
        });

        test('should generate settings defaults', async () => {
            await manager.createGroup({ name: 'A', words: ['x'] });
            await manager.createGroup({ name: 'B', words: ['y'] });
            const defaults = manager.getSettingsDefaults();
            expect(Object.keys(defaults)).toHaveLength(2);
            expect(Object.values(defaults).every(v => v === true)).toBe(true);
        });

        test('should generate empty stats', async () => {
            await manager.createGroup({ name: 'A', words: ['x'] });
            const stats = manager.getEmptyStats();
            expect(Object.keys(stats)).toHaveLength(1);
            expect(Object.values(stats).every(v => v === 0)).toBe(true);
        });

        test('should find group by setting key', async () => {
            const group = await manager.createGroup({ name: 'Test', words: ['x'] });
            const found = manager.getGroupBySettingKey(group.settingKey);
            expect(found).toBe(group);
        });

        test('should return null for unknown setting key', () => {
            expect(manager.getGroupBySettingKey('nonexistent')).toBeNull();
        });
    });

    describe('CSS Generation', () => {
        beforeEach(async () => {
            await manager.load();
        });

        test('should generate CSS for all groups', async () => {
            await manager.createGroup({ name: 'Red', color: '#ff0000', words: ['a'] });
            await manager.createGroup({ name: 'Blue', color: '#0000ff', words: ['b'] });
            const css = manager.generateCSS();
            expect(css).toContain('#ff000033');
            expect(css).toContain('#0000ff33');
            expect(css).toContain('border-bottom');
            expect(css).toContain('cursor: pointer');
        });

        test('should return empty string with no groups', () => {
            expect(manager.generateCSS()).toBe('');
        });
    });

    describe('Import/Export', () => {
        beforeEach(async () => {
            await manager.load();
        });

        test('should export all groups', async () => {
            await manager.createGroup({ name: 'A', color: '#111', words: ['x', 'y'], description: 'desc' });
            const exported = await manager.exportGroups();

            expect(exported.version).toBe(1);
            expect(exported.exportedAt).toBeDefined();
            expect(exported.groups).toHaveLength(1);
            expect(exported.groups[0].name).toBe('A');
            expect(exported.groups[0].words).toEqual(['x', 'y']);
            expect(exported.groups[0].id).toBeUndefined();
        });

        test('should export specific groups', async () => {
            const g1 = await manager.createGroup({ name: 'A', words: ['x'] });
            await manager.createGroup({ name: 'B', words: ['y'] });
            const exported = await manager.exportGroups([g1.id]);

            expect(exported.groups).toHaveLength(1);
            expect(exported.groups[0].name).toBe('A');
        });

        test('should import groups', async () => {
            const data = {
                version: 1,
                groups: [
                    { name: 'Imported', color: '#abc', words: ['test'], description: 'imported group' }
                ]
            };
            const imported = await manager.importGroups(data);

            expect(imported).toHaveLength(1);
            expect(imported[0].name).toBe('Imported');
            expect(manager.groups.size).toBe(1);
        });

        test('should roundtrip export/import', async () => {
            await manager.createGroup({ name: 'Original', color: '#123', words: ['alpha', 'beta'] });
            const exported = await manager.exportGroups();

            const manager2 = new CustomDictionaryManager();
            await manager2.load();
            const imported = await manager2.importGroups(exported);

            expect(imported).toHaveLength(1);
            expect(imported[0].name).toBe('Original');
            expect(imported[0].words).toEqual(['alpha', 'beta']);
        });

        test('should reject invalid import data', async () => {
            await expect(manager.importGroups(null)).rejects.toThrow('Invalid import data');
            await expect(manager.importGroups({})).rejects.toThrow('Invalid import data');
            await expect(manager.importGroups({ groups: 'not array' })).rejects.toThrow('Invalid import data');
        });

        test('should skip nameless groups during import', async () => {
            const data = { groups: [{ words: ['a'] }, { name: 'Valid', words: ['b'] }] };
            const imported = await manager.importGroups(data);
            expect(imported).toHaveLength(1);
            expect(imported[0].name).toBe('Valid');
        });
    });

    describe('Events', () => {
        beforeEach(async () => {
            await manager.load();
        });

        test('should emit groupCreated event', async () => {
            const handler = vi.fn();
            manager.on('groupCreated', handler);
            await manager.createGroup({ name: 'Test', words: ['a'] });
            expect(handler).toHaveBeenCalledOnce();
            expect(handler.mock.calls[0][0].name).toBe('Test');
        });

        test('should emit groupUpdated event', async () => {
            const handler = vi.fn();
            manager.on('groupUpdated', handler);
            const group = await manager.createGroup({ name: 'Test', words: ['a'] });
            await manager.updateGroup(group.id, { name: 'Updated' });
            expect(handler).toHaveBeenCalledOnce();
            expect(handler.mock.calls[0][0].name).toBe('Updated');
        });

        test('should emit groupDeleted event', async () => {
            const handler = vi.fn();
            manager.on('groupDeleted', handler);
            const group = await manager.createGroup({ name: 'Test', words: ['a'] });
            await manager.deleteGroup(group.id);
            expect(handler).toHaveBeenCalledOnce();
            expect(handler.mock.calls[0][0].id).toBe(group.id);
        });

        test('should remove event listener with off', async () => {
            const handler = vi.fn();
            manager.on('groupCreated', handler);
            manager.off('groupCreated', handler);
            await manager.createGroup({ name: 'Test', words: ['a'] });
            expect(handler).not.toHaveBeenCalled();
        });
    });

    describe('Query Methods', () => {
        beforeEach(async () => {
            await manager.load();
        });

        test('should get all groups', async () => {
            await manager.createGroup({ name: 'A', words: ['x'] });
            await manager.createGroup({ name: 'B', words: ['y'] });
            expect(manager.getAllGroups()).toHaveLength(2);
        });

        test('should get enabled groups only', async () => {
            const g1 = await manager.createGroup({ name: 'A', words: ['x'] });
            await manager.createGroup({ name: 'B', words: ['y'] });
            await manager.updateGroup(g1.id, { enabled: false });
            expect(manager.getEnabledGroups()).toHaveLength(1);
        });

        test('should return null for unknown group', () => {
            expect(manager.getGroup('nonexistent')).toBeNull();
        });
    });

    describe('Storage Persistence', () => {
        test('should call chrome.storage.local.set on save', async () => {
            await manager.load();
            await manager.createGroup({ name: 'Test', words: ['a'] });
            expect(chrome.storage.local.set).toHaveBeenCalled();
            const savedData = chrome.storage.local.set.mock.calls.at(-1)[0];
            expect(savedData.customGroups.version).toBe(1);
            expect(Object.keys(savedData.customGroups.groups)).toHaveLength(1);
        });

        test('should handle storage errors gracefully on load', async () => {
            chrome.storage.local.get.mockImplementation((key, cb) => {
                chrome.runtime.lastError = { message: 'Storage error' };
                cb({});
                chrome.runtime.lastError = null;
            });
            await manager.load();
            expect(manager._loaded).toBe(true);
            expect(manager.groups.size).toBe(0);
        });
    });
});
