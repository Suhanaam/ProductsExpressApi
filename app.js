const express=require('express')
const app = express();
//middle ware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


const path=require('path')
const ProductRouter=require('./routes/productRouts')
app.use('/products',ProductRouter)


//middle ware
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("hii jayce")
})


app.get('/home',(req,res)=>{

console.log(__dirname)
   res.sendFile(path.join(__dirname,"/index.html"))

})

app.listen(3000,()=>{
    console.log("server started")
})