function factory_function_expenses(){

    //error messages
    const errorMessage = (description, amount, category) => {
        if (!description && !amount && !category) {
          return "Please enter description, amount, and select category";
        } else if (description && !amount && !category) {
          return "Please enter amount and select category";
        } else if (!description && amount && !category) {
          return "Please enter description and select category";
        } else if (!description && !amount && category) {
          return "Please enter description and amount";
        } else if (!description) {
          return "Please enter description";
        } else if (!amount) {
          return "Please enter amount";
        } else if (!category) {
          return "Please select category";
        } 
      };
      
    return {
        errorMessage,
    }
}

export default factory_function_expenses;