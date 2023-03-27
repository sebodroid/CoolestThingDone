//FILE CONTAINS CODE THAT HAS BEEN COMMENTED OUT, MIGHT USE IT LATER ON OR MIGHT NOT.


//import { ApolloServer, gql } from 'apollo-server'

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