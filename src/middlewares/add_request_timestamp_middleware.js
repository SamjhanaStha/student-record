// attached time stamp to the request for those routes that used this middleware
export let addRequestTimeStampMiddleware = (req, res, next)=>{
    req.requestTimeStamp = new Date().toISOString()
    console.log("request time stamp", req.requestTimeStamp )
    next()
}

// middleware for the response: error formatting
export let customErrorMiddleware = (err, req, res, next)=>{
    res.status(500).json({
        message:"some thing went wrong",
        error: err.message
    })
    // next()
}

// custom success response with middleware
export let customSuccessMiddleware = (dataObj, req, res, next)=>{
    res.status(200).json({
        message: dataObj.msg,
        data: dataObj.data,
        trace: dataObj.trace,
    })
}