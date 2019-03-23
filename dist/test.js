"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("@expresso/app"));
const _1 = __importStar(require("./"));
class SomethingError extends Error {
}
const handlers = [
    (_req, _res) => { throw new Error('lalala'); },
    (err, _req, _res, next) => {
        if (err instanceof SomethingError) {
            return next(_1.boom.paymentRequired(err.message, { code: 'you_gotta_pay' }));
        }
        next(err);
    }
];
const appFactory = app_1.default((app, _options, env) => {
    app.get('/error', handlers);
    app.use(_1.default.factory(env));
});
appFactory({ name: 'teste' }, 'production')
    .then(app => { app.listen(80, () => { console.log('listening'); }); });
//# sourceMappingURL=test.js.map