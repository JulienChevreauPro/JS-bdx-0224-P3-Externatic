const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    super({ table: "user" });
  }

  async readAll() {
    const [rows] = await this.database.query(
      `SELECT id, firstname, lastname, email FROM ${this.table}`
    );
    return rows;
  }

  async create(user) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (firstname, lastname, email, hashed_password) VALUES(?, ?, ?, ?)`,
      [user.firstname, user.lastname, user.email, user.hashedPassword]
    );

    const [candidat] = await this.database.query(
      `INSERT INTO candidate (user_id) VALUES(?)`,
      [result.insertId]
    );
    return candidat.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `
      SELECT 
      user.id,
      user.firstname,
      user.lastname,
      user.email,
      user.phone,
      candidate.picture,
      region.name,
      (
        SELECT JSON_ARRAYAGG(JSON_OBJECT('name', techno.name))
        FROM techno_candidate
        LEFT JOIN techno ON techno_candidate.techno_id = techno.id
        WHERE techno_candidate.candidate_id = candidate.id
      ) AS technos
  FROM ${this.table}
  LEFT JOIN candidate ON user.id = candidate.user_id
  LEFT JOIN region ON region.candidate_id = candidate.id
  WHERE user.id = ?
      `,
      [id]
    );
    return rows[0];
  }

  async readByEmailWithPassword(email) {
    const [rows] = await this.database.query(
      `SELECT id, email, hashed_password, role FROM ${this.table} WHERE email = ?`,
      [email]
    );
    return rows[0];
  }

  async readCandidate(id) {
    const [rows] = await this.database.query(
      `SELECT firstname, lastname, email, cv.path AS cv_path,
      cv.name AS cv_name
    FROM user u
    INNER JOIN candidate AS c ON u.id = c.user_id
    LEFT JOIN cv ON c.id = cv.candidate_id
    WHERE u.id = ?`,
      [id]
    );
    return rows;
  }

  async readByConsultant(id) {
    const [rows] = await this.database.query(
      `SELECT 
      u.id,
      u.firstname, 
      u.lastname, 
      u.phone, 
      u.email, 
      u.role,
      cv.path AS cv,
      JSON_ARRAYAGG(
        JSON_OBJECT('name', t.name)
      ) AS technos
    FROM user AS u
    INNER JOIN candidate AS c ON u.id = c.user_id
    INNER JOIN candidacy AS cd ON c.id = cd.candidate_id
    INNER JOIN offer AS o ON cd.offer_id = o.id
    INNER JOIN consultant AS con ON o.consultant_id = con.id
    INNER JOIN user AS con_user ON con.user_id = con_user.id
    LEFT JOIN techno_candidate AS tc ON c.id = tc.candidate_id
    LEFT JOIN techno AS t ON tc.techno_id = t.id
    LEFT JOIN cv ON c.id = cv.candidate_id
    WHERE con_user.id = ? AND u.role = 'candidat'
    GROUP BY u.id, u.firstname, u.lastname, u.phone, u.email, u.role, cv.path`,
      [id]
    );
    return rows;
  }

  async update(data, id) {
    const { email, phone } = data;
    const query = `
      UPDATE ${this.table}
      SET email = ?, phone = ?
      WHERE id = ?
    `;
    const [result] = await this.database.query(query, [email, phone, id]);
    return result;
  }

  async delete(id) {
    await this.database.query("START TRANSACTION");

    try {
      await this.database.query(
        `DELETE FROM favorite WHERE candidate_id = (SELECT id FROM candidate WHERE user_id = ?)`,
        [id]
      );

      await this.database.query(
        `DELETE FROM candidacy WHERE candidate_id = (SELECT id FROM candidate WHERE user_id = ?)`,
        [id]
      );

      await this.database.query(`DELETE FROM candidate WHERE user_id = ?`, [
        id,
      ]);

      await this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);

      await this.database.query("COMMIT");
    } catch (error) {
      await this.database.query("ROLLBACK");
      throw error;
    }
  }
}

module.exports = UserRepository;
