import Boom from 'boom'
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'

export function factory (): ErrorRequestHandler {
  return (err: Error, _req: Request, _res: Response, next: NextFunction) => {
    if (!(err instanceof Boom)) {
      return next(Boom.internal(err.message, { stack: err.stack }))
    }

    next(err)
  }
}
