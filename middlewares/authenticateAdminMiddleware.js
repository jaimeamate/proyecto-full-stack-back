const jwt = require("jsonwebtoken");

const authenticateAdminMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (token === undefined || token === null) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  //Verifica el token utilizando el jwt_secret_key
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
    if (err) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    //Si no da ningún error da paso al endpoint
    next();
  });
};

module.exports = authenticateAdminMiddleware;
