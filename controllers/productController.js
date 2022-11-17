const Product = require('../models/productModel');

const { getPostData } = require('../utils');

// @desc get all products
// @route GET /api/products
async function getProducts(req, res) {
    try {
        const products = await Product.findAll();

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(products));
    } catch (error) {
        console.log(error);
    }
}

// @desc get a specific product with a signified id
// @route GET /api/products/:id
async function getProduct(req, res, id) {
    try {
        const product = await Product.findById(id);

        if (product) {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(product));
        }
        else {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ message: "Product Not Found"}));
        }
    } catch (error) {
        console.log(error);
    }
}

// @desc create a new product
// @route POST /api/products
async function createProduct(req, res) {
    try {
        // get new body and svae in body variable
        const body = await getPostData(req);
        const {title, description, price} = JSON.parse(body);

        const product = {
            title,
            description,
            price
        };

        const newProduct = await Product.create(product);

        res.writeHead(201, {'Content-Type': 'application/json'});
        return res.end(JSON.stringify(newProduct));
        
    } catch (error) {
        console.log(error);
    }
}

// @desc update a product
// @route PUT /api/products/:id
async function updateProduct(req, res, id) {
    try {
        // find product
        const product = await Product.findById(id);

        if (product) {
            // get new body and svae in body variable
            const body = await getPostData(req);
            const {title, description, price} = JSON.parse(body);

            const productData = {
                title: title || product.title,
                description: description || product.description,
                price: price || product.price
            };

            const updProduct = await Product.update(id, productData);

            res.writeHead(200, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify(updProduct));
        }
        else {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ message: "Product Does Not Exist"}));
        }

    } catch (error) {
        console.log(error);
    }
}

// @desc delete a product
// @route DELETE /api/products/:id
async function deleteProduct(req, res, id) {
    try {
        const product = await Product.findById(id);

        if (product) {
            await Product.remove(id);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ message: `Product ${id} has been deleted`}));
        }
        else {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ message: "Product Does Not Exist"}));
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}