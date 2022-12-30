const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const mongoose=require('mongoose');

const app=express();

const authRoutes=require('./routes/user');
const postRoutes=require('./routes/post');

app.use(cors())

app.use(bodyParser.json({extended:false}))
// app.use(bodyParser.urlencoded({extended:false}))

app.use(authRoutes)
app.use(postRoutes)

var DB_Name = 'Knovator_Technologies'
const connectionString = `mongodb+srv://amar:amar4456@cluster0.qwphzua.mongodb.net/${DB_Name}?retryWrites=true&w=majority`

mongoose.connect(connectionString)
.then(result=>{
    app.listen(4000, ()=>{
        console.log("Server Started")
    })
})