import { expect, test } from "@oclif/test";

describe("Analyse Command", () => {
  test
    .command(["analyse", "--file"])
    .exit(2)
    .it("should throw an error if no file is chosen");
});
