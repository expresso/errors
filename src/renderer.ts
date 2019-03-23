import Boom from 'boom'
import slug from 'slug'
import { Response, Request, NextFunction, ErrorRequestHandler } from 'express'

/**
 * @param   {String}  environment Current environment name.
 * @return  {Boolean}             Whether error stack should be displayed.
 */
const shouldDisplayErrorStack = (environment: string): boolean => {
  return environment !== 'production'
}

interface IErrorData {
  code?: string,
  stack?: unknown
}
type ErrorData = IErrorData | null

/**
 * Builds a middleware prepared to handle a Boom error object
 * @param environment - sugar-env environment string
 * @returns - Error handling middleware
 */
export function factory (environment: string): ErrorRequestHandler {
  return (err: Boom<ErrorData>, _req: Request, res: Response, _next: NextFunction) => {
    const { message, output: { statusCode: status }, data } = err

    const code = data && data.code
      ? data.code
      : slug(err.output.payload.error, { replacement: '_', lower: true })

    const output = shouldDisplayErrorStack(environment) && data && data.stack
      ? { status, error: { code, message, stack: data.stack } }
      : { status, error: { code, message } }

    res.status(status)
      .json(output)
  }
}
