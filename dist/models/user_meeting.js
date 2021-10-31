"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUserToMeeting = void 0;
const dbConfig_1 = __importDefault(require("../db/dbConfig"));
function addUserToMeeting(userMeeting) {
    const values = [userMeeting.user_id, userMeeting.meeting_id];
    return dbConfig_1.default
        .query(`
      INSERT INTO users_meetings (user_id, meeting_id)
      VALUES ($1, $2);
    `, values);
}
exports.addUserToMeeting = addUserToMeeting;
;
