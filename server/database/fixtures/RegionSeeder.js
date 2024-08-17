const AbstractSeeder = require("./AbstractSeeder");
const CandidateSeeder = require("./CandidateSeeder");
const ConsultantSeeder = require("./ConsultantSeeder");

class RegionSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "region", truncate: true, dependencies: [CandidateSeeder, ConsultantSeeder] });
  }

  // The run method - Populate the 'region' table with fake data

  run() {
    // Generate and insert fake data into the 'region' table
    for (let i = 0; i < 10; i += 1) {
      // Generate fake region data
      const fakeRegion = {
        name: this.faker.helpers.arrayElement(["Auvergne-Rhône-Alpes", "Bourgogne-Franche-Comté", "Bretagne", "Centre-Val de Loire", "Corse", "Grand Est", "Guadeloupe", "Guyane", "Hauts-de-France", "Île-de-France", "La Réunion", "Martinique", "Mayotte", "Normandie", "Nouvelle-Aquitaine", "Occitanie", "Pays de la Loire", "Provence-Alpes-Côte d'Azur"]),
        candidate_id: this.getRef(`candidate_${i}`).insertId,
        consultant_id: this.getRef(`consultant_${i}`).insertId,
        refName: `region_${i}`, // Create a reference name for the region
      };

      // Insert the fakeRegion data into the 'region' table
      this.insert(fakeRegion); // insert into region
    }
  }
}

// Export the regionSeeder class
module.exports = RegionSeeder;
