import fs from 'fs';
import path from 'path';

import { TaskContext } from 'vitest';

export const TESTS_DIR = path.resolve(__dirname, '../');

export const TMP_DIR = path.resolve(TESTS_DIR, '.tmp');

export const FIXTURES_DIR = path.resolve(TESTS_DIR, 'fixtures');

export const resolveTmpDir = (caseName: string) => path.join(TMP_DIR, caseName);

export const resolveFixturesDir = (p: string) => path.join(FIXTURES_DIR, p);

export const setupTmpDir = async (ctx: TaskContext) => {
  const caseDir = resolveTmpDir(ctx.task.id);
  await fs.promises.mkdir(caseDir, { recursive: true });
  return caseDir;
};

export const clearTmpDirs = () =>
  fs.promises.rm(TMP_DIR, {
    force: true,
    recursive: true,
  });
