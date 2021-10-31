"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const passport_1 = __importDefault(require("passport"));
const passport_github2_1 = __importDefault(require("passport-github2"));
const userDb = __importStar(require("../models/person"));
// serialize the user.id to save in the cookie session
// so the browser will remember the user when login
passport_1.default.serializeUser((user, done) => {
    done(null, user.oauth_id);
});
// deserialize the cookieUserId to user in the database
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userDb.getPersonByGitHub(id);
        done(null, user.rows[0]);
    }
    catch (e) {
        done(new Error('Failed to deserialize an user'));
    }
}));
passport_1.default.use(
//@ts-ignore
new passport_github2_1.default({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK,
}, 
//@ts-ignore
(accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    // find current user in UserModel
    console.log('profile :>> ', profile);
    let user = yield userDb.getPersonByGitHub(profile.id);
    console.log('user :>> ', user);
    // create new user if the database doesn't have this user
    const name = profile.displayName ? profile.displayName : profile.username;
    if (!user.rows.length) {
        yield userDb.createPersonByGitHub(profile.id, name, profile.photos[0].value);
        user = yield userDb.getPersonByGitHub(profile.id);
    }
    done(null, user.rows[0]);
})));
