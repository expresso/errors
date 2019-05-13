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
  code?: string
  stack?: unknown,
  additionalProperties?: unknown
}

type ErrorOutput = { app?: string, status: number, error: { code: string, message: string, stack?: unknown, data?: unknown } }

type ErrorData = IErrorData | null

/**
 * Builds a middleware prepared to handle a Boom error object
 * @param environment - sugar-env environment string
 * @returns - Error handling middleware
 */
export function factory (environment: string, appName?: string): ErrorRequestHandler {
  return (err: Boom<ErrorData>, _req: Request, res: Response, _next: NextFunction) => {
    const { message, output: { statusCode: status }, data } = err

    const code = data && data.code ? data.code : slug(err.output.payload.error, { replacement: '_', lower: true })
    const output: ErrorOutput = { status, error: { code, message } }

    if (appName) output.app = appName
    if (shouldDisplayErrorStack(environment) && data && data.stack) output.error.stack = data.stack
    if (data && data.additionalProperties) output.error.data = data.additionalProperties

    res.status(status)
      .json(output)
  }
}
