"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketServer = void 0;
const http_1 = require("http");
const socket_io_1 = require("socket.io");
exports.socketServer = (0, http_1.createServer)();
const io = new socket_io_1.Server(exports.socketServer, {
    cors: {
        origin: '*',
        // method: ["GET", "POST"],
    },
});
let socketIds = [];
io.on('connection', (socket) => {
    console.log('.........socket connected.......🙌');
    socket.on('disconnect', () => {
        const allOtherUsers = socketIds.filter((id) => id !== socket.id);
        socketIds = [...allOtherUsers];
        io.emit('userDisconnect', socket.id);
    });
    socket.on('movementMessage', (arg) => {
        // console.log('event :>> ', arg);
        socket.broadcast.emit('movementMessage', arg);
    });
    socket.on('announcement', (arg) => {
        io.emit('receivedAnnouncement', arg);
    });
    socket.on('sendDirect', (arg) => {
        io.to(arg.payload.receiverSocketId).emit('receiveDirect', arg);
        io.to(arg.payload.senderSocketId).emit('receiveDirect', arg);
    });
    //-------------------video attempt below--------------------------
    socket.on('joinVideo', () => {
        if (socketIds.length === 10) {
            socket.emit('capacity reached!');
            return;
        }
        socketIds.push(socket.id);
        const allOtherUsers = socketIds.filter((id) => id !== socket.id);
        socket.emit('userList', allOtherUsers);
    });
    socket.on('sendingSignal', (payload) => {
        io.to(payload.userToSignal).emit('userJoined', {
            signal: payload.signal,
            callerID: payload.callerID,
        });
    });
    socket.on('returningSignal', (payload) => {
        io.to(payload.callerID).emit('receivingReturnedSignal', {
            signal: payload.signal,
            id: socket.id,
        });
    });
});
