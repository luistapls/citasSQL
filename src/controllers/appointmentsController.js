const { Op } = require('sequelize');

const { Appointment, Clinic, User } = require('../models/index');

const appointmentsCoincidence = async (startDate, endDate, doctor_id) =>
  await Appointment.findAll({
    where: {
      appointment_start: {
        [Op.between]: [startDate, endDate],
      },
      doctor_id,
    },
  });

const numberAppointments = (startDate, endDate, duration) => {
  return (endDate - startDate) / 60000 / (duration || 15);
};

const createAppointments = async (req, res) => {
  try {
    const {
      doctor_id,
      clinic_id,
      date_start,
      date_end,
      appointment_duration,
      appointment_specialty,
    } = req.body;

    let appointment_start = new Date(date_start);
    let appointment_end = new Date(date_end);

    const coincidence = await appointmentsCoincidence(
      appointment_start,
      appointment_end,
      doctor_id,
    );

    if (coincidence.length) {
      return res.status(409).json({
        error:
          'Entre las dos fechas suministradas el doctor tiene consulta(s).',
        consultas: coincidence,
      });
    } else {
      const countAppointments = numberAppointments(
        appointment_start,
        appointment_end,
        appointment_duration,
      );

      if (countAppointments < 0) {
        return res.status(400).json({
          error:
            'La fecha de inicio de trabajo no puede ser posterior a la fecha final de trabajo.',
          fechas: {
            appointment_start,
            appointment_start,
          },
        });
      } else if (!Number.isInteger(countAppointments)) {
        return res.status(400).json({
          error:
            'La duracion de cada consulta es mayor a la jornada de trabajo.',
          appointment_start,
          appointment_end,
          appointment_duration,
        });
      } else {
        const newAppointments = [];

        for (let i = 0; i < countAppointments; i++) {
          appointment_end = new Date(appointment_start.getTime() + 15 * 60000);

          const newAppointment = {
            doctor_id,
            clinic_id,
            appointment_start,
            appointment_end,
            appointment_status: 'AVAILABLE',
            appointment_specialty,
          };

          newAppointments.push(newAppointment);

          appointment_start = appointment_end;
        }

        const createAppointments = await Appointment.bulkCreate(
          newAppointments,
        );

        return res.status(201).json(createAppointments);
      }
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const readAppointments = async (req, res) => {
  const findAppointments = await Appointment.findAll({
    where: {
      appointment_status: 'AVAILABLE',
    },
    include: [
      {
        model: Clinic,
        as: 'clinic',
      },
      {
        model: User,
        as: 'doctor',
      },
      {
        model: User,
        as: 'patient',
      },
    ],
  });

  return res.status(200).json(findAppointments);
};

const updateAppointments = async (req, res) => {};

const deleteAppointments = async (req, res) => {
  try {
    const { appointments_id } = req.params;

    const destroyAppointment = await Appointment.destroy({
      where: {
        id: appointments_id,
        doctor_id: req.userObj.id,
      },
    });

    return res.status(200).json(destroyAppointment);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const createRequest = async (req, res) => {
  try {
    const { appointment_id, appointment_reason, patient_id } = req.body;

    const requestAppointment = await Appointment.update(
      {
        appointment_reason,
        patient_id,
        appointment_status: 'NOT AVAILABLE',
      },
      {
        where: {
          id: appointment_id,
        },
      },
    );

    return res.status(201).json(requestAppointment);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteRequest = async (req, res) => {
  try {
    const { appointments_id } = req.params;

    const deletedRequest = await Appointment.update(
      {
        appointment_reason: null,
        patient_id: null,
        appointment_status: 'AVAILABLE',
      },
      {
        where: {
          id: appointments_id,
          patient_id: req.userObj.id,
        },
      },
    );

    return res.status(200).json(deletedRequest);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  createAppointments,
  readAppointments,
  updateAppointments,
  deleteAppointments,
  createRequest,
  deleteRequest,
};
