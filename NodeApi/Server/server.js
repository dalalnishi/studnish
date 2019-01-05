const exp=require('express');
const _=require('lodash');
const bodyParser=require('body-parser');
var {mongoose}=require('./Db/mongoose');
const jwt=require('jsonwebtoken');

var {user}=require('../Models/user');
var {ObjectID}=require('mongodb');

var app=exp();
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//Registration
app.post('/user',(req,res)=>{
    var us= new user({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:req.body.password,
        course:req.body.course,
        address:req.body.address,
        gender:req.body.gender
    })
    
    us.save().then((doc)=>{
        res.send(doc);
    }),(e)=>{
        res.status(400).send(e);
    }
});

//Login
/*app.post('/login',(req,res)=>{
    var body=_.pick(req.body,['email','password']);

    var ulog=new userlog(body);

    ulog.save().then(()=>{
        return ulog.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth',token).send(ulog);
    }).catch((err)=>{
        res.status(400).send(err);
    })
});*/

app.post('/login',(req,res)=>{
    var email=req.body.email;
    var password=req.body.password;
    var token=jwt.sign(email,'8469');
    
    user.findOne({email:email,password:password}).then((u)=>{
        if(!u){
            return res.status(400).send({'error':'Invalid User!!!'});
        }    
            
        res.send({"token":token});
        
    }).catch((e)=>
        console.log(e));
});

//Display All
app.get('/getall',(req,res)=>{
    user.find().then((users)=>{
        res.send({users});
        },(e)=>{
            res.status(400).send(e);
    })
});

//Delete
app.delete('/deluser/:id',(req,res)=>{
    var id=req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(400).send();
    }
    user.findByIdAndRemove(id).then((u)=>{
        if(!u){
            return res.status(400).send();
        }
        res.send({u});
    }).catch(err=>{
        res.status(400).send();
    })
});

//Update
app.put('/upduser/:id',(req,res)=>{
    var id=req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(400).send();
    }

    user.findByIdAndUpdate(id,{$set},{new:true}).then((u)=>{
        if(!u){
            return res.status(400).send();
        }
        res.send({u});
    }).catch((e)=>{
        res.status(400).send();
    })
});

app.listen(3002);

module.exports.app=app;