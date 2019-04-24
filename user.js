const mongoose=require('mongoose')
var Schema=mongoose.Schema;

var userSchema= new Schema({
    email:{
        type:String
    },
    password:{
        type:String
    },
})
var user = mongoose.model('user', userSchema);

module.exports={
    user
}