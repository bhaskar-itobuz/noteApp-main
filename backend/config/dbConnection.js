import { mongoose } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const dbConnection = async function dbConnect() {
  const uri = process.env.url;
  try {
    await mongoose.connect(uri);
    console.log("connecting to mongodb");
  } catch (e) {
    console.error(e);
  }
};


// import { Server } from "socket.io";
// import http from "http";

// const app = express();
// const port = process.env.port; 

// const server = http.createServer(app); // Add this
// const io = new Server(server, {
//   cors: {
//     origin: `http://localhost:${port}`,
//     methods: ['GET', 'POST'],
//   },
// });

// io.on('connection', (socket) => {
//   console.log(`User connected ${socket.id}`);
// });