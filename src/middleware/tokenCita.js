const { Patient } = require('../database/db');

module.exports = async (req, res, next) => {
  const token = req.header('Authorization').split(' ')[1];

  if (token) {
    try {
      const patient = await Patient.findOne({
        where: {
          token,
        },
      });

      if (patient) {
        req.patient = patient;
        next();
      } else {
        return res
          .status(404)
          .json({
            error: 'El token proporcionado no pertenece a ningun paciente.',
          });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }
};
