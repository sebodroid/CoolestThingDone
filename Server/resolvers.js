import bcrypt from "bcryptjs";
import { User } from "./models.js";
import pkg from "jsonwebtoken";
const { jwt } = pkg;

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
  Query: {
    async loginUser(_, { input }) {
      const { email, password } = input;

      // Check if user with email exists
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User with that email does not exist");
      }

      // Check if password matches hashed password
      const isMatch = await bcrypt.compare(password, user.pwd);
      if (!isMatch) {
        throw new Error("Incorrect password");
      }

      // Generate JWT token and return user
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      return { user, token };
    },
  },

  Query: {
    async loginUser(_, { input }) {
      const { email, pwd } = input;
      // Check if user with email exists
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User with that email does not exist");
      }

      // Check if password matches hashed password
      const isMatch = await bcrypt.compare(pwd, user.pwd);
      if (!isMatch) {
        throw new Error("Incorrect password");
      }

      // Generate JWT token and return user
      //const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      return user;

      //return { user, token };
    },
  }
};

export default resolvers;
