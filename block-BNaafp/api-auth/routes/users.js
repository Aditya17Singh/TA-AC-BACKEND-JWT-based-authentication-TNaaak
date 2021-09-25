const { json } = require("express");
var express = require("express");
var router = express.Router();

var User = require("../models/User");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json({ message: "User Information" });
});

router.post("/register", async (req, res, next) => {
  try {
    var user = await User.create(req.body);
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  var { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Password required" });
  }
  try {
    var user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invaid" });
    }
    var result = await user.verifyPasword(password);
    if (!result) {
      return res.status(400).json({ error: invalid });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
