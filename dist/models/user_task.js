"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsersFromTask = exports.addUserToTask = exports.getAllUsersAndTasks = void 0;
const dbConfig_1 = __importDefault(require("../db/dbConfig"));
function getAllUsersAndTasks() {
    return dbConfig_1.default.query(`
      SELECT *
      FROM users_tasks;  
    `);
}
exports.getAllUsersAndTasks = getAllUsersAndTasks;
function addUserToTask(userTask) {
    const values = [userTask.user_id, userTask.task_id];
    return dbConfig_1.default.query(`
      INSERT INTO users_tasks (user_id, task_id)
      VALUES ($1, $2);
    `, values);
}
exports.addUserToTask = addUserToTask;
function deleteUsersFromTask(task_id) {
    return dbConfig_1.default.query(`
      DELETE FROM users_tasks
      WHERE task_id = $1
      RETURNING *;
    `, [task_id]);
}
exports.deleteUsersFromTask = deleteUsersFromTask;
