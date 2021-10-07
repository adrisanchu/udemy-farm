# udemy-farm
Example of a store web app with NodeJS and MongoDB, using Express and Mongoose.

## Routes

`/`             [GET]  =>  Welcome page

### Farms:

`/farms`        [GET]  =>  List of all farms
- `/new`        [GET]  =>  Form to add a new farm
- `/{id}`       [GET]  =>  Detail info about a farm
  - `/edit`     [GET]  =>  Form to edit a farm
  - `/products` [GET]  =>  List of products from a farm


`/farms`        [POST]  =>  Save a new farm after completing a form
- `/{id}/products`   [POST]  =>  Save a new product into a farm

`/farms/{id}`   [DELETE]    =>  Delete a farm (it deletes the products in the farm as well)


### Products:

`/products`     [GET]  =>  List of all products
- `/new`        [GET]  =>  Form to add a new product
- `/{id}`       [GET]  =>  Detail info about a product
  - `/edit`     [GET]  =>  Form to edit a product
- `?category=`  [GET]  =>  Query String with options: ['fruit', 'vegetable', 'dairy']

`/products`     [POST]  =>  Save a new product after completing a form

`/products`     [DELETE]  =>  Delete a product
