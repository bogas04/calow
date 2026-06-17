import { describe, it } from "node:test";
import assert from "node:assert";
import { computeArithmeticExpression } from "./primitives";

describe("computeArithmeticExpression", () => {
  it("supports multiplication and division with precedence", () => {
    assert.strictEqual(computeArithmeticExpression("1+2*3"), 7);
    assert.strictEqual(computeArithmeticExpression("10-2*3"), 4);
    assert.strictEqual(computeArithmeticExpression("2*3+4"), 10);
    assert.strictEqual(computeArithmeticExpression("2+3*4-5"), 9);
  });

  it("handles division and multiplication in the same expression", () => {
    assert.strictEqual(computeArithmeticExpression("6/2+3"), 6);
    assert.strictEqual(computeArithmeticExpression("6/2*3"), 9);
    assert.strictEqual(computeArithmeticExpression("8+4/2*3-1"), 13);
  });

  it("returns NaN for division by zero", () => {
    assert.ok(Number.isNaN(computeArithmeticExpression("1/0")));
    assert.ok(Number.isNaN(computeArithmeticExpression("5+2/0")));
    assert.ok(Number.isNaN(computeArithmeticExpression("5*0/0+1")));
  });

  it("ignores whitespace and accepts decimal numbers", () => {
    assert.strictEqual(computeArithmeticExpression(" 1 + 2 * 3 "), 7);
    assert.strictEqual(computeArithmeticExpression("10 / 4 + 1"), 3.5);
    assert.strictEqual(computeArithmeticExpression("1.5*2 + 0.5"), 3.5);
  });

  it("returns NaN for invalid input", () => {
    assert.ok(Number.isNaN(computeArithmeticExpression("foo")));
    assert.ok(Number.isNaN(computeArithmeticExpression("1++2")));
    assert.ok(Number.isNaN(computeArithmeticExpression("2*/3")));
  });
});
