"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGlobalMessages = exports.getDirectMessages = void 0;
const dbConfig_1 = __importDefault(require("../db/dbConfig"));
function getDirectMessages(receiver_id) {
    return dbConfig_1.default
        .query(`
      SELECT *
      FROM messages
      WHERE receiver_id = $1
      ORDER BY id DESC;
    `, [receiver_id]);
}
exports.getDirectMessages = getDirectMessages;
function getGlobalMessages() {
    return dbConfig_1.default
        .query(`
      SELECT *
      FROM messages
      WHERE receiver_id IS NULL
      ORDER BY id DESC;
    `);
}
exports.getGlobalMessages = getGlobalMessages;
;
