const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET =
  "kasjkvkjcbkhbasl234129H8CINA@!$G0F901@#R4-BFF|-Fsda830!@#AS9D1";
router.get("/", async (req, res) => {
  res.send("You have hit GET /posts endpoint");
});

router.post("/register", async (req, res) => {
  var { email, password } = req.body;

  if (!email || typeof email !== "string") {
    return res.json({ status: "error", error: "Invalid email" });
  }
  if (!password || typeof password !== "string") {
    return res.json({ status: "error", error: "Invalid password" });
  }
  if (password.length < 3) {
    return res.json({
      status: "error",
      error: "Password too small. It should be at least 3 characters.",
    });
  }
  password = await bcrypt.hash(password, 10);
  try {
    const response = await User.create({
      email,
      password,
    });
    return res.json({ status: "success", response });
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: "error", error: "Email already in use." });
    }
    return res.json({ status: "error", error });
  }
});

router.post("/login", async (req, res) => {
  var { email, password } = req.body;

  if (!email || typeof email !== "string") {
    return res.json({ status: "error", error: "Invalid email" });
  }
  if (!password || typeof password !== "string") {
    return res.json({ status: "error", error: "Invalid password" });
  }
  if (password.length < 3) {
    return res.json({
      status: "error",
      error: "Password too small. It should be at least 3 characters.",
    });
  }
  const user = await User.findOne({ email }).lean();
  console.log(user);
  if (!user) {
    return res.json({ status: "error", error: "Invalid email." });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET);
    return res.json({status: 'OK', data: token});
  }else{
    return res.json({ status: "error", error: "Invalid password." });
  }
});

module.exports = router;
