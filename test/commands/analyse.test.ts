import { test } from "@oclif/test";

describe("Analyse Command", () => {
  test
    .command(["analyse", "--file"])
    .exit(2)
    .it("should throw an exit code of 2 if no file argument is passed in");
});
