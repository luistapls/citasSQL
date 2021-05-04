const MySQL = require('../db/MySQL');

const mysqlCitas = new MySQL('citas');

class Citas {
  async createCita(req, res) {
    const { patient_id, consulta_id } = req.body;

    const existentCita = await mysqlCitas.readOne('consulta_id', consulta_id);

    // Si la consulta aparece en la tabla citas, no puede volver a ser elegida.
    if (existentCita[0]) {
      return res
        .status(500)
        .json({ error: 'La cita que desea elegir no esta disponible' });
    } else {
      const newCita = {
        patient_id,
        consulta_id,
      };

      await mysqlCitas.create(newCita);
    }

    return res.status(200).json({});
  }

  async readCitas(req, res) {
    const { cita_id } = req.query;

    if (cita_id) {
      const cita = await mysqlCitas.innerJoin(cita_id);
      return res.status(200).json(cita[0]);
    } else {
      const allCitas = await mysqlCitas.innerJoinAll();

      return res.status(200).json(allCitas);
    }
  }

  async updateCita(req, res) {
    const { cita_id } = req.params;
    const { consulta_id } = req.body;

    const updateCita = {
      consulta_id,
    };

    await mysqlCitas.update(updateCita, 'cita_id', cita_id);

    return res.status(200).json({});
  }

  async deleteCita(req, res) {
    const { cita_id } = req.params;

    await mysqlCitas.delete('cita_id', cita_id);

    return res.status(200).json({});
  }
}

module.exports = Citas;
