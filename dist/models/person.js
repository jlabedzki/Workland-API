"use strict";
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
exports.createPersonByGitHub = exports.getPersonByGitHub = exports.getPerson = void 0;
const dbConfig_1 = __importDefault(require("../db/dbConfig"));
const taskIds = [1, 2, 3, 4, 5, 6, 7, 8, 9];
function getPerson(id) {
    return dbConfig_1.default.query("SELECT * FROM users WHERE id = $1", [id]);
}
exports.getPerson = getPerson;
function getPersonByGitHub(githubId) {
    return dbConfig_1.default.query(`SELECT users.id, users.name, users.avatar, oauth_mapping.oauth_id
      FROM users
      JOIN oauth_mapping on oauth_mapping.user_id = users.id
      WHERE oauth_mapping.oauth_id = $1`, [githubId]);
}
exports.getPersonByGitHub = getPersonByGitHub;
function createPersonByGitHub(githubId, name, avatar) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield dbConfig_1.default.connect();
        try {
            const insertPersonText = `INSERT INTO users(name, avatar) VALUES($1, '${avatar}') RETURNING users.id`;
            const insertedUserId = (yield client.query(insertPersonText, [name]))
                .rows[0].id;
            const insertText = `
      INSERT INTO oauth_mapping(user_id, oauth_provider, oauth_id) 
      VALUES($1, $2, $3);
      `;
            const insertValues = [insertedUserId, "GitHub", githubId];
            console.log("insertValues :>> ", insertValues);
            yield client.query(insertText, insertValues);
            yield client.query(`
      INSERT INTO users_projects (user_id, project_id)
      VALUES ($1, 1);
    `, [insertedUserId]);
            for (const taskId of taskIds) {
                yield client.query(`
      INSERT INTO users_tasks (user_id, task_id)
      VALUES ($1, $2);
      `, [insertedUserId, taskId]);
            }
        }
        catch (e) {
            throw e;
        }
    });
}
exports.createPersonByGitHub = createPersonByGitHub;
