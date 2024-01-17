var express = require("express");
var router = express.Router();
const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Home" ,isAuthenticated:Boolean(req.session.user)});
});

router.get("/login", (req, res, next) => {
  res.render("auth/login", { title: "Login" });
});
router.get("/logout", (req, res, next) => {
  req.session.destroy()
  res.redirect('/')
});
router.post("/login", async (req, res, next) => {
  const { username, password, remember } = req.body;

  const user = await prisma.user.findUnique({
    where: { username: username },
  });
  if (!user) {
    return res.render("auth/login", {
      title: "Login",
      error: "Invalid credentials",
    });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.render("auth/login", {
      title: "Login",
      error: "Invalid credentials",
    });
  }

  req.session.user = user;

  if (remember) {
    req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
  }

  if(user.isAdmin){
    res.redirect("/admin/dashboard")
  }else{
    res.redirect("/")
  }
});

router.get("/register", (req, res, next) => {
  res.render("auth/register", { title: "Register" });
});
router.post("/register", async (req, res, next) => {
  const { username, password, repeat_password } = req.body;

  if (!username || !password) {
    return res.render("auth/register", {
      title: "Register",
      username,
      error: "Please fill all required fields",
    });
  }
  if (password !== repeat_password) {
    return res.render("auth/register", {
      title: "Register",
      username,
      error: "Password miss match",
    });
  }
  const existingUser = await prisma.user.findUnique({
    where: { username: username },
  });
  if (existingUser) {
    return res.render("auth/register", {
      title: "Register",
      error: "Username already taken",
    });
  }
  const hashedPass = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      username: username,
      password: hashedPass,
    },
  });

  res.render("auth/login", {
    title: "Register",
    success: "User registered pls login",
  });
});
module.exports = router;
