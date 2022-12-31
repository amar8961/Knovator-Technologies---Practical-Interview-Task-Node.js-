const Post = require('../models/post')

// Post
exports.Post = (req, res, next) => {
    console.log(req.body)
    const post = new Post({
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        userId: req.user.id,
        user: {
            name: req.user.name,
            userId: req.user
          }
    })
    return post.save().then(result => {
        res.status(201).send(result)
    })
}

// Get
exports.Get=(req, res, next)=>{
    Post.find({'userId': req.user.id}).then(response=>{
        res.status(200).send(response)
        console.log(response)
    }).catch(err=>console.log(err))
}

// Delete
exports.Delete=(req, res, next)=>{
    Post.findByIdAndDelete(req.params.id).then(response=>{
        res.status(200).send({response:response})
    }).catch(err=>console.log(err))
}

// Get All Users Post
exports.allPost=(req, res, next)=>{
    Post.find().then(response=>{
        res.status(200).send(response)
        console.log(response)
    }).catch(err=>console.log(err))
}