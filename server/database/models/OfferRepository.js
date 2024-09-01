const AbstractRepository = require("./AbstractRepository");

class OfferRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "offer" as configuration
    super({ table: "offer" });
  }

  async create(offer) {
    try {
      await this.database.query("START TRANSACTION");

      const [consultant] = await this.database.query(
        `SELECT id FROM consultant WHERE user_id = ?`,
        [offer.authId]
      );
      if (!consultant.length) {
        throw new Error(
          `Consultant with user_id ${offer.authId} does not exist`
        );
      }
      const consultantId = consultant[0].id;

      const [offerResult] = await this.database.query(
        `INSERT INTO ${this.table} (title, city, salary, details, advantages, type, consultant_id, company_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          offer.title,
          offer.city,
          parseInt(offer.salary, 10),
          offer.details,
          offer.advantages,
          offer.type,
          consultantId,
          parseInt(offer.company, 10),
        ]
      );
      const offerId = offerResult.insertId;

      const technoPromises = offer.techno.map(async (tech) =>
        this.database.query(
          `INSERT INTO techno_offer (offer_id, techno_id) VALUES (?, ?)`,
          [offerId, tech]
        )
      );
      await Promise.all(technoPromises);

      await this.database.query("COMMIT");
      return offerId;
    } catch (error) {
      await this.database.query("ROLLBACK");
      console.error("Erreur lors de la création de l'offre :", error);
      throw error;
    }
  }

  async read(id) {
    const [rows] = await this.database.query(
      `
      SELECT 
        offer.id, 
        offer.title, 
        offer.type,
        offer.details, 
        offer.city, 
        offer.advantages, 
        offer.salary, 
        company.name, 
        company.banner, 
        company.logo, 
        company.description, 
        (
          SELECT JSON_ARRAYAGG(JSON_OBJECT('name', techno.name))
          FROM techno_offer
          INNER JOIN techno ON techno_offer.techno_id = techno.id
          WHERE techno_offer.offer_id = offer.id
        ) AS technos
      FROM ${this.table} AS offer
      INNER JOIN company ON offer.company_id = company.id
      WHERE offer.id = ?
      `,
      [id]
    );

    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(
      `
        SELECT  offer.id,
                offer.title,
                offer.type,
                offer.details,
                offer.salary,
                offer.city,
                company.name AS company_name,
                (
                  SELECT JSON_ARRAYAGG(JSON_OBJECT('name', techno.name))
                  FROM techno_offer
                  INNER JOIN techno ON techno_offer.techno_id = techno.id
                  WHERE techno_offer.offer_id = offer.id
                ) AS technos
                FROM ${this.table} AS offer
                INNER JOIN company ON offer.company_id = company.id
      `
    );

    return rows;
  }

  async readAllWithFavorites(userId) {
    const [candidateRows] = await this.database.query(
      `SELECT id FROM candidate WHERE user_id = ?`,
      [userId]
    );

    if (candidateRows.length === 0) {
      throw new Error(`Candidate for user_id ${userId} does not exist`);
    }

    const candidateId = candidateRows[0].id;

    const [rows] = await this.database.query(
      `
        SELECT  offer.id,
                offer.title,
                offer.type,
                offer.details,
                offer.city,
                offer.advantages,
                offer.salary,
                company.name AS company_name,
                IF(f.candidate_id IS NULL, FALSE, TRUE) AS is_favorite,
                (
                  SELECT JSON_ARRAYAGG(JSON_OBJECT('name', techno.name))
                  FROM techno_offer
                  INNER JOIN techno ON techno_offer.techno_id = techno.id
                  WHERE techno_offer.offer_id = offer.id
                ) AS technos
        FROM ${this.table} AS offer
        LEFT JOIN favorite f ON offer.id = f.offer_id AND f.candidate_id = ?
        INNER JOIN company ON offer.company_id = company.id
      `,
      [candidateId]
    );
    return rows;
  }

  async delete(offerId) {
    try {
      await this.database.query("START TRANSACTION");

      await this.database.query(
        `DELETE FROM techno_offer WHERE offer_id = ?`,
         [offerId]
      );

      const [result] = await this.database.query(
        `DELETE FROM ${this.table} WHERE id = ?`,
        [offerId]
      );

      await this.database.query("COMMIT");

      return result.affectedRows;
    } catch (err) {
      await this.database.query("ROLLBACK");
      throw err;
    }
  }
}

module.exports = OfferRepository;
