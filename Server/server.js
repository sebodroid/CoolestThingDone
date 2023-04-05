import express from "express";
import expressGraphQL from "express-graphql";
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInputObjectType,
} from "graphql";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { User, MessageBoard } from "./models.js";
import resolvers from "./resolvers.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());

console.log(cors(corsOptions));

app.get("/checkAuth", (req, res) => {
  const token = req.cookies.token;
  // const tokenMatch = setCookieHeader.match(/token=([^;]+)/);
  console.log(token);

  // if (tokenMatch) {
  //   res.json({ message: "You are authorized" });
  // } else {
  //   res.status(401).json({ message: "Unauthorized" });
  // }
});

const UserType = new GraphQLObjectType({
  name: "User",
  description: "return user",
  fields: () => ({
    userName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    pwd: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const UserLogin = new GraphQLObjectType({
  name: "Login",
  description: "login user",
  fields: () => ({
    email: { type: new GraphQLNonNull(GraphQLString) },
    pwd: { type: new GraphQLNonNull(GraphQLString) },
    token: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const ChatsType = new GraphQLObjectType({
  name: "chats",
  description: "Returns chats",
  fields: () => ({
    withWho: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: "withWho",
          fields: () => ({
            friendUname: { type: new GraphQLNonNull(GraphQLString) },
            messages: {
              type: new GraphQLList(
                new GraphQLNonNull(
                  new GraphQLObjectType({
                    name: "message",
                    fields: () => ({
                      createdBy: { type: new GraphQLNonNull(GraphQLString) },
                      createdAt: { type: new GraphQLNonNull(GraphQLString) },
                      message: { type: new GraphQLNonNull(GraphQLString) },
                      messageId: { type: new GraphQLNonNull(GraphQLString) },
                    }),
                  })
                )
              ),
            },
          }),
        })
      ),
    },
  }),
});

const MessageBoardType = new GraphQLObjectType({
  name: "MessageBoard",
  description: "Returning message boards",
  fields: () => ({
    userName: { type: new GraphQLNonNull(GraphQLString) },
    chats: { type: ChatsType },
  }),
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      userList: {
        type: new GraphQLNonNull(new GraphQLList(UserType)),
        resolve: () => getUsers(),
      },
      loginUser: {
        type: UserLogin,
        args: {
          input: {
            type: new GraphQLNonNull(
              new GraphQLInputObjectType({
                name: "userInput",
                fields: () => ({
                  email: { type: new GraphQLNonNull(GraphQLString) },
                  pwd: { type: new GraphQLNonNull(GraphQLString) },
                  token: { type: new GraphQLNonNull(GraphQLString) },
                }),
              })
            ),
          },
        },
        resolve: resolvers.Query.loginUser,
      },
      msgBoard: {
        type: new GraphQLNonNull(MessageBoardType),
        args: {
          input: {
            type: new GraphQLNonNull(
              new GraphQLInputObjectType({
                name: "userName",
                fields: () => ({
                  userName: { type: new GraphQLNonNull(GraphQLString) },
                }),
              })
            ),
          },
        },
        resolve: resolvers.Query.messageBoard//getMessages(),
      },
      messageBoard: {
        type: new GraphQLNonNull(new GraphQLList(MessageBoardType)),
        resolve: () => getMessages(),
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
      registerUser: {
        type: UserType,
        args: {
          input: {
            type: new GraphQLNonNull(
              new GraphQLInputObjectType({
                name: "UserInput",
                fields: () => ({
                  userName: { type: new GraphQLNonNull(GraphQLString) },
                  email: { type: new GraphQLNonNull(GraphQLString) },
                  pwd: { type: new GraphQLNonNull(GraphQLString) },
                }),
              })
            ),
          },
        },
        resolve: resolvers.Mutation.registerUser,
      },
    },
  }),
});

app.use(
  "/graphql",
  expressGraphQL.graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);
app.listen(5000, () => console.log("Server is running"));

const DB_URL = process.env.DBADDRESS;

mongoose
  .connect(DB_URL, {
    //Connection to the DB
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

async function getUsers() {
  //function to grab all the users from the DB
  try {
    const userList = await User.find();
    return userList;
  } catch (e) {
    console.log("ERROR", e.message);
  }
}

async function getMessages() {
  try {
    const msgBoard = await MessageBoard.find({ userName: "sebNasty-Password1!" });
    console.log(msgBoard)
    return msgBoard;
  } catch (e) {
    console.log("MESSAGE ERROR", e.message);
  }
}

//run();

// async function run() { //Function to create a new DB user
//   try {
//     const user = new User({ userName: "user106", email: "user105@hotmail.com", pwd: "password" });
//     await user.save();
//     // const user = await User.find({ userName: "testUser101" })
//     console.log("\n\n", user, "\n\n");
//   } catch (e) {
//     console.log("\n\n", e.message, "\n\n")
//   }
// }
