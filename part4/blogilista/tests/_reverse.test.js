const { test, describe } = require("node:test");
const assert = require("node:assert");

const reverse = require("../utils/for_testing").reverse;

describe("Reverse function", () => {
  test("reverses a string", () => {
    const result = reverse("a");
    assert.strictEqual(result, "a");
  });

  test("reverse of react", () => {
    const result = reverse("react");
    assert.strictEqual(result, "tcaer");
  });

  test("reverse of a sentence", () => {
    const result = reverse("sentence");
    assert.strictEqual(result, "ecnetnes");
  });
});
