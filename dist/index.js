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
const boom_1 = __importDefault(require("boom"));
const _stderr = __importStar(require("./stderr"));
const _renderer = __importStar(require("./renderer"));
const _normalizer = __importStar(require("./normalizer"));
function factory(environment) {
    return [
        _stderr.factory(),
        _normalizer.factory(),
        _renderer.factory(environment)
    ];
}
exports.factory = factory;
exports.boom = boom_1.default;
exports.stderr = _stderr;
exports.renderer = _renderer;
exports.normalizer = _normalizer;
exports.default = factory;
//# sourceMappingURL=index.js.map