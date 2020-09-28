type Address = {
  ip: string;
  count: number;
};

type Url = {
  path: string;
  count: number;
};

type LogStore = {
  addresses: Array<Address>;
  visitedUrls: Array<Url>;
};

export default LogStore;
