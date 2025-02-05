import express from "express";
import routes  from "./routes/userRoute.js";
import routeNote from "./routes/noteRoute.js";
import { dbConnection } from "./config/dbConnection.js";
import cors from "cors";

const app = express();
const port = process.env.port; 
app.use(cors());
app.use(express.json());
app.use("/user", routes);
app.use("/note",routeNote);
app.use('/uploads',express.static('uploads'));

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

dbConnection();