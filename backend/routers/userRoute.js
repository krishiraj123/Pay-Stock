require("dotenv").config();

const { Router } = require("express");
require("../db/cons");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const { checkLogin } = require("../middlewares/checklogin");
const Account = require("../models/account");

const router = Router();

router.use(bodyParser.json());

const userSchema = zod.object({
  username: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
  email: zod.string().email(),
  password: zod.string(),
});

router.post("/signup", async (req, res) => {
  try {
    const { username, firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const validation = userSchema.safeParse(req.body);
    console.log(validation);
    if (!validation.success) {
      return res.status(400).json({ message: "Invalid data format" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    const userId = user._id;
    const token = jwt.sign({ username, email, userId }, process.env.JWT_SECRET);

    await Account.create({ userId, balance: 1 + Math.random() * 10000 });

    return res.status(201).json({ message: "User created", token });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", checkLogin, async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username });

  if (!existingUser) {
    return res.status(404).json({ message: "No such Username found" });
  }

  const isValidPassword = await bcrypt.compare(password, existingUser.password);

  if (!isValidPassword || username !== req.user.username) {
    return res.status(401).json({ message: "Invalid password or username" });
  }

  const token = jwt.sign(
    { username, userId: req.user.userId },
    process.env.JWT_SECRET
  );

  return res.status(200).json({ message: "User logged in", token });
});

router.get("/get-users", async (req, res) => {
  const users = await User.find();

  console.log(users);
  if (!users) {
    return res.status(404).json({ message: "Users not found" });
  }

  return res.status(200).json(users);
});

router.get("/get-user", checkLogin, async (req, res) => {
  const id = req.user.userId;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.put("/update-user/:id", async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findById(id);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const parsed = userSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid data format" });
    }

    let hashPassword = existingUser.password;

    if (password) {
      const saltRounds = 10;
      hashPassword = await bcrypt.hash(password, saltRounds);
    }

    const userConflict = await User.findOne({
      $or: [{ username }, { email }],
      _id: { $ne: id },
    });

    if (userConflict) {
      return res.status(409).json({
        message: "User with similar username or email already exists",
      });
    }

    await User.updateOne(
      { _id: id },
      {
        $set: { ...req.body, password: hashPassword },
      }
    );

    return res.status(200).json({ message: "User updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/filter-user", async (req, res) => {
  try {
    const filter = req.query.filter || "";

    const users = await User.find({
      $or: [
        { firstName: { $regex: filter, $options: "i" } },
        { lastName: { $regex: filter, $options: "i" } },
      ],
    });

    if (users.length === 0) {
      return res.status(404).json({ message: "Users not found" });
    }

    console.log(users);

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
