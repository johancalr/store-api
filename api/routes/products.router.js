const express = require('express');
const { ProductsService } = require('../services/product.service');
const { validatorHandler } = require('../middlewares/validator.handler');
const { createProductSchema, getProductSchema, updateProductSchema } = require('../schemas/product.schema');

const productsRouter = express.Router();
const productsService = new ProductsService();

// Products
productsRouter.get('/', async (req, res) => {
  const products = await productsService.find();
  res.json(products);
});
productsRouter.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await productsService.findOne(id);
      if (!product) {
        res.status(404).json({ message: 'not found' })
      } else {
        res.status(200).json(product);
      }
    } catch (error) {
      next(error);
    }
  }
);
productsRouter.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      const newProduct = await productsService.create(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error)
    }
  }
);
productsRouter.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      const { id } = req.params;
      const product = await productsService.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);
productsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await productsService.delete(id);
  res.json(response);
});

module.exports = { productsRouter };
