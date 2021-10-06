const express= require('express');
const {sequelize,user}= require('./models')
const bcrypt= require('bcryptjs');
const bodyParser= require('body-parser');
const app = express();

const jwt = require('jsonwebtoken');
const e = require('express');
app.use(express.json())


app.post('/user/register',async(req,res)=>{
    const username= req.body.username;
    const password = req.body.password;

    if(!username|| typeof username !== 'string'){
        return res.status(401).json('username is invalid')
    }
    if(!password|| typeof password!== 'string'){
        return res.status(401).json('password is invalid')
    }
    if(password.length<5){
        return res.status(401).json('password should contains atleast 5 characters')
    }
    const hashPassword = await bcrypt.hash(password, 10);
    try{
        const user1= await user.findOne({
            where:{username}
        })
        if(user1){return res.status(403).json("Username is already existed")}
        else{
            const user2 = await user.create({username,password:hashPassword})
            console.log("username: "+user2.username)
            console.log("hashedPassword: "+user2.password)
            console.log("User is created")
            return res.status(201).json(user2.username)
        }

    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }


    

})

app.post('/user/login',async(req,res)=>{
    const username= req.body.username;
    const password = req.body.password;

    const user1= await user.findOne({
        where:{username}
    })
    if(!user1){
        return res.status(401).json('Login credentials is invalid')
    }
    else{
        if(bcrypt.compare(password,user1.password)){
            const auth_token= jwt.sign({
                id:user.id,
                username:user.username
            },'access',{expiresIn:'20s'})

            const ref_token= jwt.sign({
                id:user.id,
                username:user.username
            },'refresh',{expiresIn:'24h'})
            try{
                const user2= await user.update({auth_token,ref_token},
                    {where:{username}})

                    console.log(auth_token);
                    console.log(ref_token);
                    
                
                return res.status(201).json('Login accessed')

            }catch(err){
                console.log(err);
                return res.status(500).json(err)
            }
        }
    }
})



module.exports= app;