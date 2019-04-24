const Express=require("express")
const bodyparser=require("body-parser")
const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require("jsonwebtoken")
const {user}=require("./user")
app=Express()
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
userAuth=(req,res,next)=>{
    var token=req.headers['x-auth']
    jwt.verify(token,"mysalt",(err,decoded)=>{
        if(err){
            res.status(400).send({
                Message:"Invalid Token",
                err
            })
        }
        else{
            req.decoded=decoded
            next()
        }
    })
}
mongoose.connect("mongodb://localhost:27017/auth",{useNewUrlParser:true},(err,db)=>{
    if(!err){
        console.log("EHEH")
    }
})
app.get("/",(res,req)=>{
    res.send("hello world")
})

app.post("/login",(req,res)=>{
    var hashedPass= bcrypt.hashSync(req.body.password)
    var newUser= new user({
        email:req.body.email,
        password:hashedPass
    })
    newUser.save()
    .then((user)=>{
        var token=jwt.sign({id:user._id},"mysalt")
        res.send({
            user,
            token   
        })
    })
    .catch((err)=>{
        console.log(err)
        res.status(200).send(err)
    })
})


app.get("/me",userAuth,(req,res)=>{

    
        user.findById(req.decoded.id,(err,data)=>{
            if(err){
                res.send(
                    {
                        Message:"USer not found",
                        err
                    }
                )
            }
            res.send(data)
        })
    
})
app.listen(3000)