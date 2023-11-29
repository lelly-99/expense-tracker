//import modules
import 'dotenv/config';
import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import flash from "connect-flash";
import session from "express-session";
import pgPromise from "pg-promise";
import query from "./service/query.js";
import home from "./routes/home.js";
import all from "./routes/expenses.js";
import factory_function_expenses from "./factory-function/expense.js";

//pg promise
const pgp = pgPromise();


//SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

// Database connection
const connectionString = process.env.DATABASE_URL;
const database = pgp(connectionString);


//database instamce
const database_instance = query(database);

//factory function instance
const factory_function_instance = factory_function_expenses()

//route instances
const home_route = home(database_instance, factory_function_instance);
const expense_route = all(database_instance, factory_function_instance);

const app = express();

//middleware configuration

//session
app.use(
    session({
        secret: "expenses tracker web app",
        resave: false,
        saveUninitialized: true,
    })
);
//flash for flash messages
app.use(flash());
//handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
//styling
app.use(express.static("public"));
//bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//enables flash messages to display on screen and keeps working asfterwards with  the next function
app.use(function (req, res, next) {
    res.locals.messages = req.flash();
    next();
});


//routes
app.get('/', home_route.add_expenses);
app.post('/', home_route.post_add_expenses);
app.get('/expenses', expense_route.show_all);
app.post('/expenses', expense_route.remove_expense);

  
// Start the server
const PORT = process.env.PORT || 3007;
app.listen(PORT, function () {
    console.log("App started at port:", PORT);
});
