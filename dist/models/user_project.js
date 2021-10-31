"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsersAndProjects = exports.deleteUsersFromProject = exports.addUserToProject = void 0;
const dbConfig_1 = __importDefault(require("../db/dbConfig"));
function getAllUsersAndProjects() {
    return dbConfig_1.default.query(`
      SELECT *
      FROM users_projects;  
    `);
}
exports.getAllUsersAndProjects = getAllUsersAndProjects;
function addUserToProject(userProject) {
    const values = [
        userProject.user_id,
        userProject.project_id,
        userProject.role,
    ];
    return dbConfig_1.default.query(`
      INSERT INTO users_projects (user_id, project_id, role)
      VALUES ($1, $2, $3);
    `, values);
}
exports.addUserToProject = addUserToProject;
function deleteUsersFromProject(project_id) {
    return dbConfig_1.default.query(`
      DELETE FROM users_projects
      WHERE project_id = $1
      RETURNING *;
    `, [project_id]);
}
exports.deleteUsersFromProject = deleteUsersFromProject;
