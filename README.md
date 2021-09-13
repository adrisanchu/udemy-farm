# udemy-farm
Example of a store web app with NodeJS and MongoDB, using Express and Mongoose.

## Routes

`/`         [GET]  => Welcome page

`/products` [GET]  =>  List of all products
- `/new`    [GET]  =>  Form to add a new product
- `/{id}`   [GET]  =>  Detail info about a product
- `?category=` => options: ['fruit', 'vegetable', 'dairy']

`/products` [POST]  =>  Save a new product after completing a form
