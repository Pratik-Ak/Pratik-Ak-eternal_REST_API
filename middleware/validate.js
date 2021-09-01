const jwt=require('jsonwebtoken')
const User=require('../models/userModel')

const auth = async (req, res, next)=>{
    // validate token
    // try{
        // const token=req.header('Authorization').replace('Bearer ','')
        const token = req.headers.authorization
        if(!token){
            res.status(401).send({ error: 'Please authenticate.' })
        }
        else{
            jwt.verify(token.split(" ")[1], process.env.SECRET_KEY,(err,res)=>{
                if(err){
            res.status(401).send({ error: 'Please Filled Token.' })


                }
                req.user =res.data
                console.log("TOKEN DATA IS CHECK OK......")
                next()
            })
        }
    //     const decoded=jwt.verify(token,process.env.SECRET_KEY)
    //     const user=await User.findOne({_id : decoded._id, 'tokens.token':token})
    //     if(!user){
    //         throw new Error()
    //     }
    //     req.user=user
    //     req.token=token
    //     next()
    // }catch(err){
    //     res.status(401).send({ error: 'Please authenticate.' })
    // }    
}

module.exports= auth