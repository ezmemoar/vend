export type FetchOptions = {
  baseUrl?: string;
  method?:
    | "POST"
    | "options"
    | "GET"
    | "HEAD"
    | "PATCH"
    | "PUT"
    | "DELETE"
    | "CONNECT"
    | "OPTIONS"
    | "TRACE"
    | "post"
    | "get"
    | "head"
    | "patch"
    | "put"
    | "delete"
    | "connect"
    | "trace"
    | undefined;
  body?: string;
  ignoreResponseError?: boolean;
  integrity?: string;
  keepalive?: boolean;
  duplex?: "half";
  cache?: RequestCache;
  credentials?: RequestCredentials;
  headers?: HeadersInit;
  mode?: RequestMode;
};
