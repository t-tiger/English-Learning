import { NextFunction, Request, Response } from "express";
import * as mcache from "memory-cache";

export const cache = (sec: number, contentType: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const key = `__express__${req.originalUrl || req.url}`;
    const cacheBody = mcache.get(key);
    if (cacheBody) {
      res.contentType(contentType);
      res.send(cacheBody);
      return;
    }
    const send = res.send;
    res.send = function (body) {
      mcache.put(key, body, sec * 1000);
      send.call(this, body);
      return body;
    };
    next();
  };
};
