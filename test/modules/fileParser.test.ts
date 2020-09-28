import * as sinon from "sinon";
import { expect } from "chai";
import FileParser from "../../src/modules/fileParser";

describe("FileParser", () => {
  const fileParser = new FileParser("data/requests.log");

  beforeEach((done) => {
    fileParser.parseFile(done);
  });

  it("should parse a file correctly", () => {
    expect(fileParser.getUniqueAddresses()).greaterThan(0);
    expect(fileParser.getVisitedUrls(3).length).greaterThan(0);
  });

  it("should return an error if no file is found", async () => {
    const fileParser = new FileParser("data/empty-requests.log");
    await fileParser.parseFile(() => {});
    expect(fileParser.getUniqueAddresses()).equal(0);
  });

  it("should return correct unique addresses", () => {
    expect(fileParser.getUniqueAddresses()).equal(11);
  });

  it("should return top 3 visited URLs", () => {
    expect(fileParser.getVisitedUrls(3)).contains("docs");
  });

  it("should return top 3 active ip addresses", () => {
    expect(fileParser.getActiveAddresses(3)).contains("168.41.191.40");
  });

  it("should print results correctly", () => {
    const consoleStub = sinon.stub(console, "log");
    fileParser.printResults();
    expect(consoleStub.callCount).equal(3);
  });

  it("should return nothing if empty file", async () => {
    const fileParser = new FileParser("data/requests-not-found.log");
    const res = await fileParser.parseFile(() => {});
    expect(fileParser.getUniqueAddresses()).equal(0);
  });

  it("should return the log store", () => {
    expect(typeof fileParser.getStore()).equal("object");
  });
});
