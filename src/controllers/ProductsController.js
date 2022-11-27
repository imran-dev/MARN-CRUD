const ProductsModel = require('../models/ProductsModel');

// Create Product
exports.CreateProduct = (req, res) => {
    let reqBody = req.body;
    ProductsModel.create(reqBody, (error, result) => {
        if (error) {
            res.status(400).json({status: 'fail', data: error});
        } else {
            res.status(200).json({status: 'success', data: result});
        }
    });
}

// Read Product
exports.ReadProduct = (req, res) => {
    let Query      = {};
    let Projection = 'Name Code Img UnitPrice Qty TotalPrice';
    ProductsModel.find(Query, Projection, (error, result) => {
        if (error) {
            res.status(400).json({status: 'fail', data: error});
        } else {
            res.status(200).json({status: 'success', data: result});
        }
    });
}

// Update Product
exports.UpdateProduct = (req, res) => {
    let id      = req.params.id;
    let Query   = {_id: id};
    let reqBody = req.body;
    ProductsModel.updateOne(Query, reqBody, (error, result) => {
        if (error) {
            res.status(400).json({status: 'fail', data: error});
        } else {
            res.status(200).json({status: 'success', data: result});
        }
    });
}

// Delete Product
exports.DeleteProduct = (req, res) => {
    let id    = req.params.id;
    let Query = {_id: id};
    ProductsModel.remove(Query, (error, result) => {
        if (error) {
            res.status(400).json({status: 'fail', data: error});
        } else {
            res.status(200).json({status: 'success', data: result});
        }
    });
}