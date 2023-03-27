import express from "express";
import expressGraphQL from "express-graphql";
import { GraphQLSchema, GraphQLObjectType, GraphQLString } from "graphql";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { User } from "./Models.js";
import cors from "cors";
dotenv.config();

const app = express();

app.use(cors());

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLString },
    userName: { type: GraphQLString },
    email: { type: GraphQLString },
    pwd: { type: GraphQLString },
  }),
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "HelloWorld",
    fields: () => ({
      message: {
        type: GraphQLString,
        resolve: () => "Helloworld",
      },
      user: {
        type: UserType,
        resolve: async () => {
          try {
            const user = new User({
              userName: "user106",
              email: "user105@hotmail.com",
              pwd: "password",
            });
            await user.save();
            return user;
          } catch (e) {
            throw new Error(`Failed to create user: ${e.message}`);
          }
        },
      },
    }),
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

// mongoose.connect(DB_URL, { //Connection to the DB
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log("MongoDB connected")).catch((err) => console.log(err));

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
