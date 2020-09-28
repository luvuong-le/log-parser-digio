type Address = {
  ip: string;
  count: number;
};

type Url = {
  path: string;
  count: number;
};

type LogStoreConfig = {
  addresses: Array<Address>;
  visitedUrls: Array<Url>;
};

export default LogStoreConfig;
