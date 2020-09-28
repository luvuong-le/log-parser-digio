import * as fs from "fs";
import * as readline from "readline";
import config from "../config/analyse-config";
import LogStore from "../types/logStore";

export default class FileParser {
  private store: LogStore = {
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

  /**
   * Store an array of objects with ip addresses and request count
   *
   * @param  {string} line
   * @param  {RegExpExecArray|null} matches
   */
  storeAddressAndRequestCount(line: string, matches: RegExpExecArray | null) {
    const addressSearch = this.store.addresses.find(
      (address) => address.ip === matches!.groups!.ipAddress
    );

    return !addressSearch
      ? this.store.addresses.push({ ip: matches!.groups!.ipAddress, count: 0 })
      : addressSearch.count++;
  }

  /**
   * Store an array of objects of visited urls based on first primary url /blog/test = /blog and the visit count
   *
   * @param  {string} line
   * @param  {RegExpExecArray|null} matches
   */
  storeVisitedUrls(line: string, matches: RegExpExecArray | null) {
    const urlMatches = new RegExp(config.urlPathPattern).exec(
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

  printResults() {
    console.log(`✅ Unique IP Addresses: ${this.getUniqueAddresses()}`);
    console.log(
      `✅ Top ${
        config.activeAddressLimit
      } Active IP Addresses: ${this.getActiveAddresses(
        config.activeAddressLimit
      )}`
    );
    console.log(
      `✅ Top ${config.visitedUrlLimit} Visited URLs: ${this.getVisitedUrls(
        config.visitedUrlLimit
      )}`
    );
  }

  parseFile(callback: Function) {
    return fs.promises
      .access(this.filePath)
      .then((_) => {
        const rl = readline.createInterface({
          input: fs.createReadStream(this.filePath),
          output: process.stdout,
          terminal: false,
        });

        rl.on("line", (line: string) => {
          if (line !== "") {
            const matches = new RegExp(config.requestPattern).exec(line);
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
