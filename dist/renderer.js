"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const slug_1 = __importDefault(require("slug"));
/**
 * @param   {String}  environment Current environment name.
 * @return  {Boolean}             Whether error stack should be displayed.
 */
const shouldDisplayErrorStack = (environment) => {
    return environment !== 'production';
};
/**
 * Builds a middleware prepared to handle a Boom error object
 * @param environment - sugar-env environment string
 * @returns - Error handling middleware
 */
function factory(environment) {
    return (err, _req, res, _next) => {
        const { message, output: { statusCode: status }, data } = err;
        const code = data && data.code
            ? data.code
            : slug_1.default(err.output.payload.error, { replacement: '_', lower: true });
        const output = shouldDisplayErrorStack(environment) && data && data.stack
            ? { status, error: { code, message, stack: data.stack } }
            : { status, error: { code, message } };
        res.status(status)
            .json(output);
    };
}
exports.factory = factory;
//# sourceMappingURL=renderer.js.map