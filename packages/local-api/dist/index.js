"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
var serve = function (port, filename, dir) {
    console.log('Server is listening on port', port);
    console.log('saving/fetching cells from', filename);
    console.log('that file is in a dir', dir);
};
exports.serve = serve;
