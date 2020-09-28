import { Command, flags } from "@oclif/command";
import FileParser from "../modules/fileParser";

export default class Analyse extends Command {
  static description = "Analyse log file with HTTP Requests";

  static flags = {
    help: flags.help({ char: "h" }),
    file: flags.string({ char: "f", required: true }),
  };

  static args = [];

  async run() {
    const { flags } = this.parse(Analyse);
    const fileParser = new FileParser(flags.file);
    fileParser.parseFile(() => fileParser.printResults());
  }
}
