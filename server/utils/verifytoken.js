const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'No token provided!' });
  }

  try {
    // Extract the token from the "Bearer" string if it's a Bearer token
    const extractedToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;

    // Verify the token and extract the payload (usually contains userId)
    const decoded = jwt.verify(extractedToken, 'jwt_secret_key');

    // Attach the userId to the request object for future use in routes
    req.identifier = decoded.id;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized! Invalid token.', error });
  }
};

module.exports = verifyToken;
