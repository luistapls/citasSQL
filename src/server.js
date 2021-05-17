require('dotenv').config();

const express = require('express');
const app = express();

const { connection } = require('./database/db');

app.set('port', process.env.PORT || 3000);

app.use(express.json());

// app.use('/api/appointments', require('./routes/appointmentsRoutes'));
app.use('/api/journeys', require('./routes/journeysRoutes'));

app.listen(app.get('port'), async () => {
  console.log('Server on port: ', app.get('port'));

  try {
    await connection.sync({ force: false });
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
