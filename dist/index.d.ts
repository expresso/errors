import _boom from 'boom';
import * as _stderr from './stderr';
import * as _renderer from './renderer';
import * as _normalizer from './normalizer';
import { ErrorRequestHandler } from 'express';
export declare function factory(environment: string): ErrorRequestHandler[];
export declare const boom: typeof _boom;
export declare const stderr: typeof _stderr;
export declare const renderer: typeof _renderer;
export declare const normalizer: typeof _normalizer;
export default factory;
//# sourceMappingURL=index.d.ts.map