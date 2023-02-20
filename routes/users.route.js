const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { UserModel } = require("../models/users.model");

const users = express.Router()

users.post("/register", async(req,res)=>{
    const {name,email,gender,password,age,city} = req.body
    let alreadyExist = await UserModel.find({email})
    if(alreadyExist.length>0){
        res.send("User already exist, please login")
    }else{
        try{
            bcrypt.hash(password, 5, async(err, hash)=>{
                if(err){
                    res.send({"msg":"Error occured" , "err":err.message})
                }else{
                    let user = new UserModel({name, email, gender, password:hash, age, city})
                    await user.save()
                    res.send({"msg":"New User Registered"})
                }
            });
        }catch(err){
            console.log(`{msg:Error occured while Registering , err:${err.message}}`)
        }
    }
})
users.post("/login", async(req,res)=>{
    const {email,password} = req.body
    try{
        const user = await UserModel.find({email})
        let token = jwt.sign({userid:user[0]._id}, 'evaluation');
        if(user.length>0){
            bcrypt.compare(password, user[0].password, function(err, result) {
                if(result){
                    res.send({"msg":"Login Success","token":token})
                }else{
                    console.log(`{msg: , err:${err}}`)
                }
            });
        }else{
            res.send({"msg":"Wrong Credentials"})
        }
    }catch(err){
        console.log(`{msg:Error occured while Login , err:${err.message}}`)
    }
})

module.exports={
    users
}