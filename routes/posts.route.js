const express = require("express");
const { PostModel } = require("../models/posts.model");

const posts = express.Router()
posts.get("/", async(req,res)=>{
    const Id = req.body.userid
    try{
        // const posts = await PostModel.find({userid:Id})
        const posts = await PostModel.find()
        res.send(posts)
    }catch(err){
        res.send({"msg":"Error occured while getting Data" , "err":err.message})
    }
})
posts.post("/create", async(req,res)=>{
    const payload = req.body
    try{    
        const newPost = new PostModel(payload)
        await newPost.save()
        res.send(newPost)
    }catch(err){
        res.send({"msg":"Error occured while Posting POST" , "err":err.message})
    }
})
posts.get("/top", async(req,res)=>{
    const Id = req.body.userid
    try{
        const posts = await PostModel.find({$max:"no_if_comments"})
        res.send(posts)
    }catch(err){
        // res.send({"msg":"New User Registered"})                    res.send({"msg":"Error occured" , "err":err.message})
        res.send({"msg":"Error occured while getting Max comments Data" , "err":err.message})
    }
})
posts.patch("/update/:id", async(req,res)=>{
    const body = req.body
    const Id = req.params.id
    try{
        let posts = await PostModel.findByIdAndUpdate({_id:Id},body)
        res.send(posts)
    }catch(err){
        res.send({"msg":"Error occured while getting Max comments Data" , "err":err.message})
    }
})
posts.delete("/delete/:id", async(req,res)=>{
    const Id = req.params.id
    try{
        let posts = await PostModel.findByIdAndDelete({_id:Id})
        res.send({"msg":"1 Post Deleted"})
    }catch(err){
        res.send({"msg":"Error occured while getting Max comments Data" , "err":err.message})
    }
})


module.exports={
    posts
}