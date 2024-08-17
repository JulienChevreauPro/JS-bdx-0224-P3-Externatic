const AbstractSeeder = require("./AbstractSeeder");
const CompanySeeder = require("./CompanySeeder");
const ConsultantSeeder = require("./ConsultantSeeder");
const JobSeeder = require("./JobSeeder");

class OfferSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({
      table: "offer",
      truncate: true,
      dependencies: [ConsultantSeeder, CompanySeeder, JobSeeder],
    });
  }

  // The run method - Populate the 'offer' table with fake data

  run() {
    // Generate and insert fake data into the 'offer' table
    for (let i = 0; i < 10; i += 1) {
      // Generate fake offer data
      const fakeOffer = {
        title: this.faker.helpers.arrayElement([
          "Développeur web",
          "Développeur fullstack",
          "Développeur front-end",
          "Développeur back-end",
        ]),
        type: this.faker.helpers.arrayElement([
            "CDI",
            "CDD",
            "Alternance",
            "Freelance",
            "stage",
          ]),
        details: this.faker.lorem.paragraph(),
        city: this.faker.helpers.arrayElement([
          "Paris",
          "Marseille",
          "Lyon",
          "Toulouse",
          "Nice",
          "Nantes",
          "Strasbourg",
          "Montpellier",
          "Bordeaux",
          "Lille",
          "Rennes",
          "Reims",
          "Le Havre",
          "Saint-Étienne",
          "Toulon",
          "Grenoble",
          "Dijon",
          "Angers",
        ]),
        advantages: this.faker.lorem.paragraph(),
        salary: this.faker.number.int({ min: 10000, max: 100000 }),
        consultant_id: this.getRef(`consultant_${i}`).insertId,
        job_id: this.getRef(`job_${i}`).insertId,
        company_id: this.getRef(`company_${i}`).insertId,
        refName: `offer_${i}`, // Create a reference name for the offer
      };

      // Insert the fakeOffer data into the 'offer' table
      this.insert(fakeOffer); // insert into offer
    }
  }
}

// Export the offerSeeder class
module.exports = OfferSeeder;
