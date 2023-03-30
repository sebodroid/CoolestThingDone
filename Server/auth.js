import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from "graphql";

const UserType = new GraphQLObjectType({
  name: "UserInfo",
  description: "return user",
  fields: () => ({
    userName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    pwd: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const AuthPayloadType = new GraphQLObjectType({
  name: "AuthPayload",
  fields: {
    token: { type: GraphQLString },
    user: { type: UserType },
  },
});

export default AuthPayloadType;
