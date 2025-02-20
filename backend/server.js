import express from "express";
import routes  from "./routes/userRoute.js";
import routeNote from "./routes/noteRoute.js";
import { dbConnection } from "./config/dbConnection.js";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";

const app = express();
const port = process.env.port; 

const server = http.createServer(app);
server.listen(port, () => console.log(`Server is running on port ${port}`));
const io = new Server(server, {
  cors: {
    origin: `http://localhost:5173`,
    methods: ['GET', 'POST'],
  },

});

io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on("send_data", (data) => {
    socket.broadcast.emit("received_message",data);
  });

});
app.use(cors());
app.use(express.json());
app.use("/user", routes);
app.use("/note",routeNote);
app.use('/uploads',express.static('uploads'));


dbConnection();