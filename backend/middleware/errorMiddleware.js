const notFound=(req,res,next)=>{
    const error=new Error(`not Found ${req.originalUrl} : seli`);
    res.status(404);
    next(error);
}


const errorHandler=(err,req,res,next)=>{
    console.log(`${err.message} @@ `.red.underline)
    const statusCode=res.statusCode===200?500:res.statusCode;
    res.status(statusCode).json({
        
        message:err.message
    })

}

export {notFound,errorHandler};