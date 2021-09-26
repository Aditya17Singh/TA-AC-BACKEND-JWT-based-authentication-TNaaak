var express = require("express");
var auth = require("../middleware/auth");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", { title: "Express" });
});

router.get("/protected", auth.verifyToken, (req, res) => {
  res.json({ access: "protected resources" });
});

module.exports = router;
