export default function all(database_instance) {
  //route to get all the expenses
  async function show_all(req, res) {
    try {
      //render categories
      const cat_total = await database_instance.categoryTotals()
      console.log(cat_total)
      res.render("expenses", {cat_total});
    } catch (err) {
      console.error("Error", err);
    }
  }
  //route to remove expenses
  async function remove_expense(req, res) {
    try {
      const description = req.body.category;
      //delete category by id
      await database_instance.deleteCategory(description)
      res.redirect('/expenses');
    } catch (err) {
      console.error("Error:", err);
    }
  }
  return {
    show_all,
    remove_expense
  };
}
