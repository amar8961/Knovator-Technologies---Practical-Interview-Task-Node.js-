const mongoose=require('mongoose')

const Schema=mongoose.Schema

const postSchema=new Schema({
  title:{
    type: String,
    required: true
  },
  body:{
    type: String,
    required: true
  },
  status:{
    type: String,
    required: true
  }
})

module.exports=mongoose.model('Post', postSchema);