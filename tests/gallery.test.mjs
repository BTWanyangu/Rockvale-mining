import test from "node:test";
import assert from "node:assert/strict";
import { filterImages, wrapIndex } from "../src/lib/gallery.ts";
const photos = [
  { id: "a", category: "Surface", alt: "Loader at open-pit mine" },
  { id: "b", category: "Underground", alt: "Loader inside rock workings" },
  { id: "c", category: "Materials", alt: "Tray of coloured stones" },
];
test("category filtering preserves only the requested category", () => {
  assert.deepEqual(filterImages(photos, "All"), photos);
  assert.deepEqual(
    filterImages(photos, "Surface").map((i) => i.id),
    ["a"],
  );
});
test("gallery search ignores case and surrounding whitespace", () => {
  assert.deepEqual(
    filterImages(photos, "All", "  LOADER ").map((i) => i.id),
    ["a", "b"],
  );
  assert.deepEqual(
    filterImages(photos, "All", "materials").map((i) => i.id),
    ["c"],
  );
});
test("category and query combine, including empty results", () => {
  assert.deepEqual(
    filterImages(photos, "Underground", "loader").map((i) => i.id),
    ["b"],
  );
  assert.deepEqual(filterImages(photos, "Materials", "loader"), []);
});
test("lightbox navigation wraps in both directions and handles an empty collection", () => {
  assert.equal(wrapIndex(-1, 3), 2);
  assert.equal(wrapIndex(3, 3), 0);
  assert.equal(wrapIndex(7, 3), 1);
  assert.equal(wrapIndex(1, 0), 0);
});
