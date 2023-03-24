import { ApolloServer, gql } from 'apollo-server'
import mongoose from 'mongoose';
import * as dotenv from 'dotenv'
import { User } from './User.js';
dotenv.config()

const DB_URL = process.env.DBADDRESS;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected")).catch((err) => console.log(err));

run();

async function run() {
  const user = new User({ userName: "user104", email: "user104@hotmail.com", pwd: "user104Password!" });
  await user.save();
  console.log(user);
}

// const user103 = new userSchema({
//   userName: "user103",
//   email: "user103@hotmail.com",
//   pwd: "user103Password!"
// })

// const server = new ApolloServer({ typeDefs, resolvers });
// mongoose.connection.once("open", () =>
//   server.listen(() => console.log("We make magic over at localhost:9010"))
// );



//CODE REGARDING GQL
// const typeDefs = gql`
//   type Query {
//     userName: String,
//     message: String
//   }
// `;
// var myList = ["user102", "Hello world!!!"]

// const resolvers = {
//   Query: {
//     userName: () => myList[0], //Displays user102
//     message: () => myList[1] //Displays "Hello world!!!"
//   }
// };

// const server = new ApolloServer({ typeDefs, resolvers });
// const serverInfo = await server.listen({ port: process.env.PORT });
// console.log(`Server runnin at ${process.env.PORT}`)