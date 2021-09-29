var express = require("express");
var User = require("../models/User");
var auth = require("../middlewares/auth");
var router = express.Router();

router.get("/:username", async (req, res, next) => {
  var username = req.params.username;
  var user = await User.findOne({ username });
  res.json({
    profile: {
      username: user.username,
      bio: user.bio,
      image: user.image,
      following: user.following,
    },
  });
});

router.post("/:username/follow", auth.verifyToken, async (req, res, next) => {
  try {
    var username = req.params.username;
    var userToFollow = await User.findOne({ username });
    if (!userToFollow)
      return res.status(404).json({ error: "User not available!" });
    await User.findByIdAndUpdate(userToFollow.id, {
      $push: { followers: req.user.userId },
    });
    var currentUser = await User.findByIdAndUpdate(
      req.user.userId,
      { $push: { following: userToFollow.id } },
      { new: true }
    );
    res.json({
      profile: {
        username: currentUser.username,
        bio: currentUser.bio,
        image: currentUser.image,
        following: currentUser.following,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:username/follow", auth.verifyToken, async (req, res, next) => {
  try {
    var username = req.params.username;
    var userToUnfollow = await User.findOne({ username });
    if (!userToUnfollow)
      return res.status(404).json({ error: "User not available!" });
    await User.findByIdAndUpdate(userToUnfollow.id, {
      $pull: { followers: req.user.userId },
    });
    var currentUser = await User.findByIdAndUpdate(
      req.user.userId,
      { $pull: { following: userToUnfollow.id } },
      { new: true }
    );
    res.json({
      profile: {
        username: currentUser.username,
        bio: currentUser.bio,
        image: currentUser.image,
        following: currentUser.following,
      },
    });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
