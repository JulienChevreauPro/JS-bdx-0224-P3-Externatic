const AbstractSeeder = require("./AbstractSeeder");
const UserSeeder = require("./UserSeeder");

class CandidateSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "candidate", truncate: true, dependencies: [UserSeeder] });
  }

  // The run method - Populate the 'candidate' table with fake data

  run() {
    // Generate and insert fake data into the 'candidate' table
    for (let i = 0; i < 10; i += 1) {
      // Generate fake candidate data
      const fakeCandidate = {
        picture: this.faker.image.avatar(),
        user_id: this.getRef(`user_${i}`).insertId,
        refName: `candidate_${i}`, // Create a reference name for the candidate
      };

      // Insert the fakecandidate data into the 'candidate' table
      this.insert(fakeCandidate); // insert into candidate
    }
  }
}

// Export the candidateSeeder class
module.exports = CandidateSeeder;
