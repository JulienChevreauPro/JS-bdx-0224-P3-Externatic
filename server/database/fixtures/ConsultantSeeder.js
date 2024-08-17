const AbstractSeeder = require("./AbstractSeeder");
const UserSeeder = require("./UserSeeder");

class ConsultantSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "consultant", truncate: true, dependencies: [UserSeeder] });
  }

  // The run method - Populate the 'consultant' table with fake data

  run() {
    // Generate and insert fake data into the 'consultant' table
    for (let i = 0; i < 10; i += 1) {
      // Generate fake consultant data
      const fakeConsultant = {
        user_id: this.getRef(`user_${i}`).insertId,
        refName: `consultant_${i}`, // Create a reference name for the consultant
      };

      // Insert the fakeConsultant data into the 'consultant' table
      this.insert(fakeConsultant); // insert into consultant
    }
  }
}

// Export the consultantSeeder class
module.exports = ConsultantSeeder;
