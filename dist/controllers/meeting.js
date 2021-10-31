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
exports.createMeeting = exports.getAllMeetingsForUser = void 0;
const camelcase_keys_1 = __importDefault(require("camelcase-keys"));
const model = __importStar(require("../models/meeting"));
function getAllMeetingsForUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user_id = 1;
        const queryResult = yield model.getAllMeetingsForUser(user_id);
        res.send(queryResult.rows.map((row) => (0, camelcase_keys_1.default)(row)));
    });
}
exports.getAllMeetingsForUser = getAllMeetingsForUser;
function createMeeting(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const meeting = {
            name: 'google',
            description: 'meet and greet',
            date: '2021-10-31',
            start_time: '09:00:00',
            end_time: '10:00:00'
        };
        const queryResult = yield model.createMeeting(meeting);
        res.send((0, camelcase_keys_1.default)(queryResult.rows[0]));
    });
}
exports.createMeeting = createMeeting;
;
