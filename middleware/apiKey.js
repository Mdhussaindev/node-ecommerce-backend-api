const API_KEY = "ECOMMERCE_API_KEY";

const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.query.apiKey;

  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({
      status: false,
      message: "Invalid or missing API key"
    });
  }

  next();
};

module.exports = apiKeyMiddleware;