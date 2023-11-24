"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserPayload = exports.getVendorPayload = void 0;
const getVendorPayload = (vendor) => {
    const { _id, email, name, ownerName, role } = vendor;
    return {
        _id,
        email,
        name,
        ownerName,
        role,
    };
};
exports.getVendorPayload = getVendorPayload;
const getUserPayload = (user) => {
    const { _id, email, verified, role } = user;
    return {
        _id,
        email,
        verified: verified,
        role,
    };
};
exports.getUserPayload = getUserPayload;
//# sourceMappingURL=Auth.Service.js.map