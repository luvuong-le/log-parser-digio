export default {
  requestPattern: /(?<ipAddress>[(\d\.)]+) (.*?) \[(.*?)\] "(?<url>.*?)" (?<status>\d+) (\d+) "-" "(.*?) \((.*?)\)(.*)/gi,
  urlPathPattern: /(.*?) (?<path>.*?) (.*)/gi,
}
