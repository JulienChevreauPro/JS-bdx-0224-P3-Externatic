// Import required dependencies
const { database, tables } = require("../config");

// Import repository classes
const AbstractRepository = require("../../database/models/AbstractRepository");
const UserRepository = require("../../database/models/UserRepository");

// Test suite for UserRepository
describe("UserRepository", () => {
  // Test: Check if UserRepository extends AbstractRepository
  test("UserRepository extends AbstractRepository", async () => {
    // Assertions
    expect(Object.getPrototypeOf(UserRepository)).toBe(AbstractRepository);
  });

  // Test: Check if tables.user is an instance of UserRepository
  test("tables.user = new UserRepository", async () => {
    // Assertions
    expect(tables.user instanceof UserRepository).toBe(true);
  });

  // Test: Check if create method inserts data into the 'user' table
  test("create => insert into", async () => {
    // Mock result of the database query
    const result = [{ insertId: 1 }];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [result]);

    // Fake user data
    const fakeUser = {
      firstname: "Clark",
      lastname: "Kent",
      email: "superman@gmail.com",
      hashedPassword:
        "$argon2id$v=19$m=19456,t=2,p=1$D7kQgsBfM9ruCj+NgFVlKw$B9qLuJLLHliJNOEGIIZyl8RR74pd6wrmvH2M/bCV68c",
    };

    // Call the create method of the user repository
    const returned = await tables.user.create(fakeUser);

    // Assertions
    expect(database.query).toHaveBeenCalledWith(
      "INSERT INTO user (firstname, lastname, email, hashed_password) VALUES(?, ?, ?, ?)",
      [
        fakeUser.firstname,
        fakeUser.lastname,
        fakeUser.email,
        fakeUser.hashedPassword,
      ]
    );
    expect(returned).toBe(result.insertId);
  });

  // Test: Check if readAll method selects all data from the 'user' table
  test("readAll => select", async () => {
    // Mock empty rows returned from the database
    const rows = [];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Call the readAll method of the user repository
    const returned = await tables.user.readAll();

    // Assertions
    expect(database.query).toHaveBeenCalledWith(
      `SELECT id, firstname, lastname, email FROM user`
    );
    expect(returned).toStrictEqual(rows);
  });

  // Test: Check if read method selects data from the 'user' table based on id
  test("read => select with id", async () => {
    // Mock rows returned from the database
    const rows = [{}];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Call the read method of the user repository
    const returned = await tables.user.read(0);

    // Assertions
    expect(database.query).toHaveBeenCalledWith(
      `
      SELECT 
      user.id,
      user.firstname,
      user.lastname,
      user.email,
      user.phone,
      candidate.picture,
      region.name,
      (
        SELECT JSON_ARRAYAGG(JSON_OBJECT('name', techno.name))
        FROM techno_candidate
        LEFT JOIN techno ON techno_candidate.techno_id = techno.id
        WHERE techno_candidate.candidate_id = candidate.id
      ) AS technos
  FROM user
  LEFT JOIN candidate ON user.id = candidate.user_id
  LEFT JOIN region ON region.candidate_id = candidate.id
  WHERE user.id = ?
      `,
      [0]
    );
    expect(returned).toStrictEqual(rows[0]);
  });
});
