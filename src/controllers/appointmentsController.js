const { Op } = require('sequelize');

const { Appointment, Clinic, User } = require('../models/index');

const appointmentsCoincidence = async (startDate, endDate, doctor_id) =>
	await Appointment.findAll({
		where: {
			appointment_start: {
				[Op.between]: [startDate, endDate],
			},
			appointment_end: {
				[Op.between]: [startDate, endDate],
			},
			doctor_id,
		},
	});

const numberAppointments = (startDate, endDate, duration) => {
	return (endDate - startDate) / 60000 / duration;
};

const skipInstances = (page, limit) => {
	const numberSkips = (page - 1) * limit || 0;

	if (numberSkips > 0) {
		return numberSkips;
	}
	return 0;
};

const createAppointments = async (req, res) => {
	try {
		const {
			clinic_id,
			date_start,
			date_end,
			appointment_duration,
			appointment_specialty,
		} = req.body;

		if (
			!Number.isInteger(clinic_id) ||
			!Number.isInteger(appointment_duration)
		) {
			return res.status(400).json({
				error:
					'El id de la clinica y la duracion de la cita tienen que ser numeros enteros.',
			});
		}

		let appointment_start = new Date(date_start);
		let appointment_end = new Date(date_end);

		if (
			String(appointment_start) === 'Invalid Date' ||
			String(appointment_end) === 'Invalid Date'
		) {
			return res
				.status(400)
				.json({ error: 'La fecha de inicio y/o final no son invalidas.' });
		}

		if (appointment_start.getTime() < Date.now()) {
			return res.status(400).json({
				error:
					'El intervalo de tiempo proporcionado tiene que ser posterior a la fecha actual.',
			});
		}

		const coincidence = await appointmentsCoincidence(
			appointment_start,
			appointment_end,
			req.user_id
		);

		if (coincidence.length) {
			return res.status(409).json({
				error:
					'Entre las dos fechas suministradas el doctor tiene consulta(s).',
				consultas: coincidence,
			});
		}

		const countAppointments = numberAppointments(
			appointment_start,
			appointment_end,
			appointment_duration
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
					'La duracion de cada consulta no puede ser mayor a la jornada de trabajo. Ademas, al sumar la duracion de todas las consultas tiene que ser igual a la jornada de trabajo.',
				appointment_start,
				appointment_end,
				appointment_duration,
			});
		}

		const newAppointments = [];

		for (let i = 0; i < countAppointments; i++) {
			appointment_end = new Date(
				appointment_start.getTime() + appointment_duration * 60000
			);

			const newAppointment = {
				doctor_id: req.user_id,
				clinic_id,
				appointment_start,
				appointment_end,
				appointment_status: 'AVAILABLE',
				appointment_specialty,
			};

			newAppointments.push(newAppointment);

			appointment_start = appointment_end;
		}

		const createAppointments = await Appointment.bulkCreate(newAppointments);

		return res.status(201).json(createAppointments);
	} catch (error) {
		return res.status(500).json(error);
	}
};

const readAppointments = async (req, res) => {
	try {
		const { page, doctor_id, date } = req.query;

		const limit = 10;
		const offset = skipInstances(Number(page), limit);

		const whereObj = {
			appointment_status: 'AVAILABLE',
		};

		if (doctor_id !== undefined) whereObj.doctor_id = doctor_id;
		if (date !== undefined)
			whereObj.appointment_start = {
				[Op.gte]: new Date(date),
			};

		const findAppointments = await Appointment.findAll({
			limit,
			offset,
			where: whereObj,
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
	} catch (error) {
		return res.status(500).json(error);
	}
};

const updateAppointments = async (req, res) => {
	try {
		const {
			appointments_id,
			date_start,
			date_end,
			appointment_status,
			appointment_specialty,
			clinic_id,
		} = req.params;

		const appointment_start = new Date(date_start);
		const appointment_end = new Date(date_end);

		const update = await Appointment.update(
			{
				appointment_start,
				appointment_end,
				clinic_id,
				appointment_specialty,
				appointment_status,
				doctor_id: req.user_id,
			},
			{
				where: {
					id: appointments_id,
					doctor_id: req.user_id,
				},
			}
		);

		if (!update) {
			return res
				.status(400)
				.json({
					error:
						'No se ha actualizado con exito. Solo los creadores de las consultas pueden actualizar las mismas.',
				});
		}

		return res.status(200).json(update);
	} catch (error) {
		return res.status(500).json(error);
	}
};

const deleteAppointments = async (req, res) => {
	try {
		const { appointments_id } = req.params;

		const destroyAppointment = await Appointment.destroy({
			where: {
				id: appointments_id,
				doctor_id: req.user_id,
			},
		});

		if (!destroyAppointment) {
			return res.status(400).json({ error: 'No se ha borrado con exito.' });
		}

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
			}
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
			}
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
