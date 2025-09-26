export const createResponse=(res,code=200,message="Success",data)=>{
    res.status(code).json({
        message: message,
        data: data
    })
}

