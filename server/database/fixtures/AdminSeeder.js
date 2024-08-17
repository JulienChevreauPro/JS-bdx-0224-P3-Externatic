const AbstractSeeder = require("./AbstractSeeder");
const UserSeeder = require("./UserSeeder");

class AdminSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "admin", truncate: true, dependencies: [UserSeeder] });
  }

  // The run method - Populate the 'admin' table with fake data

  run() {
    // Generate and insert fake data into the 'admin' table
    for (let i = 0; i < 3; i += 1) {
      // Generate fake admin data
      const fakeAdmin = {
        user_id: this.getRef(`user_${i}`).insertId,
        refName: `admin_${i}`, // Create a reference name for the admin
      };

      // Insert the fakeAdmin data into the 'admin' table
      this.insert(fakeAdmin); // insert into admin
    }
  }
}

// Export the adminSeeder class
module.exports = AdminSeeder;
