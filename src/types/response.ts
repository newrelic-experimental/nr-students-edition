export type LambdaResponse = {
  headers: HeaderOption | HeaderOptionWithRedirect;
  statusCode: number;
  body: string;
};

export type FailedResponseBody = {
  internalStatusCode: number;
  message: string;
};

export interface HeaderOption {
  'Access-Control-Allow-Origin': string;
}

export interface HeaderOptionWithRedirect {
  'Access-Control-Allow-Origin': string;
  'Location': string;
}
