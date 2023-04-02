import bcrypt from "bcryptjs";
import { User } from "./models.js";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

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

      return {
        userName: user.userName,
        email: user.email,
        pwd: user.pwd,
      };
    },
  },

  Query: {
    async loginUser(_, { input }, { res }) {
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

      const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.setHeader(
        "Set-Cookie",
        serialize("token", token, {
          httpOnly: true,
          maxAge: 3600,
          path: "/",
        })
      );

      return { email: user.email, pwd: user.pwd, token: token };
    },
  },
};

export default resolvers;
