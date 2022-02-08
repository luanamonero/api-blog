const service = require('../services/login');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await service.login({ email, password });
    if (token.message) return res.status(token.code).json(token.message);
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  login,
};