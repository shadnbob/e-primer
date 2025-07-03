// popup/StatsDisplay.js - Statistics display utility
import { BiasConfig } from '../config/BiasConfig.js';

export class StatsDisplay {
    constructor(container) {
        this.container = container;
        this.statElements = new Map();
        this.lastKnownStats = BiasConfig.createEmptyStats();
        this.isUpdating = false;
        
        this.createStatsUI();
    }

    // Create the statistics UI
    createStatsUI() {
        if (!this.container) return;

        // Clear existing content
        this.container.innerHTML = '';

        // Create stats grid
        const statsGrid = document.createElement('div');
        statsGrid.className = 'stats-grid';

        // Organize by category
        const categorized = BiasConfig.getSettingsByCategory();

        for (const [category, biasTypes] of Object.entries(categorized)) {
            const categorySection = this.createCategorySection(category, biasTypes);
            statsGrid.appendChild(categorySection);
        }

        this.container.appendChild(statsGrid);
    }

    createCategorySection(category, biasTypes) {
        const section = document.createElement('div');
        section.className = `stats-category stats-category-${category}`;

        const categoryInfo = BiasConfig.CATEGORIES[category];
        
        // Category header
        const header = document.createElement('div');
        header.className = 'stats-category-header';
        header.innerHTML = `
            <span class="category-icon">${categoryInfo.icon}</span>
            <span class="category-name">${categoryInfo.name}</span>
        `;
        section.appendChild(header);

        // Stats for this category
        const statsContainer = document.createElement('div');
        statsContainer.className = 'stats-items';

        for (const config of biasTypes) {
            const statItem = this.createStatItem(config);
            statsContainer.appendChild(statItem);
            
            // Store reference to the count element
            const countElement = statItem.querySelector('.stat-count');
            this.statElements.set(config.statKey, countElement);
        }

        section.appendChild(statsContainer);
        return section;
    }

    createStatItem(config) {
        const item = document.createElement('div');
        item.className = 'stat-item';
        item.innerHTML = `
            <div class="stat-info">
                <div class="stat-name">${config.name}</div>
                <div class="stat-description">${config.description}</div>
            </div>
            <div class="stat-count" data-type="${config.id}">-</div>
        `;

        // Add color indicator
        const colorIndicator = document.createElement('div');
        colorIndicator.className = 'stat-color-indicator';
        colorIndicator.style.backgroundColor = config.color;
        item.appendChild(colorIndicator);

        return item;
    }

    // Update statistics display
    updateStats(stats) {
        if (this.isUpdating) return;
        this.isUpdating = true;

        try {
            // Update last known stats if provided
            if (stats && typeof stats === 'object') {
                this.lastKnownStats = { ...this.lastKnownStats, ...stats };
            }

            // Update each stat element
            for (const [statKey, element] of this.statElements) {
                if (element) {
                    const value = this.lastKnownStats[statKey];
                    element.textContent = value !== undefined ? value : '-';
                    
                    // Add visual feedback for non-zero values
                    if (value > 0) {
                        element.classList.add('has-matches');
                        element.parentElement.classList.add('active');
                    } else {
                        element.classList.remove('has-matches');
                        element.parentElement.classList.remove('active');
                    }
                }
            }

            // Update total count
            this.updateTotalCount();

        } catch (error) {
            console.error('Error updating stats display:', error);
        } finally {
            this.isUpdating = false;
        }
    }

    // Update total count display
    updateTotalCount() {
        const total = Object.values(this.lastKnownStats).reduce((sum, val) => {
            return sum + (typeof val === 'number' ? val : 0);
        }, 0);

        // Update any total count elements
        const totalElements = this.container.querySelectorAll('.total-count');
        totalElements.forEach(element => {
            element.textContent = total;
        });

        // Update container class based on activity
        if (total > 0) {
            this.container.classList.add('has-activity');
        } else {
            this.container.classList.remove('has-activity');
        }
    }

    // Get current stats
    getCurrentStats() {
        return { ...this.lastKnownStats };
    }

    // Reset all stats to zero
    resetStats() {
        this.lastKnownStats = BiasConfig.createEmptyStats();
        this.updateStats(this.lastKnownStats);
    }

    // Show loading state
    showLoading() {
        for (const element of this.statElements.values()) {
            if (element) {
                element.textContent = '...';
                element.classList.add('loading');
            }
        }
    }

    // Hide loading state
    hideLoading() {
        for (const element of this.statElements.values()) {
            if (element) {
                element.classList.remove('loading');
            }
        }
    }

    // Show error state
    showError(message = 'Error loading stats') {
        for (const element of this.statElements.values()) {
            if (element) {
                element.textContent = '!';
                element.classList.add('error');
                element.title = message;
            }
        }
    }

    // Clear error state
    clearError() {
        for (const element of this.statElements.values()) {
            if (element) {
                element.classList.remove('error');
                element.removeAttribute('title');
            }
        }
    }

    // Get stats summary for export
    getStatsSummary() {
        const total = Object.values(this.lastKnownStats).reduce((sum, val) => sum + val, 0);
        const activeTypes = Object.entries(this.lastKnownStats)
            .filter(([key, value]) => value > 0)
            .map(([key, value]) => {
                const config = Object.values(BiasConfig.BIAS_TYPES)
                    .find(c => c.statKey === key);
                return config ? `${config.name}: ${value}` : `${key}: ${value}`;
            });

        return {
            total,
            breakdown: activeTypes,
            timestamp: new Date().toISOString()
        };
    }

    // Destroy the stats display
    destroy() {
        this.statElements.clear();
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}
