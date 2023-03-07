const bcrypt = require("bcryptjs");

const { User } = require("../../models/user");

const signup = async (req, res) => {
  const { subscription, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({ message: `Email ${email}: in use` });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({
    email,
    subscription,
    password: hashPassword,
  });
  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

module.exports = signup;