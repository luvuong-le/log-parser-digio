import * as fs from "fs";
import * as readline from "readline";
import analyseConfig from "../config/analyse-config";
import LogStoreConfig from "../types/logStore";

export default class FileParser {
  private store: LogStoreConfig = {
    addresses: [],
    visitedUrls: [],
  };

  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  getStore() {
    return this.store;
  }

  storeAddressAndRequestCount(line: string, matches: RegExpExecArray | null) {
    const addressSearch = this.store.addresses.find(
      (address) => address.ip === matches!.groups!.ipAddress
    );

    return !addressSearch
      ? this.store.addresses.push({ ip: matches!.groups!.ipAddress, count: 0 })
      : addressSearch.count++;
  }

  storeVisitedUrls(line: string, matches: RegExpExecArray | null) {
    const urlMatches = new RegExp(analyseConfig.urlPathPattern).exec(
      matches!.groups!.url
    );

    const urlPath = urlMatches!.groups!.path.split("/");

    const urlPathRoot = urlPath.includes("http") ? urlPath[2] : urlPath[1];

    const urlSearch = this.store.visitedUrls.find(
      (url) => url.path === urlPathRoot
    );

    return !urlSearch
      ? this.store.visitedUrls.push({
          path: urlPathRoot,
          count: 0,
        })
      : urlSearch.count++;
  }

  getUniqueAddresses() {
    return this.store.addresses.length;
  }

  getActiveAddresses(limit: number) {
    const activeAddresses = this.store.addresses
      .sort((a, b) => b.count - a.count)
      .splice(0, limit);

    return activeAddresses.map((address) => address.ip);
  }

  getVisitedUrls(limit: number) {
    const visitedUrls = this.store.visitedUrls
      .sort((a, b) => b.count - a.count)
      .splice(0, limit);

    return visitedUrls.map((visited) =>
      visited.path !== "" ? visited.path : "/"
    );
  }

  printResults() {
    console.log(`✅ Unique IP Addresses: ${this.getUniqueAddresses()}`);
    console.log(`✅ Top 3 Active URLs: ${this.getActiveAddresses(3)}`);
    console.log(`✅ Top 3 Visited URLs: ${this.getVisitedUrls(3)}`);
  }

  async parseFile(callback: Function) {
    return await fs.promises
      .access(this.filePath)
      .then((res) => {
        const rl = readline.createInterface({
          input: fs.createReadStream(this.filePath),
          output: process.stdout,
          terminal: false,
        });

        rl.on("line", (line: string) => {
          if (line !== "") {
            const matches = new RegExp(analyseConfig.requestPattern).exec(line);
            this.storeAddressAndRequestCount(line, matches);
            this.storeVisitedUrls(line, matches);
          }
        });

        rl.on("close", () => callback());
      })
      .catch((err) => {
        console.error(err.message);
        return err.message;
      });
  }
}
