const User=require('../models/user')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const saltRounds = 10;

// Sign up
exports.createUser=(req, res, next)=>{
    console.log(req.body)
    bcrypt.hash(req.body.password, saltRounds).then((hash)=>{
        console.log(hash)
        User.findOne({'email':req.body.email})
        .then(response=>{
            if (!response){
                const user=new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash,
                })
                user.save().then(result=>{
                    res.status(201).send(result)
                })
            }
            else{
                res.status(201).send([response, false])
            }
        })
    });
}

// Sign in
exports.findUser=(req, res, next)=>{
    const creds=JSON.parse(req.params.creds)
    User.findOne({'email': creds.email})
    .then(response=>{
        if (response==null || response==''){
            res.status(200).send({code:0})
        }else{
            bcrypt.compare(creds.password, response.password).then((result)=>{
                if(result){
                    res.status(200).send({code:1, token:generateToken(creds.email)})
                }else{
                    res.status(200).send({code:2})
                }
            });
        }
    }).catch(err=>console.log(err))
}

// Token Generate
function generateToken(email){
    return (jwt.sign({email:email}, 'Knovator_Technologies_Key'))
}
