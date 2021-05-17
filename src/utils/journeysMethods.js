const { Op } = require('sequelize');
const { Journey, Doctor, Clinic, Patient } = require('../database/db');

const journeyCoincidence = async (startDate, endDate, doctorId) =>
  await Journey.findAll({
    where: {
      journeyStart: {
        [Op.between]: [startDate, endDate],
      },
      doctorId,
    },
  });

const numberJourneys = (startDate, endDate, duration) => {
  return (endDate - startDate) / 60000 / (duration || 15);
};

const createJourney = async (req, res) => {
  const { doctorId, clinicId, dateStart, dateEnd, journeyDuration } = req.body;

  const startWork = new Date(dateStart);
  const endWork = new Date(dateEnd);

  const coincidence = await journeyCoincidence(startWork, endWork, doctorId);

  if (coincidence.length) {
    return res.status(400).json({
      error: 'Entre las dos fechas suministradas el doctor tiene consulta(s).',
      consultas: coincidence,
    });
  } else {
    const countJourneys = numberJourneys(startWork, endWork, journeyDuration);

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
        journeyDuration,
      });
    } else {
      const newJourneys = [];

      let journeyStart = startWork;

      for (let i = 0; i < countJourneys; i++) {
        let journeyEnd = new Date(journeyStart.getTime() + 15 * 60000);

        const newJourney = {
          doctorId,
          clinicId,
          journeyStart,
          journeyEnd,
        };

        newJourneys.push(newJourney);

        journeyStart = journeyEnd;
      }

      try {
        const createJourney = await Journey.bulkCreate(newJourneys);

        return res.status(201).json({ createJourney });
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
  const { journeyId } = req.params;
  await Journey.destroy({
    where: {
      id: journeyId,
    },
  });

  return res.status(200).json({});
};
module.exports = { createJourney, readJourney, deleteJourney };
