import Pproduct from '../models/productModel.js'
import asyncHandler from  'express-async-handler' 


//@desc fetch all products
//@route GET '/api/products
//@access public
const getProducts=asyncHandler( async(req,res)=>{
    
    const pageSize=3
    const page=Number(req.query.pageNumber) || 1

    const keyword=req.query.keyword ?{
        name:{
            $regex: req.query.keyword,
            $options:'i'
        } 
    }: {}
    
    const count=await Pproduct.countDocuments({...keyword})
    const Product =await Pproduct.find({...keyword}).limit(pageSize).skip(pageSize*(page-1))
    // console.log(Product," *********");
     res.json({Product ,page,pages: Math.ceil(count/pageSize)});

}
)


//@desc fetch a product
//@route GET '/api/products/:id
//@access public
const getProductById=asyncHandler (async (req,res)=>{
    const product=await Pproduct.findById(req.params.id);
    if(product)
    {res.json(product);}
    else{
        res.status(404)
        throw new Error('product not found')
    }
})

//@desc delete a product
//@route DELETE '/api/products/:id
//@access private/admin
const deleteProduct=asyncHandler (async (req,res)=>{
    const product=await Pproduct.findById(req.params.id);
    if(product)
    {
        await product.remove();
        res.json({message:'delete successfully'})
    }
    else{
        res.status(404)
        throw new Error('Cant be Delete')
    }
})

const createProduct=asyncHandler(async(req,res)=>{

    const product=new Pproduct({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand:'sample',
        category:'sample',
        countInStock:0,
        numReviews:0,
        description:'sample'
    })
    const createdProduct=await product.save();
    res.status(201).json(createdProduct);
})

const updateProduct=asyncHandler(async(req,res)=>{

    const {name,price,brand,category,countInStock,numReviews,description,image}=req.body;

    const product=await Pproduct.findById(req.params.id)

    if(product){
        product.name=name
        product.image=image
        product.description=description
        product.price=price
        product.brand=brand
        product.category=category
        product.countInStock=countInStock
        const updatedProduct=await product.save();
        res.status(201).json(updatedProduct);


    }
    else{
        res.status(404)
        throw new Error('not found')
    }

    
  
})



//api/products/:id/reviews
const updateProductReviews=asyncHandler(async(req,res)=>{

    const {rating,comment}=req.body;

    const product=await Pproduct.findById(req.params.id)

    if(product){
        
        const alreadyExist=product.reviews.find(r=>r.user.toString()===req.user._id.toString())
        if(alreadyExist){
            res.status(400);
            throw new Error('Already Reviewed')
        }
        else{
            const review={
                name:req.user.name,
                rating:Number(rating),
                comment,
                user:req.user._id
            }
            product.reviews.push(review)
            product.numReviews=product.reviews.length
            product.rating=product.reviews.reduce((acc,item)=>item.rating+acc,0)/product.reviews.length
            await product.save();
            res.status(201).json({message:'reviewed'})
        }


    }
    else{
        res.status(404)
        throw new Error('not found')
    }

    
  
})


export {getProductById,getProducts,deleteProduct,updateProduct,createProduct,updateProductReviews};