// const argon2 = require("argon2");
// const tables = require("../../database/tables");

// const verifyPassword = async (email, password) => {
//   const user = await tables.user.readByEmailWithPassword(email);

//   if (user == null) {
//     return { verified: false };
//   }

//   const verified = await argon2.verify(user.hashed_password, password);

//   return { verified, user };
// };

// module.exports = { verifyPassword };