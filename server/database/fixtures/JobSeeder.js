const AbstractSeeder = require("./AbstractSeeder");

class JobSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "job", truncate: true });
  }

  // The run method - Populate the 'job' table with fake data

  run() {
    // Generate and insert fake data into the 'job' table
    for (let i = 0; i < 10; i += 1) {
      // Generate fake job data
      const fakeJob = {
        name: this.faker.helpers.arrayElement(["Développeur web", "Développeur fullstack", "Développeur front-end", "Développeur back-end"]),
        refName: `job_${i}`, // Create a reference name for the job
      };

      // Insert the fakeJob data into the 'job' table
      this.insert(fakeJob); // insert into job
    }
  }
}

// Export the jobSeeder class
module.exports = JobSeeder;
