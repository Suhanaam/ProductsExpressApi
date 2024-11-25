const express=require('express')
const router=express.Router()
const products=require('../product')

//middleware
const myLogger=function(req,res,next)
{
    console.log('logged')
    console.log(req.body)
    next()
}

router.get('/',myLogger,(req,res)=>{
    try {

        res.status(200).json(products)
        
    } catch (error) {
        res.status(404).json({error:error.message})
        
    }
        
})

//get by id
router.get('/:id',(req,res)=>{
    try {

        const productId=parseInt(req.params.id)
        const product=products.find(prod=>prod.id===productId)
        //console.log(productId)
        if(!product)
        {
            res.status(404).json({error:error.message})
        }
            res.status(200).json(product)
        
        
    } catch (error) {
        res.status(404).json({error:error.message})
        
    }
        
})

//post request

router.post('/',myLogger, (req, res) => {
    try {
        const { name, price } = req.body;

        // Validate request body
        if (!name || typeof name !== 'string') {
            return res.status(400).json({ error: "Valid 'name' is required" });
        }
        if (!price || typeof price !== 'number' || price <= 0) {
            return res.status(400).json({ error: "Valid 'price' is required" });
        }

        // Create new product
        const newProduct = {
            id: products.length ? products[products.length - 1].id + 1 : 1,
            name,
            price,
        };

        products.push(newProduct);

        res.status(201).json({ message: "Product added", product: newProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//patch-to modify or update

router.patch('/:id',(req,res)=>{
    try {

        const productId=parseInt(req.params.id)
        const product=products.find(prod=>prod.id===productId)
        //console.log(productId)
        if(!product)
        {
            res.status(404).json({error:"product not found"})
        }

           const {name,price}=req.body
           if(name)product.name=name
           if(price)product.price=price
            res.status(200).json(product)
        
        
    } catch (error) {
        res.status(404).json({error:error.message})
        
    }
        
})

//delete

router.delete('/:id',(req,res)=>{
    try {

        const productId=parseInt(req.params.id)
        //match chyyunna productinte index kandu pidikkan
        const productIndex=products.findIndex(prod=>prod.id===productId)
        //console.log(productId)
        if(productIndex==-1)
        {
            res.status(404).json({error:"product not found"})
        }
        const deletedProduct=products.splice(productIndex,1) 

        
        res.status(200).json({message:"product deleted",product:deletedProduct})
        
        
    } catch (error) {
        res.status(404).json({error:error.message})
        
    }
        
})



module.exports=router