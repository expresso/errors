import Boom from 'boom'
import { NextFunction } from 'connect'
import { Response } from 'express-serve-static-core'
import { Request, ErrorRequestHandler } from 'express'

export function factory (): ErrorRequestHandler {
  return (err: Error, _req: Request, _res: Response, next: NextFunction) => {
    if (!(err instanceof Boom)) {
      console.error(err)
    }

    next(err)
  }
}
