const express=require("express")
const cors=require("cors")
const { connection } = require("./db")
const { users } = require("./routes/users.route")
const { posts } = require("./routes/posts.route")
const { authFun } = require("./middlewares/auth.midleware")
require("dotenv").config()

const app=express()
app.use(cors())
app.use(express.json())
app.use("/users",users)
app.use(authFun)
app.use("/posts",posts)

app.listen(process.env.port, async()=>{
    try{
        await connection
        console.log("Connected to DB")
    }catch(err){
        console.log('err:', err)
    }
    console.log(`Server is running at PORT ${process.env.port}`)
})