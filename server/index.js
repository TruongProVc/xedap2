const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;
const path = require("path");

//controller
const { getAllBrands, addBrand, deleteBrand,editBrand } = require('./src/app/controller/BrandController');
const { getAllProducts, addProduct, deleteProduct, getProductDetails,searchProducts,getProductSpecifications } = require('./src/app/controller/ProductController');
const { getAllAccounts } = require('./src/app/controller/AccountController');

const bodyParser = require('body-parser');

//cấu hình để có thể sử dụng ảnh khác module
app.use('/uploads', express.static(path.join(__dirname, 'src', 'app', 'uploads')));


// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


//router
app.get('/productdetails/:id', getProductDetails);
app.get('/search', searchProducts);
app.get('/products', getAllProducts);
app.post('/addproduct', addProduct);
app.delete('/products/:id', deleteProduct);
app.get('/accountmanagement',getAllAccounts)
app.get('/brands', getAllBrands);
app.post('/brands', addBrand);
app.delete('/brands/:id', deleteBrand); 
app.put('/editbrand/:id', editBrand); 
app.get('/products/:productId/specifications',getProductSpecifications)
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});