"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginFail = exports.loginSuccess = void 0;
require("dotenv").config();
function loginSuccess(req, res) {
    if (req.user) {
        res.json({
            success: true,
            message: "user has successfully authenticated",
            user: req.user,
            cookies: req.cookies,
        });
    }
}
exports.loginSuccess = loginSuccess;
function loginFail(req, res) {
    res.status(401).json({
        success: false,
        message: "user failed to authenticate.",
    });
}
exports.loginFail = loginFail;
