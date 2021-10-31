"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMeeting = exports.getAllMeetingsForUser = void 0;
const dbConfig_1 = __importDefault(require("../db/dbConfig"));
function getAllMeetingsForUser(user_id) {
    return dbConfig_1.default
        .query(`
      SELECT meetings.* 
      FROM meetings
      JOIN users_meetings
      ON meetings.id = users_meetings.meeting_id
      JOIN users ON users_meetings.user_id = $1
      GROUP BY meetings.id
      ORDER BY date, start_time;
    `, [user_id]);
}
exports.getAllMeetingsForUser = getAllMeetingsForUser;
function createMeeting(meeting) {
    const { name, description, date, start_time, end_time } = meeting;
    const values = [name, description, date, start_time, end_time];
    return dbConfig_1.default
        .query(`
    INSERT INTO meetings (name, description, date, start_time, end_time)
    VALUES ($1, $2, $3, $4, $5);
    `, values);
}
exports.createMeeting = createMeeting;
