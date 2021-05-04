const moment = require('moment');
const MySQL = require('../db/MySQL');

const mysqlConsultas = new MySQL('consultas');
moment().format();

class Consultas {
  async createConsulta(req, res) {
    const {
      date_start,
      date_end,
      hospital_id,
      doctor_id,
      consulta_duration,
    } = req.body;

    // Funcion que devuelve un array con las consultas que coinciden entre las dos fechas suministradas.
    const consultasCoincidencias = await mysqlConsultas.betwenSelect(
      doctor_id,
      date_start,
      date_end,
    );

    // Si el doctor tiene consultas entre el intervalo de tiempo proporcionado, entonces arroja un error.
    if (consultasCoincidencias[0]) {
      return res.status(500).json({
        error:
          'Entre las dos fechas suministradas el doctor tiene consulta(s).',
      });
    } else {
      // Se usa moment para manejar la fecha de inicio y la fecha final de la jornada laboral
      const momentStart = moment(date_start, 'YYYY-MM-DD hh:mm:ss');
      const momentEnd = moment(date_end, 'YYYY-MM-DD hh:mm:ss');

      // Esta funcion devuelve la cantidad de citas de 15 minutos que el doctor puede hacer entre el final y comienzo de la jornada.
      const decideConsultas = (startDate, endDate) =>
        endDate.diff(startDate, 'minutes') / (consulta_duration || 15);

      const numberOfConsultas = decideConsultas(momentStart, momentEnd);

      // Si el numero de consultas es menor a cero significa que la fecha inicial es mayor a la final.
      if (numberOfConsultas < 0) {
        return res.status(500).json({
          error: 'La fecha de inicio no puede ser posterior a la fecha final.',
        });
      } else if (!Number.isInteger(numberOfConsultas)) {
        return res.status(500).json({
          error:
            'La duracion de cada consulta es mayor a la jornada de trabajo.',
        });
      } else {
        const arrayNewConsultas = [];

        // Inicializando contadores.
        let consulta_inicio = momentStart.format('YYYY-MM-DD hh:mm:ss');
        let consulta_final = consulta_inicio;

        for (let i = 0; i < numberOfConsultas; i++) {
          // Sumando 15 minutos a la hora inicial, el cual resulta en la que termina la consulta.
          consulta_final = moment(moment(consulta_final, 'YYYY-MM-DD hh:mm:ss'))
            .add(consulta_duration || 15, 'm')
            .format('YYYY-MM-DD hh:mm:ss');

          // Este objeto representa la consulta. Listo para enviar y ser guardada en la base de datos.
          const newConsulta = [
            consulta_inicio,
            consulta_final,
            hospital_id,
            doctor_id,
          ];

          arrayNewConsultas.push(newConsulta);

          // La fecha final de la consulta es la fecha inicial de la siguiente consulta.
          consulta_inicio = consulta_final;
        }

        await mysqlConsultas.multipleCreate(arrayNewConsultas);
      }
    }

    return res.status(200).json({});
  }

  async readConsultas(req, res) {
    const { consulta_id } = req.query;

    if (consulta_id) {
      const consulta = await mysqlConsultas.readOne('consulta_id', consulta_id);
      return res.status(200).json(consulta[0]);
    } else {
      const allConsultas = await mysqlConsultas.readAll();

      return res.status(200).json(allConsultas);
    }
  }

  async deleteConsulta(req, res) {
    const { consulta_id } = req.params;

    await mysqlConsultas.delete('consulta_id', consulta_id);

    return res.status(200).json({});
  }
}

module.exports = Consultas;
