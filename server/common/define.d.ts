import { IncomingMessage, ServerResponse } from 'http';

export interface Server {
  log(req: IncomingMessage): void;
}
export interface Filter {
  (
    req: IncomingMessage,
    res: ServerResponse,
    url: libUrl.UrlWithParsedQuery
  ): boolean;
}

export interface RequestListener {
  (
    this: Server,
    req: IncomingMessage,
    res: ServerResponse,
    url: libUrl.UrlWithParsedQuery
  ): void;
}
