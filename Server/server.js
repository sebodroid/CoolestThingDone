import { ApolloServer, gql } from 'apollo-server'
import mongoose from 'mongoose';
import * as dotenv from 'dotenv'
dotenv.config()
//const typeDefs = './typeDefs';
//const resolvers = './resolvers';

const typeDefs = gql`
  type Query {
    userName: String,
    message: String
  }
`;

var myList = ["user102", "Hello world!!!"]

const resolvers = {
  Query: {
    userName: () => myList[0], //Displays user102
    message: () => myList[1] //Displays "Hello world!!!"
  }
};

const username = encodeURIComponent("<userName>");

const password = encodeURIComponent("<password>");

const DB_URL = "mongodb://userName:password@127.0.0.1:27017/dbName";

mongoose.connect(DB_URL, {
  useNewUrlParser: true
}).then(() => console.log("MongoDB connected")).catch((err) => console.log(err));;

// const server = new ApolloServer({ typeDefs, resolvers });
// const serverInfo = await server.listen({ port: 9010 });
// console.log(`Server runnin at ${process.env.UNAME}`)

// mongoose.connection.once("open", () =>
//   server.start(() => console.log("We make magic over at localhost:9010"))
// );
