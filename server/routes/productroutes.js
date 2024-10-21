const express = require('express');
const router = express.Router();
const { addProduct, editProduct, deleteProduct, viewProduct, viewProductById,handleDisableProduct } = require('../controller/Productcontroller');

router.post('/add', addProduct);

router.put('/edit/:id', editProduct);
router.put('/editProduct/:id', editProduct);

router.delete('/delete/:id', deleteProduct);


router.get('/view-product', viewProduct);

router.get('/view-products/:id', viewProductById);
router.put('/disableProduct/:id', handleDisableProduct);

module.exports = router;
