// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Test file patterns  
    include: ['tests/**/*.test.js'],
    
    // Environment for DOM testing
    environment: 'jsdom',
    
    // Global test utilities (like Jest's global describe, test, expect)
    globals: true,
    
    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*'],
      exclude: [
        'src/**/*.test.js',
        'src/**/*.cjs', // We'll remove these soon
        'node_modules/**'
      ]
    },
    
    // Timeout for tests
    testTimeout: 10000,
    
    // Setup files if needed
    // setupFiles: ['./tests/setup.js']
  }
});