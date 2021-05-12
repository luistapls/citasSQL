const { Tokenrol, Rol } = require('../database/db');

const createCita = async (req, res, next) => {
  const authorization = req.header('Authorization');

  if (authorization) {
    const token = authorization.split(' ')[1];

    const findToken = await Tokenrol.findOne({
      where: {
        token,
      },
      include: Rol,
    });

    if (findToken) {
      const { rolName } = findToken.rol;

      if (rolName === 'Patient') {
        req.token = token;
        next();
      } else {
        return res
          .status(401)
          .json({ error: 'Solo los pacientes pueden crear citas.' });
      }
    } else {
      return res
        .status(404)
        .json({ error: 'El token proporcionado no se ha encontrado.' });
    }
  } else {
    return res.status(400).json({
      error: 'Se debe proporcionar un token para realizar esta consulta.',
    });
  }
};

const readCita = async (req, res, next) => {
  const authorization = req.header('Authorization');

  if (authorization) {
    const token = authorization.split(' ')[1];

    const findToken = await Tokenrol.findOne({
      where: {
        token,
      },
      include: Rol,
    });

    if (findToken) {
      const { rolName } = findToken.rol;

      req.token = token;
      req.typeRead = rolName;

      next();
    } else {
      return res
        .status(404)
        .json({ error: 'El token proporcionado no se ha encontrado.' });
    }
  } else {
    return res.status(400).json({
      error: 'Se debe proporcionar un token para realizar esta consulta.',
    });
  }
};
module.exports = { createCita, readCita };
