const express= require("express");

const app= express();
app.use(express.json());

const users=[{
    name:"Piyush",
    kidneys:[{
        health:false
    },{health:true}]
}]

function countkid(user){
    let ans=0;
    for (let i=0;i<user.kidneys.length;i++){
        if (user.kidneys[i].health){
            ans++;
        }
    }
    return ans;
}

app.get("/",function(req,res){
    const pname= users[0].name;
    const NoOfKidney=users[0].kidneys.length;
    const healthy=countkid(users[0]);
    res.json({"Patient Name ":pname,
    "No of Kidneys ":NoOfKidney,
    "No of Healthy Kidneys: ":healthy});
});


app.post("/",function(req,res){
    if (typeof req.body.ishealthy === 'boolean'){
    const ishealthy=req.body.ishealthy;
    users[0].kidneys.push({
        health:ishealthy
    })
    res.json({
        msg:"Done!!"
    })
}
else{
    res.status(500).json({
        msg:"Fucker give correct Request"
    })
}
});


// app.put();

// app.delete();


app.listen(3000);