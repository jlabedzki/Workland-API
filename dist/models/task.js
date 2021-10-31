"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTaskPriority = exports.updateTaskStatus = exports.editTask = exports.createTask = exports.getAllTasksForProject = void 0;
const dbConfig_1 = __importDefault(require("../db/dbConfig"));
function getAllTasksForProject(project_id) {
    return dbConfig_1.default.query(`
      SELECT tasks.*
      FROM tasks
      JOIN projects
      ON tasks.project_id = $1
      GROUP BY tasks.id
      ORDER BY tasks.id DESC;
    `, [project_id]);
}
exports.getAllTasksForProject = getAllTasksForProject;
function createTask(task) {
    const { project_id, sprint_id, name, description, start_date, end_date, priority_level, } = task;
    const values = [
        project_id,
        sprint_id,
        name,
        description,
        start_date,
        end_date,
        priority_level,
    ];
    return dbConfig_1.default.query(`
    INSERT INTO tasks (project_id, sprint_id, name, description, start_date, end_date, priority_level)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id;
  `, values);
}
exports.createTask = createTask;
function editTask(task) {
    const { id, name, description, start_date, end_date } = task;
    const values = [name, description, start_date, end_date, id];
    return dbConfig_1.default.query(`
      UPDATE tasks
      SET name = $1,
          description = $2,
          start_date = $3,
          end_date = $4
      WHERE tasks.id = $5
      RETURNING *;
    `, values);
}
exports.editTask = editTask;
function updateTaskStatus(status, id) {
    return dbConfig_1.default.query(`
      UPDATE tasks
      SET current_status = $1
      WHERE tasks.id = $2
      RETURNING *;
    `, [status, id]);
}
exports.updateTaskStatus = updateTaskStatus;
function updateTaskPriority(priority, id) {
    return dbConfig_1.default.query(`
      UPDATE tasks
      SET priority_level = $1
      WHERE tasks.id = $2
      RETURNING *;
    `, [priority, id]);
}
exports.updateTaskPriority = updateTaskPriority;
function deleteTask(task_id) {
    return dbConfig_1.default.query(`
      DELETE FROM tasks
      WHERE tasks.id = $1;
    `, [task_id]);
}
exports.deleteTask = deleteTask;
