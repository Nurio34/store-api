
const start = async() => {
    try {
        require("dotenv").config()
        await require("./5-db/connect")(process.env.MONGO_URI)
        await require("./6-models/products").deleteMany()
        await require("./6-models/products").create(require("./products.json"))
        process.exit(0) 
    } catch (error) {
        console.log(error);
        process.exit(1) 
    }
}

start()