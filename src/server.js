import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, ".env") });

import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import utils from "./utils";
import { sendSecretMail } from "./utils";

// This can't be until verifying sendgrid mailer
sendSecretMail("dennis2311@daum.net", "111223");

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({ schema });

server.express.use(logger("dev"));

server.start({ port: PORT }, () =>
  console.log(`Server is running on  http://localhost:${PORT}`)
);
