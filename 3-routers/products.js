
const express = require("express")
const router = express.Router()
const { getAllProductsTesting, getProducts,createProduct,deleteAllProducts,getProduct,updateProduct,deleteProduct } = require("../4-controllers/products")

    router.route("/testing").get(getAllProductsTesting)
    router.route("/").get(getProducts).post(createProduct).delete(deleteAllProducts)
    router.route("/:id").get(getProduct).patch(updateProduct).delete(deleteProduct)

module.exports = router