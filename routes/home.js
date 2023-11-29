export default function home(database_instance) {
  //get route to display app informartion
  async function add_expenses(req, res) {
    try {
      //get the categories
      const display_categories = await database_instance.getCategory()
      console.log(display_categories)
      //render categories
      const cat_total = await database_instance.categoryTotals()
      res.render("index", { display_categories: display_categories, cat_total: cat_total });
    } catch (err) {
      console.error("Error", err);
    }
  }
  //post route to add expenses
  async function post_add_expenses(req, res) {
    try {
      //require from the body of hmtl
      const { description, amount, category } = req.body;
  
      const insertSuccess = await database_instance.addExpenses(category, Number(amount), description);
      console.log(insertSuccess)
      if (insertSuccess) {
        req.flash('success', 'You have successfully added an expense');
      } else {
        req.flash('error', 'Failed to add expense.');
      }
      res.redirect('/');
    } catch (err) {
      console.error('Error', err);
      req.flash('error', 'Failed to add expense');
      res.redirect('/');
    }
  }

  return {
    add_expenses,
    post_add_expenses
  };
}



