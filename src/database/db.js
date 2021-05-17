const { Sequelize, DataTypes } = require('sequelize');
const config = require('../../config/config');
const db = {};

db.connection = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

db.User = require('../models/User')(db.connection, DataTypes);
db.Permission = require('../models/Permission')(db.connection, DataTypes);
db.UserPermission = require('../models/UserPermission')(
  db.connection,
  DataTypes,
);
db.Role = require('../models/Role')(db.connection, DataTypes);
db.UserRole = require('../models/UserRole')(db.connection, DataTypes);
db.RolePermission = require('../models/RolePermission')(
  db.connection,
  DataTypes,
);
db.Token = require('../models/Token')(db.connection, DataTypes);
db.Patient = require('../models/Patient')(db.connection, DataTypes);
db.Clinic = require('../models/Clinic')(db.connection, DataTypes);
db.Doctor = require('../models/Doctor')(db.connection, DataTypes);
db.Appointment = require('../models/Appointment')(db.connection, DataTypes);
db.Journey = require('../models/Journey')(db.connection, DataTypes);

db.User.associate(db);
db.Permission.associate(db);
db.UserPermission.associate(db);
db.Role.associate(db);
db.UserRole.associate(db);
db.RolePermission.associate(db);
db.Token.associate(db);
db.Patient.associate(db);
db.Clinic.associate(db);
db.Doctor.associate(db);
db.Appointment.associate(db);
db.Journey.associate(db);

module.exports = db;
