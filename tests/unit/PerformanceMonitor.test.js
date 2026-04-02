import { PerformanceMonitor } from '../../src/utils/PerformanceMonitor.js';

describe('PerformanceMonitor', () => {
  let monitor;

  beforeEach(() => {
    monitor = new PerformanceMonitor();
  });

  afterEach(() => {
    monitor.cleanup();
  });

  describe('Constructor', () => {

    test('should initialize with empty maps and enabled', () => {
      expect(monitor.timers).toBeInstanceOf(Map);
      expect(monitor.metrics).toBeInstanceOf(Map);
      expect(monitor.enabled).toBe(true);
    });
  });

  describe('start and end', () => {

    test('should track timer and return duration', () => {
      monitor.start('test-timer');
      const duration = monitor.end('test-timer');
      expect(typeof duration).toBe('number');
      expect(duration).toBeGreaterThanOrEqual(0);
    });

    test('should return 0 when ending non-existent timer', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const duration = monitor.end('nonexistent');
      expect(duration).toBe(0);
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    test('should not start when disabled', () => {
      monitor.disable();
      monitor.start('test');
      expect(monitor.timers.size).toBe(0);
    });

    test('should return 0 when ending while disabled', () => {
      monitor.disable();
      const duration = monitor.end('test');
      expect(duration).toBe(0);
    });

    test('should accumulate metrics for repeated measurements', () => {
      monitor.start('repeated');
      monitor.end('repeated');
      monitor.start('repeated');
      monitor.end('repeated');

      const metric = monitor.getMetric('repeated');
      expect(metric.count).toBe(2);
      expect(metric.totalTime).toBeGreaterThanOrEqual(0);
      expect(metric.averageTime).toBeGreaterThanOrEqual(0);
    });

    test('should track min and max times', () => {
      monitor.start('minmax');
      monitor.end('minmax');

      const metric = monitor.getMetric('minmax');
      expect(metric.minTime).toBeLessThanOrEqual(metric.maxTime);
    });
  });

  describe('getMetrics', () => {

    test('should return copy of all metrics', () => {
      monitor.start('a');
      monitor.end('a');

      const metrics = monitor.getMetrics();
      expect(metrics).toHaveProperty('a');
      expect(metrics.a.count).toBe(1);
    });

    test('should return empty object when no metrics', () => {
      const metrics = monitor.getMetrics();
      expect(Object.keys(metrics)).toHaveLength(0);
    });
  });

  describe('getMetric', () => {

    test('should return undefined for non-existent metric', () => {
      expect(monitor.getMetric('nonexistent')).toBeUndefined();
    });
  });

  describe('reset', () => {

    test('should clear timers and metrics', () => {
      monitor.start('test');
      monitor.end('test');
      monitor.reset();

      expect(monitor.timers.size).toBe(0);
      expect(monitor.metrics.size).toBe(0);
    });
  });

  describe('enable and disable', () => {

    test('should toggle enabled state', () => {
      monitor.disable();
      expect(monitor.enabled).toBe(false);
      monitor.enable();
      expect(monitor.enabled).toBe(true);
    });
  });

  describe('getMemoryUsage', () => {

    test('should return null when performance.memory is unavailable', () => {
      const result = monitor.getMemoryUsage();
      expect(result).toBeNull();
    });

    test('should return memory info when available', () => {
      const originalPerformance = global.performance;
      Object.defineProperty(global, 'performance', {
        value: {
          ...originalPerformance,
          now: originalPerformance.now.bind(originalPerformance),
          memory: {
            usedJSHeapSize: 10 * 1024 * 1024,
            totalJSHeapSize: 50 * 1024 * 1024,
            jsHeapSizeLimit: 2048 * 1024 * 1024
          }
        },
        configurable: true
      });

      const result = monitor.getMemoryUsage();
      expect(result).not.toBeNull();
      expect(result.used).toBe(10);
      expect(result.total).toBe(50);
      expect(result.limit).toBe(2048);

      Object.defineProperty(global, 'performance', {
        value: originalPerformance,
        configurable: true
      });
    });
  });

  describe('logSummary', () => {

    test('should not log when disabled', () => {
      const consoleSpy = vi.spyOn(console, 'group').mockImplementation(() => {});
      monitor.disable();
      monitor.logSummary();
      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    test('should log summary when enabled with metrics', () => {
      const groupSpy = vi.spyOn(console, 'group').mockImplementation(() => {});
      const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      const groupEndSpy = vi.spyOn(console, 'groupEnd').mockImplementation(() => {});

      monitor.start('test');
      monitor.end('test');
      monitor.logSummary();

      expect(groupSpy).toHaveBeenCalledWith('Performance Summary');
      expect(logSpy).toHaveBeenCalled();
      expect(groupEndSpy).toHaveBeenCalled();

      groupSpy.mockRestore();
      logSpy.mockRestore();
      groupEndSpy.mockRestore();
    });

    test('should log memory when available', () => {
      const originalPerformance = global.performance;
      Object.defineProperty(global, 'performance', {
        value: {
          ...originalPerformance,
          now: originalPerformance.now.bind(originalPerformance),
          memory: {
            usedJSHeapSize: 10 * 1024 * 1024,
            totalJSHeapSize: 50 * 1024 * 1024,
            jsHeapSizeLimit: 2048 * 1024 * 1024
          }
        },
        configurable: true
      });

      const groupSpy = vi.spyOn(console, 'group').mockImplementation(() => {});
      const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      const groupEndSpy = vi.spyOn(console, 'groupEnd').mockImplementation(() => {});

      monitor.logSummary();

      expect(logSpy).toHaveBeenCalledWith('Memory:', expect.stringContaining('MB'));

      groupSpy.mockRestore();
      logSpy.mockRestore();
      groupEndSpy.mockRestore();

      Object.defineProperty(global, 'performance', {
        value: originalPerformance,
        configurable: true
      });
    });
  });

  describe('cleanup', () => {

    test('should reset and disable', () => {
      monitor.start('test');
      monitor.cleanup();

      expect(monitor.timers.size).toBe(0);
      expect(monitor.metrics.size).toBe(0);
      expect(monitor.enabled).toBe(false);
    });
  });
});
