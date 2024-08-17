const AbstractSeeder = require("./AbstractSeeder");
const CandidateSeeder = require("./CandidateSeeder");
const TechnoSeeder = require("./TechnoSeeder");


class TechnoCandidateSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "techno_candidate", truncate: true, dependencies: [CandidateSeeder, TechnoSeeder] });
  }

  // The run method - Populate the 'techno_candidate' table with fake data

  run() {
    // Generate and insert fake data into the 'techno_candidate' table
    for (let i = 0; i < 10; i += 1) {
      // Generate fake techno_candidate data
      const fakeTechnoCandidate = {
        candidate_id: this.getRef(`candidate_${i}`).insertId,
        techno_id: this.getRef(`techno_${i}`).insertId,
        refName: `techno_candidate_${i}`, // Create a reference name for the techno_candidate
      };

      // Insert the faketechno_candidate data into the 'techno_candidate' table
      this.insert(fakeTechnoCandidate); // insert into techno_candidate
    }
  }
}

// Export the techno_candidateSeeder class
module.exports = TechnoCandidateSeeder;
