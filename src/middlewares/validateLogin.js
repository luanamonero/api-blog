const validateEmail = (req, res, next) => {
  const { email } = req.body;
  if (email === '') {
    return res
      .status(400)
      .json({ message: '"email" is not allowed to be empty' });
  }

  if (!email) {
    return res.status(400).json({ message: '"email" is required' });
  }
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (password === '') {
    return res
      .status(400)
      .json({ message: '"password" is not allowed to be empty' });
  }
  if (!password) {
    return res.status(400).json({ message: '"password" is required' });
  }
  next();
};

module.exports = {
  validateEmail,
  validatePassword,
};
