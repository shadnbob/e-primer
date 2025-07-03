// utils/PerformanceMonitor.js - Performance tracking utilities
export class PerformanceMonitor {
    constructor() {
        this.timers = new Map();
        this.metrics = new Map();
        this.enabled = true;
    }

    start(label) {
        if (!this.enabled) return;
        
        this.timers.set(label, {
            startTime: performance.now(),
            label
        });
    }

    end(label) {
        if (!this.enabled) return 0;
        
        const timer = this.timers.get(label);
        if (!timer) {
            console.warn(`Performance timer '${label}' was not started`);
            return 0;
        }

        const duration = performance.now() - timer.startTime;
        this.timers.delete(label);

        // Store metric
        if (!this.metrics.has(label)) {
            this.metrics.set(label, {
                count: 0,
                totalTime: 0,
                averageTime: 0,
                minTime: Infinity,
                maxTime: 0
            });
        }

        const metric = this.metrics.get(label);
        metric.count++;
        metric.totalTime += duration;
        metric.averageTime = metric.totalTime / metric.count;
        metric.minTime = Math.min(metric.minTime, duration);
        metric.maxTime = Math.max(metric.maxTime, duration);

        console.log(`Performance: ${label} completed in ${duration.toFixed(2)}ms`);
        return duration;
    }

    getMetrics() {
        const metrics = {};
        for (const [label, data] of this.metrics) {
            metrics[label] = { ...data };
        }
        return metrics;
    }

    getMetric(label) {
        return this.metrics.get(label);
    }

    reset() {
        this.timers.clear();
        this.metrics.clear();
    }

    enable() {
        this.enabled = true;
    }

    disable() {
        this.enabled = false;
    }

    // Memory usage monitoring
    getMemoryUsage() {
        if (performance.memory) {
            return {
                used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
                total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
                limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024)
            };
        }
        return null;
    }

    // Log performance summary
    logSummary() {
        if (!this.enabled) return;
        
        console.group('Performance Summary');
        
        for (const [label, metric] of this.metrics) {
            console.log(`${label}:`, {
                calls: metric.count,
                average: `${metric.averageTime.toFixed(2)}ms`,
                min: `${metric.minTime.toFixed(2)}ms`,
                max: `${metric.maxTime.toFixed(2)}ms`,
                total: `${metric.totalTime.toFixed(2)}ms`
            });
        }

        const memory = this.getMemoryUsage();
        if (memory) {
            console.log('Memory:', `${memory.used}MB / ${memory.total}MB (limit: ${memory.limit}MB)`);
        }

        console.groupEnd();
    }

    cleanup() {
        this.reset();
        this.enabled = false;
    }
}

// Export a singleton instance for global use
export const performanceMonitor = new PerformanceMonitor();
