const mongoose = require('mongoose');
const jwt=require('jsonwebtoken');

var UserLoginSchema =new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tokens:[{
        access:{
            type:String,
            required:true
        },
        token:{
            type:String,
            required:true
        }
    }
    ]
});

/*UserLoginSchema.methods.generateAuthToken=function(){
    var u=this;
    console.log('without token',u);

    var access='x-auth';
    var token=jwt.sign({_id:u._id.toHexString(),access},'mln').toString();
    u.tokens.push({access,token});

    console.log("with token",u);
   
    return u.save().then(()=>{
            return token;
    });    
};*/

UserLoginSchema.statics.findByCredentials=function(email,password){
    var suser=this;

    return suser.findOne({email}).then((usermap)=>{
        if(!usermap){
            return Promise.reject();
        }
        else{
            var u=this;
            var access='x-auth';
            var token=jwt.sign({_id:u._id.toHexString(),access},'mln').toString();
            u.tokens.push({access,token});

            return u.save().then(()=>{
                return token;
            });    
        }
    })
};

var userlog=mongoose.model('userlog',UserLoginSchema);
module.exports={userlog};