const express = require('express');
const mongoose = require('mongoose');
const Admin = require('./models/admin');  // Admin model
const Order = require('./models/order');  // Order model

const app = express();

const admin = await Admin.findOne({ aname, pass });
console.log(admin); // Check what is returned from the database


// Set up session
const session = require('express-session');
app.use(session({
  secret: 'secretKey',  // Secret key to sign the session ID cookie
  resave: false,
  saveUninitialized: true
}));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));  // To parse form data

// Admin Login Route
app.get('/admin-login', (req, res) => {
  res.render('login');  // Login page
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  Admin.findOne({ aname: username }, (err, admin) => {
    if (err || !admin) {
      return res.status(400).send('Invalid username or password');
    }

  

      // Store admin session
      req.session.admin = admin._id;
      res.redirect('/view-orders');  // Redirect to orders page
    });
  });
// });

// View Orders Route (Only for logged-in admins)
app.get('/view-orders', (req, res) => {
  if (!req.session.admin) {
    return res.redirect('/admin-login');  // Redirect if not logged in
  }

  Order.find({}, (err, orders) => {
    if (err) {
      return res.status(500).send('Error fetching orders');
    }
    res.render('admin', { orders: orders });
  });
});

// Delete Order Route
app.get('/delete-order/:id', (req, res) => {
  const orderId = req.params.id;
  Order.findByIdAndDelete(orderId, (err) => {
    if (err) {
      return res.status(500).send('Error deleting order');
    }
    res.redirect('/view-orders');  // Redirect back to orders page after deleting
  });
});

//Logout Route
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send('Error logging out');
      }
      res.redirect('/admin-login');  // Redirect to login page after logout
    });
  });
  

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


