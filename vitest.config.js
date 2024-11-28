import os from 'os';

import { configDefaults, defineConfig, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config';

const workersCount = Math.max(1, os.cpus().length - 1);

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      cache: false,
      css: false,
      clearMocks: true,
      coverage: {
        all: true,
        branches: 75,
        exclude: [...configDefaults.exclude],
        functions: 80,
        include: ['src/**'],
        lines: 80,
        provider: 'v8',
        reportsDirectory: './report/coverage',
        statements: 75,
      },
      environment: 'node',
      exclude: [...configDefaults.exclude],
      globals: true,
      globalSetup: './vitest-setup.js',
      maxConcurrency: workersCount,
      maxWorkers: workersCount,
      minWorkers: workersCount,
      pool: 'forks',
      retry: 1,
      sequence: {
        hooks: 'list',
      },
      testTimeout: 30000,
    },
  }),
);
