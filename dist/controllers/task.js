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
exports.deleteTask = exports.updateTaskPriority = exports.updateTaskStatus = exports.editTask = exports.createTask = exports.getAllTasksForProject = void 0;
const camelcase_keys_1 = __importDefault(require("camelcase-keys"));
const model = __importStar(require("../models/task"));
const user_task_model = __importStar(require("../models/user_task"));
function getAllTasksForProject(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const project_id = parseInt(req.params.id);
        const queryResult = yield model.getAllTasksForProject(project_id);
        res.send(queryResult.rows.map((row) => (0, camelcase_keys_1.default)(row)));
    });
}
exports.getAllTasksForProject = getAllTasksForProject;
function createTask(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { project_id, sprint_id, name, description, priority_level, startDate, endDate, users, } = req.body;
        const task = {
            project_id,
            sprint_id,
            name,
            description,
            start_date: startDate,
            end_date: endDate,
            priority_level,
        };
        const queryResult = yield model.createTask(task);
        for (const user of users) {
            const userTask = {
                user_id: user,
                task_id: queryResult.rows[0].id,
            };
            yield user_task_model.addUserToTask(userTask);
        }
        res.send((0, camelcase_keys_1.default)(queryResult.rows[0]));
    });
}
exports.createTask = createTask;
function editTask(req, res) {
    const task_id = parseInt(req.params.id);
    const selectedUsers = req.body.selectedUsers;
    const task = {
        id: task_id,
        name: req.body.name,
        description: req.body.description,
        start_date: req.body.startDate,
        end_date: req.body.endDate,
    };
    model
        .editTask(task)
        .then((data) => __awaiter(this, void 0, void 0, function* () {
        yield user_task_model.deleteUsersFromTask(task_id);
        return data;
    }))
        .then((data) => __awaiter(this, void 0, void 0, function* () {
        for (const user of selectedUsers) {
            const userTask = {
                user_id: user,
                task_id: task_id,
            };
            yield user_task_model.addUserToTask(userTask);
        }
        return data;
    }))
        .then((data) => {
        res.send((0, camelcase_keys_1.default)(data.rows[0]));
    });
}
exports.editTask = editTask;
function updateTaskStatus(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const status = req.body.status;
        const id = parseInt(req.params.id);
        const queryResult = yield model.updateTaskStatus(status, id);
        res.send((0, camelcase_keys_1.default)(queryResult.rows[0]));
    });
}
exports.updateTaskStatus = updateTaskStatus;
function updateTaskPriority(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const priority = req.body.priority;
        const id = parseInt(req.params.id);
        const queryResult = yield model.updateTaskPriority(priority, id);
        res.send((0, camelcase_keys_1.default)(queryResult.rows[0]));
    });
}
exports.updateTaskPriority = updateTaskPriority;
function deleteTask(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const task_id = parseInt(req.params.id);
        const queryResult = yield model.deleteTask(task_id);
        res.send((0, camelcase_keys_1.default)(queryResult.rows[0]));
    });
}
exports.deleteTask = deleteTask;
