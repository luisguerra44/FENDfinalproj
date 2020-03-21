require("regenerator-runtime/runtime");

import { inputCheck} from "./inputCheck.js";

describe('RegExp: input', function () {
  it('should be a string', function () {
    const urlRGEX = /^[a-zA-Z\s]{0,255}$/;
    const urlTest = 'au$tin';
    expect(urlRGEX.test(urlTest)).toBe(false);
  });
});