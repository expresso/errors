import _boom from 'boom'
import * as _stderr from './stderr'
import * as _renderer from './renderer'
import * as _normalizer from './normalizer'
import { ErrorRequestHandler } from 'express'

export function factory (environment: string): ErrorRequestHandler[] {
  return [
    _stderr.factory(),
    _normalizer.factory(),
    _renderer.factory(environment)
  ]
}

export const boom = _boom
export const stderr = _stderr
export const renderer = _renderer
export const normalizer = _normalizer

export default factory
