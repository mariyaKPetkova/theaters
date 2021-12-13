const Product = require('../models/Products.js')

async function createProduct(productData){
    const product = new Product(productData)
    await product.save()
    return Product
}

async function getAllProducts(){
    const products = await Product.find({public:true}).lean()
    
    return products
}

async function getProductById(id){
    const product = await Product.findById(id).populate('author').populate('likes').lean()
    
    return product
}

async function editProduct(id,productData){
    const product = await Product.findById(id)
    
    product.name = productData.name
    product.description = productData.description
    product.imageUrl = productData.imageUrl
    product.public = productData.public

    return product.save()
}
async function deleteProduct(product){
    return Product.findOneAndDelete(product)
    
}
async function like(productId,userId){
    const product = await Product.findById(productId)
    product.likes.push(userId)
    
    return product.save()
}

async function sortByData(){
    const products = await Product.find({}).lean()
    const sortedProducts = products.sort((a,b)=> b.createdAt - a.createdAt)
    return sortedProducts
}
async function sortByLikes(){
    const products = await Product.find({}).lean()
    const sortedProducts = products.sort((a,b)=> b.likes.length - a.likes.length)
    return sortedProducts
}
module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    editProduct,
    deleteProduct,
    like,
    sortByData,
    sortByLikes
}