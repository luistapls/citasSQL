require('dotenv').config();
// Prueba
// SEgunda prueba
// MAs cambios en esta verga
// OJALA FUNCIONE ESTA VERGA
const express = require('express');
const app = express();

const { sequelize } = require('./models/index');

app.set('port', process.env.PORT || 3000);

app.use(express.json());

app.use('/api/appointments', require('./routes/appointmentsRoutes'));

app.listen(app.get('port'), async () => {
  console.log('Server on port: ', app.get('port'));

  try {
    await sequelize.sync({ force: false });
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
