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
    it("should be able to return all categories", async function () {

      const categories = [
        { "category_type": "Weekly" },
        { "category_type": "Monthly" },
        { "category_type": "Weekday" },
        { "category_type": "Weekend" },
        { "category_type": "Once-off" },
        { "category_type": "Daily" } 
      ];
      
    
      const retrievedCategories = await data.getCategory();
      assert.deepEqual(retrievedCategories, categories);
    });
    it("should be able to add and", async function () {
      const category_type = "Weekly";
      const amount = 200;
      const description = "lunch";
    
      const isExpenseAdded = await data.addExpenses(category_type, amount, description);
//if expenses have been added, return tru
      assert.equal(isExpenseAdded, true
      );

    });
    it("should be able to display expenses for a category", async function () {
      const category_type = "Weekly";
      const amount = 200;
      const description = "lunch";
    
      // Add an expense for weekly
      await data.addExpenses(category_type, amount, description);
    
      const expenses = await data.expensesForCategory(1);
      const expectedExpense = {
        category_type: 'Weekly',
        total_amount: 800, 
        description: 'lunch'
      };
  
      assert.deepEqual(expenses[0], expectedExpense);
    });
    
    

  });

  after(function () {
    pgp.end();
  });
});
