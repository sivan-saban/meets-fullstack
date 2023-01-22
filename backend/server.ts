// Main file in the SERVER 
import cors from "cors";
import express from "express";
import ErrorHandler from "./MiddleWare/route-not-found";
import router from "./Routes/controller";
import config from "./Utils/config";
import dal_mysql from "./Utils/dal_mysql";
import { create_group, create_meet } from "./Utils/init";

const server = express();
const currentPort = config.port;
dal_mysql.execute(create_group);
dal_mysql.execute(create_meet);
server.use(cors());
server.use(express.json());
server.use("/meets",router);
server.use("*", ErrorHandler);

server.listen(currentPort, () => {console.log(`listening on http://localhost:${currentPort}`)} )