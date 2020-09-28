export default {
  requestPattern: /(?<ipAddress>[(\d\.)]+) (.*?) \[(.*?)\] "(?<url>.*?)" (?<status>\d+) (\d+) "-" "(.*?) \((.*?)\)(.*)/gi,
  urlPathPattern: /(.*?) (?<path>.*?) (.*)/gi,
  visitedUrlLimit: 3,
  activeAddressLimit: 3,
};
