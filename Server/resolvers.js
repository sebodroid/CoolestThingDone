const bcrypt = require("bcryptjs");

const resolvers = {
  Mutation: {
    async registerUser(_, { input }) {
      const { username, email, pwd } = input;

      // Check if user with same email or username already exists
      const userExists = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (userExists) {
        throw new Error("User with that email or username already exists");
      }

      // Hash the password and create the new user
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        username,
        email,
        pwd: hashedPassword,
      });
      await user.save();
      return user;
    },
  },
};
