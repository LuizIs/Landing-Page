import assert from "node:assert/strict";
import test from "node:test";
import {
  clampProgress,
  countOccurrences,
  hasAttribute,
} from "../../scripts/site-contracts.mjs";

test("clampProgress normalizes scroll progress", () => {
  assert.equal(clampProgress(0, 100), 0);
  assert.equal(clampProgress(50, 100), 0.5);
  assert.equal(clampProgress(150, 100), 1);
  assert.equal(clampProgress(-10, 100), 0);
  assert.equal(clampProgress(50, 0), 0);
});

test("hasAttribute detects HTML attributes case-insensitively", () => {
  const html = '<img loading="lazy" decoding="async" />';
  assert.equal(hasAttribute(html, "img", "loading"), true);
  assert.equal(hasAttribute(html, "img", "fetchpriority"), false);
});

test("countOccurrences counts repeated contracts", () => {
  assert.equal(countOccurrences("lazy lazy eager", /lazy/g), 2);
});
