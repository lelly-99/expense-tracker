
const query = (db) => {
  //get all expenses category
  const getCategory = async () => {
    return await db.manyOrNone("SELECT category_type FROM category");
  };

  //add expenses
  const addExpenses = async (category_type, amount, description) => {
    //select category type
    const category = await db.oneOrNone('SELECT id FROM category WHERE category_type = $1', [category_type]);
  //if category type is selected
    if (category) {
      //the total amount for each category should be multiplied based of the category
      let total_amount = amount;
  
      if (category_type === 'Weekly') {
        //7 days
        total_amount *= 7;
      } else if (category_type === 'Monthly') {
        //30 days
        total_amount *= 30;
      } else if (category_type === 'Weekday') {
        total_amount *= 5;
      } else if (category_type === 'Weekend') {
        total_amount *= 2;
      } else if (category_type === 'Once-off') {
        total_amount *= 30;
      } else if (category_type === 'Daily') {
        total_amount *= 1;
      }
  //add the description, amount, category, along with total amount ito the database
      try {
        await db.none('INSERT INTO expense (description, amount, total_amount, category_id) VALUES ($1, $2, $3, $4)', [description, amount, total_amount, category.id]);
        return true; 
      } catch (error) {
        console.error('Error inserting expense:', error);
        return false; 
      }
    }
  };
  //get expenses for a specific category
  const expensesForCategory = async (category_id) => {
    return await db.manyOrNone('SELECT * FROM expense WHERE category_id = $1', [category_id]);
  };
///delete for a single category by id
  const deleteCategory = async (id) => {
    return await db.none('DELETE FROM category WHERE id = $1', [id]);
  };
//

const deleteTables = async () => {
  await db.none('DELETE FROM expense');
  await db.none('DELETE FROM category');
};

//join both tables and selct the total amount and category
//added description for display in description route
  const categoryTotals = async () => {
    return await db.manyOrNone('SELECT category.category_type, expense.total_amount, expense.description FROM category INNER JOIN expense ON category.id = expense.category_id;');
  };
  
  return {
    getCategory,
    addExpenses,
    expensesForCategory,
    deleteCategory,
    categoryTotals,
deleteTables
  };
};

export default query;


