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

app.get('/farms/:id/products/new', async (req, res) => {
  const { id } = req.params; // the id of the farm!!
  const farm = await Farm.findById(id);
  // pass the farm as an object
  res.render('products/new', { categories, farm });
});

app.get('/farms/new', (req, res) => {
  res.render('farms/new');
});

app.post('/farms', async (req, res) => {
  const farm = new Farm(req.body);
  await farm.save();
  res.redirect(`/farms/${farm._id}`);
});

app.post('/farms/:id/products', async (req, res) => {
  const { id } = req.params;
  // find the farm
  const farm = await Farm.findById(id);
  const { name, price, category } = req.body;
  const product = new Product({ name, price, category });
  // add the new product into the farms list (multiple products per farm)
  farm.products.push(product);
  // add the farm into the new product as well (one product in one farm only)
  product.farm = farm;
  await farm.save();
  await product.save();
  res.redirect(`/farms/${id}`);
});

app.get('/farms/:id', async (req, res) => {
  const { id } = req.params;
  const farm = await Farm.findById(id).populate('products');
  res.render('farms/show', { farm });
});

app.delete('/farms/:id', async (req, res) => {
  const deletedFarm = await Farm.findByIdAndDelete(req.params.id);
  // the products associated to the farm are deleted with a middleware
  res.redirect('/farms');
});

// PRODUCTS
app.get('/products', async (req, res) => {
  const { category } = req.query;
  let products = {};
  // check if category is a valid one
  if (categories.includes(category)) {
    // filter products by category
    products = await Product.find({ category: category });
  } else {
    // return all products
    products = await Product.find();
  }
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
  const product = await Product.findById(id).populate('farm', 'name');
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
