
const productsSchema = require("../6-models/products")

const getAllProductsTesting = async(req,res)=>{
    throw new Error("Testing express-async-error package")
}

const getProducts = async(req,res)=>{
    try {
        const queryObj = {}
        const {name,price,company,featured,rating,id,sort,fields,page,limit} = req.query

            if(id){
                queryObj._id = id
            }

            if(name){
                queryObj.name = {$regex : name, $options:"i"}
            }

            if(company){
                queryObj.company = company
            }

            if(featured){
                queryObj.featured = featured === "true" ? true : false
            }
            
            if(rating){
                queryObj.rating = rating
            }

            if(price){
                queryObj.price = price
            }

                console.log(queryObj);

        let result =  productsSchema.find(queryObj)

            if(sort) {
                const sortList = sort.split(",").join(" ")
                    result = result.sort(sortList)    
            }
            else{
                result = result.sort("createdAt")
            }

            if(fields) {
                const fieldList = fields.split(",").join(" ")
                    result = result(fieldList)
            }

        const pageNum = +page || 1
        const limitNum = +limit || 10
        const skip = (pageNum - 1) * limit

            result.skip(skip).limit(limitNum)    

        const products =  await result
            res.status(200).json({nmHits:products.length,products})
        
                console.log(Array.isArray(products), "Yes, it's an Array");

        } catch (error) {
        res.status(500).json({msg:error})
    }
}

const createProduct = async(req,res)=>{
    try {
        const product = await productsSchema.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const deleteAllProducts = async(req,res) =>{
    const products = await productsSchema.deleteMany()
    res.status(200).json(products)
}

const getProduct = async(req,res)=>{
    try {
        const product = await productsSchema.findOne({_id:req.params.id})
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const updateProduct = async(req,res)=>{
    try {
        // const product = await productsSchema.findOneAndUpdate(req.params.id)
        res.status(200).send(`Updating product`)
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const deleteProduct = async(req,res)=>{
    try {
        // const product = await productsSchema.findOneAndUpdate(req.params.id)
        res.status(200).send(`Deleting product`)
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

module.exports = {getAllProductsTesting, getProducts,createProduct,deleteAllProducts, getProduct,updateProduct,deleteProduct}