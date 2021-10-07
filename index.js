const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Product = require('./models/product');
const Farm = require('./models/farm');

const categories = ['fruit', 'vegetable', 'dairy'];

mongoose
  .connect('mongodb://localhost:27017/udemy-farm', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MONGO CONNECTION OPEN!!!');
  })
  .catch((err) => {
    console.log('OH NO MONGO CONNECTION ERROR!!!!');
    console.log(err);
  });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.send('Welcome!');
});

// FARMS
app.get('/farms', async (req, res) => {
  const farms = await Farm.find({});
  res.render('farms/index', { farms });
});

app.get('/farms/new', (req, res) => {
  res.render('farms/new');
});

app.post('/farms', async (req, res) => {
  const farm = new Farm(req.body);
  await farm.save();
  // res.redirect('/farms');
  res.redirect(`/farms/${farm._id}`);
});

app.get('/farms/:id', async (req, res) => {
  const { id } = req.params;
  const farm = await Farm.findById(id);
  res.render('farms/show', { farm });
});

// PRODUCTS
app.get('/products', async (req, res) => {
  const products = await Product.find({});
  res.render('products/index', { products });
});

app.get('/products/new', (req, res) => {
  res.render('products/new', { categories });
});

app.post('/products', async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  // redirect to the show page
  res.redirect(`/products/${newProduct._id}`);
});

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render('products/show', { product });
});

app.get('/products/:id/edit', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render('products/edit', { product, categories });
});

app.put('/products/:id', async(req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
  console.log(req.body);
  res.redirect(`/products/${product._id}`);
});

app.delete('/products/:id', async(req, res) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id);
  res.redirect('/products');
});

app.listen(3000, () => {
  console.log('APP IS LISTENING ON PORT 3000!');
});
