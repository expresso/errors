"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const boom_1 = __importDefault(require("boom"));
function factory() {
    return (err, _req, _res, next) => {
        if (!(err instanceof boom_1.default)) {
            console.error(err);
        }
        next(err);
    };
}
exports.factory = factory;
//# sourceMappingURL=stderr.js.map