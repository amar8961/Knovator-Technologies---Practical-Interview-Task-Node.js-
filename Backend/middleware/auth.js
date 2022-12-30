var jwt = require('jsonwebtoken');
const User=require('../models/user')

exports.authenticate=(req, res, next)=>{
    try{
        const token=req.header('Authorization')
        const decoded=jwt.verify(token, 'Knovator_Technologies_Key')
        User.findOne({'email':decoded.email}).then(response=>{
            req.user=response;
            next()
        }).catch(err=>console.log(err))
    }
    catch(err){
        console.log(err);
        return res.status(401)
    }
}