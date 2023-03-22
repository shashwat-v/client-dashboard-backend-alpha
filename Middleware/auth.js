const jwt = require('jsonwebtoken');

function checkToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(403).json({ message: "session timeout, please login again" });
      } else {
        req.user = decodedToken;
        // Call next() to move to the next middleware or route handler
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Missing authorization header" });
  }
}

module.exports = checkToken;
