import assert from "assert";
import pgPromise from "pg-promise";
import query from "../service/query.js";
import 'dotenv/config';

const pgp = pgPromise();

//SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  useSSL = true;
}

//database connection
const connectionString = process.env.DATABASE_URL 
const database = pgp(connectionString);
const data = query(database);

describe("Service test", function () {
  this.timeout(900000);
  beforeEach(async function () {
    // Clear tables before running test
    await data.deleteTables();
  });

  describe("Queries", function () {
    it("should be able to return all expenses", async function () {
      const expectedExpenses = [
        { "category_type": "Weekly" },
        { "category_type": "Monthly" },
        { "category_type": "Weekday" },
        { "category_type": "Weekend" },
        { "category_type": "Once-off" },
        { "category_type": "Daily" }
      ];
    
      const expenses = await data.getCategory();
      assert.deepStrictEqual(expenses, expectedExpenses);
    });
    
    it("should be able to add expenses", async function () {
      const result = await data.addExpenses('Daily', 100, 'lunch');
      assert.strictEqual(result, true);
    });
    

  });

  after(function () {
    pgp.end();
  });
});
