const AbstractRepository = require("./AbstractRepository");

class FavoriteRepository extends AbstractRepository {
  constructor() {
    super({ table: "favorite" });
  }

  async create(favorite) {
    const [candidateRows] = await this.database.query(
      `SELECT c.id FROM candidate c
         WHERE c.user_id = ?`,
      [favorite.candidateId]
    );

    if (candidateRows.length === 0) {
      throw new Error(
        `Candidate for user_id ${favorite.userId} does not exist`
      );
    }

    const candidateId = candidateRows[0].id;

    const [offerRows] = await this.database.query(
      `SELECT * FROM offer WHERE id = ?`,
      [favorite.offerId]
    );
    if (offerRows.length === 0) {
      throw new Error(`Offer with id ${favorite.offerId} does not exist`);
    }
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (candidate_id, offer_id) VALUES (?, ?)`,
      [candidateId, favorite.offerId]
    );
    return result.insertId;
  }

  async read(userId) {
    const [candidateRows] = await this.database.query(
      `SELECT id FROM candidate WHERE user_id = ?`,
      [userId]
    );

    if (candidateRows.length === 0) {
      throw new Error(`Candidate for user_id ${userId} does not exist`);
    }

    const candidateId = candidateRows[0].id;

    const [rows] = await this.database.query(
      `SELECT ${this.table}.*, offer.*,
        (
          SELECT JSON_ARRAYAGG(JSON_OBJECT('name', techno.name))
          FROM techno_offer
          INNER JOIN techno ON techno_offer.techno_id = techno.id
          WHERE techno_offer.offer_id = offer.id
        ) AS technos
        FROM ${this.table}
        INNER JOIN offer ON ${this.table}.offer_id = offer.id
        WHERE candidate_id = ?`,
      [candidateId]
    );

    return rows;
  }

  async delete(favorite) {
    const [candidateRows] = await this.database.query(
      `SELECT c.id FROM candidate c
         WHERE c.user_id = ?`,
      [favorite.candidateId]
    );

    if (candidateRows.length === 0) {
      throw new Error(
        `Candidate for user_id ${favorite.userId} does not exist`
      );
    }

    const candidateId = candidateRows[0].id;

    const [offerRows] = await this.database.query(
      `SELECT * FROM offer WHERE id = ?`,
      [favorite.offerId]
    );

    const offerId = offerRows[0].id;

    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE candidate_id = ? AND offer_id = ?`,
      [candidateId, offerId]
    );
    return result.affectedRows;
  }
}

module.exports = FavoriteRepository;
