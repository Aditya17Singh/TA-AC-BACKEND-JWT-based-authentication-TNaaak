var jwt = require("jsonwebtoken");
module.exports = {
  verifyToken: async (req, res, next) => {
    console.log(req.headers);
    var token = req.headers.authorization;
    try {
      if (token) {
        let payload = await jwt.verify(token, process.env.JWTSECRET);
        req.user = payload;
        next();
      } else {
        res.status(401).json({ error: "Token required!" });
      }
    } catch (error) {
      next(error);
    }
  },
};
