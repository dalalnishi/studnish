const mongoose=require('mongoose');
const validator=require('validator');
const jwt=require('jsonwebtoken');

var UserSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        minlength:1
    },
    lastname:{
        type:String,
        required:true,
        minlength:1
    },
    email:{
       type:String,
       required: true,
       minlength: 1,
       trim: true,
       unique:true,
       validate:{
           /*validator:(value)=>{
               return validator.isEmail(value);
           },*/
           validator: validator.isEmail,
           message:'Not a valid email!'
       }
    },
    password:{
       type:String,
       required:true,
       minlength:6
    },
    course:{
       type:String,
       required:true
    },
    address:{
       type:String,
       required:true,
    },
    gender:{
        type:String,
        required:true
    }
})

UserSchema.methods.generateAuthToken=function(){
    var u=this;
    console.log('without token',u);

    var access='x-auth';
    var token=jwt.sign({_id:u._id.toHexString(),access},'mln').toString();
    u.tokens.push({access,token});

    console.log("with token",u);
   
    return u.save().then(()=>{
            return token;
    });    
};

// UserSchema.statics.findByCredentials=function(email,password){
//     var user=this;

//     return user.findOne({email}).then((usermap)=>{
        
//         if(!usermap){
//             return console.log('user not found!!');
//         }else if(usermap){
//             return console.log('user found!!');
//         }
//             //var access='x-auth';
//             //var token=jwt.sign({_id:user._id.toHexString(),access},'mln').toString();
//             //user.tokens.push({access,token});      
               
//     }).catch((e)=>{
//         console.log(e);
//     })
// };

var user=mongoose.model('user',UserSchema);
module.exports={user};