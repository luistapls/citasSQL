const pool = require('../db/database');

class MySQL {
  constructor(tableName) {
    this.tableName = tableName;
  }
  async multipleCreate(arrayNewData) {
    await pool.query(
      `INSERT INTO consultas (consulta_inicio, consulta_final, hospital_id, doctor_id) VALUES ?`,
      [arrayNewData],
    );
  }

  async create(newData) {
    await pool.query(`INSERT INTO ${this.tableName} SET ?`, [newData]);
  }

  readAll() {
    return pool.query(`SELECT * FROM ${this.tableName}`);
  }

  readOne(searchCondition, value) {
    return pool.query(
      `SELECT * FROM ${this.tableName} WHERE ${searchCondition} = ?`,
      [value],
    );
  }

  async update(updateData, searchCondition, value) {
    await pool.query(
      `UPDATE ${this.tableName} SET ? WHERE ${searchCondition} = ?`,
      [updateData, value],
    );
  }

  async delete(searchCondition, value) {
    await pool.query(
      `DELETE FROM ${this.tableName} WHERE ${searchCondition} = ?`,
      [value],
    );
  }

  betwenSelect(id, start_date, end_date) {
    return pool.query(
      `SELECT * FROM ${this.tableName} WHERE doctor_id = ${id} AND consulta_inicio BETWEEN "${start_date}" AND "${end_date}"`,
    );
  }

  innerJoinAll() {
    return pool.query(
      `SELECT * FROM citas INNER JOIN patients ON citas.patient_id = patients.patient_id INNER JOIN consultas ON citas.consulta_id = consultas.consulta_id INNER JOIN hospitals ON consultas.hospital_id = hospitals.hospital_id INNER JOIN doctors ON consultas.doctor_id = doctors.doctor_id `,
    );
  }

  innerJoin(id) {
    return pool.query(
      `SELECT * FROM citas INNER JOIN patients ON citas.patient_id = patients.patient_id INNER JOIN consultas ON citas.consulta_id = consultas.consulta_id INNER JOIN hospitals ON consultas.hospital_id = hospitals.hospital_id INNER JOIN doctors ON consultas.doctor_id = doctors.doctor_id WHERE cita_id = ${id}`,
    );
  }
}

module.exports = MySQL;
