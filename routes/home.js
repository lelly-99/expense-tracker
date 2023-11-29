

export default function home(database_instance) {
  async function add_expenses(req, res) {
    try {
      res.render("index");
    } catch (err) {
      console.error("Error", err);
    }
  }

  return {
    add_expenses
  };
}



