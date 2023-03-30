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
import { User, MessageBoard } from "./Models.js";
import resolvers from "./resolvers.js";
import cors from "cors";
// import AuthPayloadType from "./auth.js";
dotenv.config();

const app = express();

app.use(cors());

const UserType = new GraphQLObjectType({
  name: "User",
  description: "return user",
  fields: () => ({
    userName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    pwd: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const UserListType = new GraphQLObjectType({
  name: "UserList",
  description: "Return a list of user types",
  fields: () => ({
    profiles: {
      type: new GraphQLList(UserType),
      resolve: () => getUsers(),
    },
  }),
});

const ChatsType = new GraphQLObjectType({
  name: "Chats",
  description: "Returns chats",
  fields: () => ({
    withWho: { type: new GraphQLNonNull(Array) },
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
      profiles: {
        type: UserListType,
        resolve: () => getUsers(),
      },
      // messageBoard: {
      //   type: MessageBoardType,
      //   resolve: () => getMessages(),
      // },
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
      loginUser: {
        type: UserType,
        args: {
          email: { type: new GraphQLNonNull(GraphQLString) },
          pwd: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: resolvers.Mutation.loginUser,
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
    const msgBoard = await MessageBoard.find({ userName: "testUser101" });
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
