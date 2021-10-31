"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersByProjectID = exports.getAllUsers = void 0;
const dbConfig_1 = __importDefault(require("../db/dbConfig"));
function getAllUsers() {
    return dbConfig_1.default
        .query(`
      SELECT *
      FROM users;
    `);
}
exports.getAllUsers = getAllUsers;
;
function getUsersByProjectID(project_id) {
    return dbConfig_1.default
        .query(`
      SELECT users.*
      FROM users
      JOIN users_projects
      ON users.id = users_projects.user_id
      JOIN projects
      ON users_projects.project_id = projects.id
      WHERE projects.id = $1;
    `, [project_id]);
}
exports.getUsersByProjectID = getUsersByProjectID;
;
