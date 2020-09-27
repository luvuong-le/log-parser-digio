log-parser
==========

Log Parser for HTTP Requests

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/log-parser.svg)](https://npmjs.org/package/log-parser)
[![Codecov](https://codecov.io/gh/luvuong-le/log-parser-digio/branch/master/graph/badge.svg)](https://codecov.io/gh/luvuong-le/log-parser-digio)
[![Downloads/week](https://img.shields.io/npm/dw/log-parser.svg)](https://npmjs.org/package/log-parser)
[![License](https://img.shields.io/npm/l/log-parser.svg)](https://github.com/luvuong-le/log-parser-digio/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g log-parser
$ log-parser COMMAND
running command...
$ log-parser (-v|--version|version)
log-parser/0.0.0 win32-x64 node-v12.16.1
$ log-parser --help [COMMAND]
USAGE
  $ log-parser COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`log-parser hello [FILE]`](#log-parser-hello-file)
* [`log-parser help [COMMAND]`](#log-parser-help-command)

## `log-parser hello [FILE]`

describe the command here

```
USAGE
  $ log-parser hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ log-parser hello
  hello world from ./src/hello.ts!
```

_See code: [src\commands\hello.ts](https://github.com/luvuong-le/log-parser-digio/blob/v0.0.0/src\commands\hello.ts)_

## `log-parser help [COMMAND]`

display help for log-parser

```
USAGE
  $ log-parser help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src\commands\help.ts)_
<!-- commandsstop -->
