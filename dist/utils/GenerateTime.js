"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMinutes = void 0;
const generateMinutes = (minute) => {
    const currentTime = new Date();
    return new Date(currentTime.getTime() + minute * 60 * 1000);
};
exports.generateMinutes = generateMinutes;
//# sourceMappingURL=GenerateTime.js.map