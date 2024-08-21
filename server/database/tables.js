// Import the repository modules responsible for handling data operations on the tables
const OfferRepository = require("./models/OfferRepository");
const TechnoRepository = require("./models/TechnoRepository");
const CompanyRepository = require("./models/CompanyRepository");
const UserRepository = require("./models/UserRepository")
const CandidacyRepository = require("./models/CandidacyRepository")
const FavoriteRepository = require("./models/FavoriteRepository");
const CandidateRepository = require("./models/CandidateRepository");
const RegionRepository = require("./models/RegionRepository");

// Create an empty object to hold data repositories for different tables
const tables = {};

/* ************************************************************************* */
// Register data repositories for tables
/* ************************************************************************* */

// Register each repository as data access point for its table
tables.offer = new OfferRepository();
tables.techno = new TechnoRepository();
tables.company = new CompanyRepository();
tables.user = new UserRepository();
tables.candidacy = new CandidacyRepository();
tables.favorite = new FavoriteRepository();
tables.candidate = new CandidateRepository();
tables.region = new RegionRepository();


/* ************************************************************************* */

// Use a Proxy to customize error messages when trying to access a non-existing table

// Export the Proxy instance with custom error handling
module.exports = new Proxy(tables, {
  get(obj, prop) {
    // Check if the property (table) exists in the tables object
    if (prop in obj) return obj[prop];

    // If the property (table) does not exist, throw a ReferenceError with a custom error message
    throw new ReferenceError(
      `tables.${prop} is not defined. Did you register it in ${__filename}?`
    );
  },
});