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
exports.deleteProject = exports.editProject = exports.addProject = exports.getProject = exports.getProjects = void 0;
const camelcase_keys_1 = __importDefault(require("camelcase-keys"));
const model = __importStar(require("../models/project"));
const user_project_model = __importStar(require("../models/user_project"));
function getProjects(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.user;
        const queryResult = yield model.getAllProjects(user.id);
        res.send(queryResult.rows.map((row) => (0, camelcase_keys_1.default)(row)));
    });
}
exports.getProjects = getProjects;
function getProject(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const project_id = parseInt(req.params.id);
        const queryResult = yield model.getProjectByID(project_id);
        res.send((0, camelcase_keys_1.default)(queryResult.rows[0]));
    });
}
exports.getProject = getProject;
function addProject(req, res) {
    const { creatorID, name, description, startDate, endDate } = req.body;
    const project = {
        creator_id: creatorID,
        name,
        description,
        start_date: startDate,
        end_date: endDate,
        background_img: "",
    };
    model
        .addProject(project)
        .then((data) => __awaiter(this, void 0, void 0, function* () {
        for (const user of req.body.users) {
            const userProject = {
                user_id: user,
                project_id: data.rows[0].id,
                role: "",
            };
            yield user_project_model.addUserToProject(userProject);
        }
        const userProject = {
            user_id: creatorID,
            project_id: data.rows[0].id,
            role: "Project Manager",
        };
        yield user_project_model.addUserToProject(userProject);
        return data.rows[0];
    }))
        .then((data) => {
        res.send((0, camelcase_keys_1.default)(data));
    });
}
exports.addProject = addProject;
function editProject(req, res) {
    const project_id = parseInt(req.params.id);
    const selectedUsers = req.body.selectedUsers;
    const project = {
        id: project_id,
        name: req.body.name,
        description: req.body.description,
        start_date: req.body.startDate,
        end_date: req.body.endDate,
    };
    model
        .editProject(project)
        .then((data) => __awaiter(this, void 0, void 0, function* () {
        yield user_project_model.deleteUsersFromProject(project_id);
        return data;
    }))
        .then((data) => __awaiter(this, void 0, void 0, function* () {
        for (const user of selectedUsers) {
            const userProject = {
                user_id: user,
                project_id,
                role: "",
            };
            yield user_project_model.addUserToProject(userProject);
        }
        res.send((0, camelcase_keys_1.default)(data.rows[0]));
    }));
}
exports.editProject = editProject;
function deleteProject(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const project_id = parseInt(req.params.id);
        const queryResult = yield model.deleteProject(project_id);
        res.send((0, camelcase_keys_1.default)(queryResult.rows[0]));
    });
}
exports.deleteProject = deleteProject;
