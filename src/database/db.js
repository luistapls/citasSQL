const { Sequelize, DataTypes } = require('sequelize');
const config = require('../../config/config');
const db = {};

db.connection = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

db.Patient = require('../models/Patient')(db.connection, DataTypes);
db.Doctor = require('../models/Doctor')(db.connection, DataTypes);
db.Ubication = require('../models/Ubication')(db.connection, DataTypes);
db.Appointment = require('../models//Appointment')(db.connection, DataTypes);
db.Cita = require('../models/Cita')(db.connection, DataTypes);
db.Rol = require('../models/Rol')(db.connection, DataTypes);
db.Tokenrol = require('../models/Tokenrol')(db.connection, DataTypes);

db.Doctor.associate(db.Appointment);
db.Appointment.associate(db.Doctor, 'belongsTo');

db.Ubication.associate(db.Appointment);
db.Appointment.associate(db.Ubication, 'belongsTo');

db.Appointment.associate(db.Cita, 'hasOne');
db.Cita.associate(db.Appointment);

db.Patient.associate(db.Cita);
db.Cita.associate(db.Patient);

db.Rol.associate(db.Tokenrol);
db.Tokenrol.associate(db.Rol);

module.exports = db;
