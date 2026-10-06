import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { countOccurrences, hasAttribute } from "../../scripts/site-contracts.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const html = await fs.readFile(path.join(root, "index.html"), "utf8");
const script = await fs.readFile(path.join(root, "script.js"), "utf8");
const styles = await fs.readFile(path.join(root, "styles.css"), "utf8");

test("critical page contracts are present", () => {
  assert.match(html, /<h1[\s\S]*?Barbearia Levittado/);
  assert.match(html, /rel="canonical"/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /class="page-progress"/);
});

test("non-critical images keep lazy loading", () => {
  assert.ok(countOccurrences(html, /loading="lazy"/g) >= 3);
  assert.equal(hasAttribute(html, "img", "decoding"), true);
});

test("motion system keeps reduced-motion support", () => {
  assert.match(styles, /prefers-reduced-motion:\s*reduce/);
  assert.match(script, /requestAnimationFrame/);
  assert.match(script, /scaleX/);
});

test("map has an explicit loading state", () => {
  assert.match(html, /map-card is-loading/);
  assert.match(script, /aria-busy/);
});
