"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_1 = __importDefault(require("./routes/auth"));
const projects_1 = __importDefault(require("./routes/projects"));
const users_projects_1 = __importDefault(require("./routes/users_projects"));
const tasks_1 = __importDefault(require("./routes/tasks"));
const users_tasks_1 = __importDefault(require("./routes/users_tasks"));
const meetings_1 = __importDefault(require("./routes/meetings"));
const users_meetings_1 = __importDefault(require("./routes/users_meetings"));
const messages_1 = __importDefault(require("./routes/messages"));
const users_1 = __importDefault(require("./routes/users"));
const person_1 = require("./models/person");
const socketServer_1 = require("./socketServer");
const cors = require("cors");
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use(cors());
const passportSetup = require("./config/");
app.use((0, cookie_parser_1.default)());
app.use((0, cookie_session_1.default)({
    name: "session",
    keys: [process.env.COOKIE_KEY],
}));
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use("/auth", auth_1.default);
app.use("/projects", projects_1.default);
app.use("/users_projects", users_projects_1.default);
app.use("/tasks", tasks_1.default);
app.use("/users_tasks", users_tasks_1.default);
app.use("/meetings", meetings_1.default);
app.use("/users_meetings", users_meetings_1.default);
app.use("/messages", messages_1.default);
app.use("/users", users_1.default);
const authCheck = (req, res, next) => {
    if (!req.user) {
        res.status(401).json({
            authenticated: false,
            message: "user has not been authenticated",
        });
    }
    else {
        next();
    }
};
app.get("/", authCheck, (req, res) => {
    res.status(200).json({
        authenticated: true,
        message: "user successfully authenticated",
        user: req.user,
        cookies: req.cookies,
    });
});
app.get("/logout", (req, res) => {
    req.logOut();
    res.redirect("/login");
});
app.get("/user", (req, res) => {
    if (req.isAuthenticated()) {
        const reqUser = req.user;
        (0, person_1.getPersonByGitHub)(reqUser.oauth_id).then((data) => {
            console.log("user authenticated");
            res.status(200).send(data.rows[0]);
        });
        return;
    }
    console.log("Not logged in or not authenticated");
});
app.listen(port, () => {
    console.log(`Backend running on port ${port}🏃`);
});
socketServer_1.socketServer.listen(5080);
