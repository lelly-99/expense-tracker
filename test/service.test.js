import assert from "assert";
import pgPromise from "pg-promise";
import query from "../service/query.js";

const pgp = pgPromise();

//SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  useSSL = true;
}

//database connection
const connectionString =
  process.env.DATABASE_URL
const database = pgp(connectionString);
const data = query(database);

describe("Service test", function () {
  this.timeout(900000);
  beforeEach(async function () {
    // Clear tables before running test
    await data.deleteSchedule();
  });

  describe("Queries", function () {
    
  });

  after(function () {
    pgp.end();
  });
});
