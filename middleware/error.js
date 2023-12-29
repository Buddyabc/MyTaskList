

import React from 'react'

// made for not to allowed get req for post 

export const Errorhandler=(res,statusCode=500,message="Internal Server Error")=>{
  return (
    res.status(statusCode).json({
        status : false,
        message
     })
  )
}


// made for error handling 

export const asyncError=(passedFunc)=>(req,res)=>{
    return Promise.resolve(passedFunc(req,res)).catch((err)=>{
       return Errorhandler(res,500,err.message)
    })
}

