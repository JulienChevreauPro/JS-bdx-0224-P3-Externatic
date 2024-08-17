const AbstractSeeder = require("./AbstractSeeder");
const CandidateSeeder = require("./CandidateSeeder");

class CvSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "cv", truncate: true, dependencies: [CandidateSeeder] });
  }

  // The run method - Populate the 'cv' table with fake data

  run() {
    // Generate and insert fake data into the 'cv' table
    for (let i = 0; i < 10; i += 1) {
      // Generate fake cv data
      const fakeCv = {
        path: this.faker.image.urlPlaceholder(),
        name: this.faker.person.lastName(),
        candidate_id: this.getRef(`candidate_${i}`).insertId,
        refName: `cv_${i}`, // Create a reference name for the cv
      };

      // Insert the fakeCv data into the 'cv' table
      this.insert(fakeCv); // insert into cv
    }
  }
}

// Export the cvSeeder class
module.exports = CvSeeder;
