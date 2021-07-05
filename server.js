const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

global.__basedir = __dirname;

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const { user } = require("./app/models");
const Role = db.role;
const User = db.user;
const Product = db.products;
const Event = db.events;
const Cart = db.cart;
const Order = db.order;
const OrderItem = db.orderItem;

// const initRoutes = require("./src/routes");
// initRoutes(app);

//force: true will drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and Resync database.");
    initial();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Fortry web application." });
});

// routes
require("./app/routes/event.routes")(app);
require("./app/routes/product.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/cart.routes")(app);
require("./app/routes/order.routes")(app);
require("./app/routes/orderItem.routes")(app);
require('./app/routes/file.routes')(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

async function initial() {
  let userrole = await Role.create({
    id: 1,
    name: "user"
  });

  let moderatorrole = await Role.create({
    id: 2,
    name: "moderator"
  });

  let adminrole = await Role.create({
    id: 3,
    name: "admin"
  });

  await Product.create({
    id: 1,
    title: "dress01",
    productname: "green long dress",
    category: "women",
    description: "long dress in green color",
    size: "s,m,l",
    price: "87.00",
    quantity: "5"
  });

  await Product.create({
    id: 2,
    title: "dress02",
    productname: "light green shirts",
    category: "women",
    description: "light green tops with white short pants",
    size: "s,m",
    price: "49.90",
    quantity: "12"
  });

  await Product.create({
    id: 3,
    title: "dress03",
    productname: "orange short dress",
    category: "women",
    description: "dress in orange with white ribbon",
    size: "m,l",
    price: "32.25",
    quantity: "26"
  });

  await Event.create({
    id: 1,
    title: "banner01",
    eventname: "Father's Day Promotion",
    description: "Happy Father's Day on 20 June 2021",
    startdate: "8 June 2021 00:00",
    enddate: "28 June 2021 23:59"
  });

  await Event.create({
    id: 2,
    title: "banner02",
    eventname: "7.7 Promotion",
    description: "Promotion on 7 July 2021 only",
    startdate: "7 July 2021 00:00",
    enddate: "7 July 2021 23:59"
  });

  await Event.create({
    id: 3,
    title: "banner03",
    eventname: "Black Friday",
    description: "Black Friday celebration - huge discount on every friday",
    startdate: "25 June 2021 00:00",
    enddate: "25 June 2021 23:59"
  });

  let a = await User.create({
    id: 1,
    username: "admin01",
    password: "$2a$08$8EHimsBGvbewPT2v13giCuaLBNE08KcPyKKBL95IyEOA6jvgkLxim",
    email: "admin01@gmail.com",
    contact: "1234567890",
    gender: "Male",
    dob: "2021-06-21",
    address: "Parkhill Residence, Bukit Jalil",
    state: "Selangor",
    poscode: "57000"
  });
  await a.setRoles(adminrole);

  let u = await User.create({
    id: 2,
    username: "customer01",
    password: "$2a$08$3P895P4Yuo8HJ21QeFlNSOP0DjW5G6Xw5Lc0QVUnQaiXEBfljl1d6",
    email: "customer01@gmail.com",
    contact: "0123456789",
    gender: "Female",
    dob: "2021-03-07",
    address: "kuala lumpur",
    state: "Selangor",
    poscode: "57000"
  });
  await u.setRoles(userrole);
}



  