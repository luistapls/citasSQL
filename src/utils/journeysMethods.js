const { Op } = require('sequelize');
const { Journey, Doctor, Clinic } = require('../database/db');

const journeyCoincidence = async (startDate, endDate, doctor_id) =>
  await Journey.findAll({
    where: {
      journey_start: {
        [Op.between]: [startDate, endDate],
      },
      doctor_id,
    },
  });

const numberJourneys = (startDate, endDate, duration) => {
  return (endDate - startDate) / 60000 / (duration || 15);
};

const createJourney = async (req, res) => {
  const { doctor_id, clinic_id, date_start, date_end, journey_duration } =
    req.body;

  const startWork = new Date(date_start);
  const endWork = new Date(date_end);

  const coincidence = await journeyCoincidence(startWork, endWork, doctor_id);

  if (coincidence.length) {
    return res.status(400).json({
      error: 'Entre las dos fechas suministradas el doctor tiene consulta(s).',
      consultas: coincidence,
    });
  } else {
    const countJourneys = numberJourneys(startWork, endWork, journey_duration);

    if (countJourneys < 0) {
      return res.status(400).json({
        error:
          'La fecha de inicio de trabajo no puede ser posterior a la fecha final de trabajo.',
        fechas: {
          startWork,
          endWork,
        },
      });
    } else if (!Number.isInteger(countJourneys)) {
      return res.status(400).json({
        error: 'La duracion de cada consulta es mayor a la jornada de trabajo.',
        startWork,
        endWork,
        journey_duration,
      });
    } else {
      const newJourneys = [];

      let journey_start = startWork;

      for (let i = 0; i < countJourneys; i++) {
        let journey_end = new Date(journey_start.getTime() + 15 * 60000);

        const newJourney = {
          doctor_id,
          clinic_id,
          journey_start,
          journey_end,
        };

        newJourneys.push(newJourney);

        journey_start = journey_end;
      }

      try {
        const createJourney = await Journey.bulkCreate(newJourneys);

        return res.status(201).json(createJourney);
      } catch (error) {
        return res.status(500).json(error);
      }
    }
  }
};

const readJourney = async (req, res) => {
  const readJourney = await Journey.findAll({
    include: [Doctor, Clinic],
  });

  return res.status(200).json(readJourney);
};

const deleteJourney = async (req, res) => {
  const { journey_id } = req.params;
  await Journey.destroy({
    where: {
      id: journey_id,
    },
  });

  return res.status(200).json({});
};
module.exports = { createJourney, readJourney, deleteJourney };
