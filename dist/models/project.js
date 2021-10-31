"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.editProject = exports.addProject = exports.getProjectByID = exports.getAllProjects = void 0;
const dbConfig_1 = __importDefault(require("../db/dbConfig"));
function getAllProjects(user_id) {
    return dbConfig_1.default.query(`
      SELECT projects.* 
      FROM projects
      JOIN users_projects ON projects.id = users_projects.project_id
      JOIN users ON users_projects.user_id = users.id
      WHERE user_id = $1
      GROUP BY projects.id;
    `, [user_id]);
}
exports.getAllProjects = getAllProjects;
function getProjectByID(project_id) {
    return dbConfig_1.default.query(`
      SELECT * 
      FROM projects
      WHERE projects.id = $1;
    `, [project_id]);
}
exports.getProjectByID = getProjectByID;
function addProject(project) {
    const { creator_id, name, description, start_date, end_date, background_img, } = project;
    const values = [
        creator_id,
        name,
        description,
        start_date,
        end_date,
        background_img,
    ];
    return dbConfig_1.default.query(`
      INSERT INTO projects (creator_id, name, description, start_date, end_date, background_img)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `, values);
}
exports.addProject = addProject;
function editProject(project) {
    const { id, name, description, start_date, end_date } = project;
    const values = [name, description, start_date, end_date, id];
    return dbConfig_1.default.query(`
      UPDATE projects
      SET name = $1,
          description = $2,
          start_date = $3,
          end_date = $4
      WHERE projects.id = $5
      RETURNING *;
    `, values);
}
exports.editProject = editProject;
function deleteProject(project_id) {
    return dbConfig_1.default.query(`
  DELETE FROM projects
  WHERE projects.id = $1
  `, [project_id]);
}
exports.deleteProject = deleteProject;
