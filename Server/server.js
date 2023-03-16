import { ApolloServer, gql } from 'apollo-server';
import express from 'express';

const port = 9010;
const app = express();

const typeDefs = gql`
  type Query {
    greeting: String,
    age: Int
  }
`;

const resolvers = {
    Query: {
        greeting: () => "Hello World!!",
        age: () => 23
    }
};

const server = new ApolloServer({ typeDefs, resolvers });
const serverInfo = await server.listen({ port: port });
console.log(`Server running at ${serverInfo.url}`)