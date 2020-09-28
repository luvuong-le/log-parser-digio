import * as sinon from "sinon";
import { expect } from "chai";
import FileParser from "../../src/modules/fileParser";

describe("FileParser", () => {
  let fileParser: FileParser;

  beforeEach((done) => {
    fileParser = new FileParser("data/requests.log");
    fileParser.parseFile(done);
  });

  it("should parse a file correctly", () => {
    expect(fileParser.getUniqueAddresses()).greaterThan(0);
    expect(fileParser.getVisitedUrls(3).length).greaterThan(0);
  });

  it("should return nothing if empty file", async () => {
    const fileParser = new FileParser("data/empty-requests.log");
    await fileParser.parseFile(() => {
      expect(fileParser.getUniqueAddresses()).equal(0);
    });
  });

  it("should return correct unique addresses", () => {
    expect(fileParser.getUniqueAddresses()).equal(11);
  });

  it("should return top 3 visited URLs", () => {
    expect(fileParser.getVisitedUrls(3)[0]).contains("docs");
  });

  it("should return top 3 active ip addresses", () => {
    expect(fileParser.getActiveAddresses(3)).contains("168.41.191.40");
  });

  it("should print results correctly", () => {
    const log = sinon.spy(console, "log");
    fileParser.printResults();

    expect(log.called).equal(true);
    expect(log.callCount).equal(3);
  });

  it("should return an error if file does not exist", async () => {
    const errorLog = sinon.spy(console, "error");
    const fileParser = new FileParser("data/requests-not-found.log");
    const result = await fileParser.parseFile(() => {});

    expect(result).contains("no such file");
    expect(errorLog.called).equal(true);
  });

  it("should return the log store", () => {
    expect(typeof fileParser.getStore()).equal("object");
  });
});
