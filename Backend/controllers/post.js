const Post = require('../models/post')

// Post
exports.Post = (req, res, next) => {
    console.log(req.body)
    const post = new Post({
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
    })
    post.save().then(result => {
        res.status(201).send(result)
    })
}