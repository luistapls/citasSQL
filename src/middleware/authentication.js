const { Token } = require('../models/index');

module.exports = async (req, res, next) => {
  try {
    const authorization = req.header('Authorization');

    if (!authorization) {
      return res.status(400).json({
        error: 'Se debe proporcionar un token para realizar esta consulta.',
      });
    }

    const token = authorization.split(' ')[1];

    const tokenObj = await Token.findOne({
      where: {
        token,
      },
    });

    if (!tokenObj) {
      return res.status(404).json({
        error:
          'El token proporcionado no se ha encontrado en la base de datos.',
      });
    }

    req.user_id = tokenObj.user_id;
    next();
  } catch (error) {
    return res.status(500).json(error);
  }
};
