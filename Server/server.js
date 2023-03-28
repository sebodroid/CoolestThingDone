import express from "express";
import expressGraphQL from "express-graphql";
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList } from "graphql";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { User } from "./Models.js";
import cors from "cors";
dotenv.config();

const app = express();

app.use(cors());

const userListData = getUsers(); // stores Users from DB

const UserType = new GraphQLObjectType({
  name: "User",
  description: "return user",
  fields: () => ({
    userName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    pwd: { type: new GraphQLNonNull(GraphQLString) }
  })
});

const UserListType = new GraphQLObjectType({
  name: "UserList",
  description: 'Return a list of user types',
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve: () => userListData
    }
  })
});

const schema = new GraphQLSchema({
  query: UserListType,
  // fields: () => ({
  //   resolve: async () => {
  //     try {
  //       const user = new User({
  //         userName: "user107",
  //         email: "user107@hotmail.com",
  //         pwd: "password",
  //       });
  //       await user.save();
  //       return user;
  //     } catch (e) {
  //       throw new Error(`Failed to create user: ${e.message}`);
  //     }
  //   },
  // })
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

mongoose.connect(DB_URL, { //Connection to the DB
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected")).catch((err) => console.log(err));


async function getUsers() { //function to grab all the users from the DB
  try {
    const userList = await User.find()
    return userList
  } catch (e) {
    console.log("ERROR", e.message)
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
