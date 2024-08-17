const AbstractSeeder = require("./AbstractSeeder");
const CandidateSeeder = require("./CandidateSeeder");
const JobSeeder = require("./JobSeeder");

class JobcandidateSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "job_candidate", truncate: true, dependencies: [CandidateSeeder, JobSeeder] });
  }

  // The run method - Populate the 'job_candidate' table with fake data

  run() {
    // Generate and insert fake data into the 'job_candidate' table
    for (let i = 0; i < 10; i += 1) {
      // Generate fake job_candidate data
      const fakeJobCandidate = {
        candidate_id: this.getRef(`candidate_${i}`).insertId,
        job_id: this.getRef(`job_${i}`).insertId,
        refName: `job_candidate_${i}`, // Create a reference name for the job_candidate
      };

      // Insert the fakejob_candidate data into the 'job_candidate' table
      this.insert(fakeJobCandidate); // insert into job_candidate
    }
  }
}

// Export the job_candidateSeeder class
module.exports = JobcandidateSeeder;
