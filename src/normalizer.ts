import Boom from 'boom'
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'

export function factory (): ErrorRequestHandler {
  return (err: Error, _req: Request, _res: Response, next: NextFunction) => {
    if (!(err instanceof Boom)) {
      const { message, stack } = err
      return next(Boom.internal(message, { stack: stack, ...err }))
    }

    next(err)
  }
}
