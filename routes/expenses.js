export default function all(database_instance) {
  async function show_all(req, res) {
    try {
      res.render("expenses");
    } catch (err) {
      console.error("Error:", err);
    }
  }


  return {
    show_all
  };
}
