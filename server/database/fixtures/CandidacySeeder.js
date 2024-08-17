const AbstractSeeder = require("./AbstractSeeder");
const CandidateSeeder = require("./CandidateSeeder");
const OfferSeeder = require("./OfferSeeder");

class CandidacySeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "candidacy", truncate: true, dependencies: [ OfferSeeder, CandidateSeeder ] });
  }

  // The run method - Populate the 'candidacy' table with fake data

  run() {
    // Generate and insert fake data into the 'candidacy' table
    for (let i = 0; i < 10; i += 1) {
      // Generate fake candidacy data
      const fakeCandidacy = {
        date: this.faker.date.future(),
        status: this.faker.helpers.arrayElement([ "refus", "en cours", "accord"]),
        candidate_id: this.getRef(`candidate_${i}`).insertId,
        offer_id: this.getRef(`offer_${i}`).insertId,
        refName: `candidacy_${i}`, // Create a reference name for the candidacy
      };

      // Insert the fakecandidacy data into the 'candidacy' table
      this.insert(fakeCandidacy); // insert into candidacy
    }
  }
}

// Export the candidacySeeder class
module.exports = CandidacySeeder;
