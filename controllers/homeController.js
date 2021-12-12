const router = require('express').Router()

router.get('/', async (req,res)=>{// guest
    const products = await req.storage.getAllProducts()
    res.render('home/homest',{products}) 
})

router.get('/catalog', async (req,res)=>{//user
    const products = await req.storage.getAllProducts()
    res.render('home/home',{products})
})



module.exports = router