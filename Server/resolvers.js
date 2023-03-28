import bcrypt from "bcryptjs";
import { User } from "./models.js";

const resolvers = {
  Mutation: {
    async registerUser(_, { input }) {
      const { userName, email, pwd } = input;

      // Check if user with same email or username already exists
      const userExists = await User.findOne({
        $or: [{ userName }, { email }],
      });
      if (userExists) {
        throw new Error("User with that email or username already exists");
      }

      // Hash the password and create the new user
      const hashedPassword = await bcrypt.hash(pwd, 10);
      const user = new User({
        userName,
        email,
        pwd: hashedPassword,
      });
      await user.save();
      return user;
    },
  },
};

export default resolvers;
