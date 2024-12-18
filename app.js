const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const Order = require('./models/order');
const Admin = require('./models/admin');
const app = express();



// const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/juiceShop', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Database connection error: ", err);
  });


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false
}));

// Route for admin
app.get('/admin', (req, res) => {
    if (!req.session.admin) {
      return res.redirect('/login');
    }
    res.redirect('/viewOrders');  // Or render a specific admin page here
  });
  
// Admin Login Route
app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  const { aname, pass } = req.body;
  const admin = await Admin.findOne({ aname, pass });
  if (admin) {
    req.session.admin = admin._id;
    res.redirect('/viewOrders');
  } else {
    res.redirect('/login');
  }
});

// Logout Route
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});


// Assuming you're using Express.js
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    res.redirect('/login'); // Redirect to login or homepage after logout
  });
});


// Place Order Route (Modified to handle GET and POST)
    app.get('/', (req, res) => {
        res.render('index', {
          errors: [],
          studentname: '',
          studentid: '',
          mjuice: 0,
          bjuice: 0,
          ajuice: 0
        });
      });


      
  // Post Order
app.post('/order', async (req, res) => {
  const { studentname, studentid, mjuice, bjuice, ajuice } = req.body;

  // Validation
  const errors = [];

  if (studentname.length < 3 || !/^[A-Za-z\s]+$/.test(studentname)) {
      errors.push('Invalid Name');
  }
  if (!/^\d{3}-\d{4}$/.test(studentid)) {
      errors.push('Invalid Student ID');
  }

  // Quantity Validation
  if (!Number.isInteger(Number(mjuice)) || mjuice <= 0) { 
      errors.push('Invalid quantity for Mango Juice');
  }
  if (!Number.isInteger(Number(bjuice)) || bjuice <= 0) { 
      errors.push('Invalid quantity for Blueberry Juice');
  }
  if (!Number.isInteger(Number(ajuice)) || ajuice <= 0) { 
      errors.push('Invalid quantity for Apple Juice');
  }

  // Scripts for If there are validation errors, to send them back to the form
  if (errors.length > 0) {
      return res.render('index', {
          errors, 
          studentname, 
          studentid, 
          mjuice, 
          bjuice, 
          ajuice
      });
  }

  // If validation passes, calculate costs
  const subtotal = (mjuice * 6.99) + (bjuice * 5.99) + (ajuice * 3.99);
  const tax = subtotal * 0.13;
  const total = subtotal + tax;

  const newOrder = new Order({
      studentid,
      studentname,
      mjuice,
      bjuice,
      ajuice,
      subtotal,
      tax,
      total
  });

  try {
      // To Save the order using async/await
      await newOrder.save();

      // To Render the confirmation page after successful save
      res.render('orderConfirmation', { order: newOrder });
  } catch (err) {
      // If an error occurs during save, send an error message
      console.error('Error saving order:', err);
      res.status(500).send('Error saving order');
  }
});



  
  

// Admin View Orders Route
app.get('/viewOrders', async (req, res) => {
  if (!req.session.admin) {
    return res.redirect('/login');
  }

  const orders = await Order.find();
  res.render('viewOrders', { orders });
});

// Delete Order Route
app.post('/deleteOrder/:id', async (req, res) => {
  if (!req.session.admin) {
    return res.redirect('/login');
  }

  await Order.findByIdAndDelete(req.params.id);
  res.redirect('/viewOrders');
});

// Start Server
app.listen(3000, () => {
  console.log('Juice Shop is running on http://localhost:3000');
});
