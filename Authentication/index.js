const express=require("express");
const jwt= require("jsonwebtoken");
const jwtpass="1234";

const app= express();
app.use(express.json());

const ALL_USER=[{
    name:"piyush",
    grade:"A+",
    username:"piyush@gmail.com"
    ,password:"12321"
},
{
    name:"shubhum",
    grade:"B",
    username:"shubhum@gmail.com"
    ,password:"122331"
}];



function UserExist(username,password){
    let flag=0;
    for (let i=0;i<ALL_USER.length;i++){
        if (ALL_USER[i].username===username&&password===ALL_USER[i].password){
            flag=1;
            return true;
        }
    }
    if (flag==0){
        return false;
    }

}


app.post("/signin",function (req,res){
    const username=req.body.username;
    const password= req.body.password;
    if (!UserExist(username,password)){
        return res.status(403).json({
            msg:"User already exist!!"
        });
    }
    const token=jwt.sign({username:username},jwtpass);
    return res.json({
        token
    })
});

app.get("/verify",function(req,res){
    const token=req.headers.authorization;
    try{
        const decode=jwt.verify(token,jwtpass);
        const username=decode.username;
        res.json({user:ALL_USER});

    }
    catch(err){
        res.status(403).json({
            msg:"Authoriztion error"
        })
    }
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });