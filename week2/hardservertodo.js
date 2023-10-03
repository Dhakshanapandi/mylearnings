const express = require("express");
const app = express();
const dotenv = require("dotenv")
const fs = require("fs");
const { stringify } = require("querystring");
const { isUtf8 } = require("buffer");
dotenv.config()
app.use(express.json())

//get request
app.use("/gettodo",(req,res)=>{
    fs.readFile("storedata.json","utf8",(err,data)=>{
        if(err) throw err
        const answer = JSON.parse(data)
        res.send(answer)
    })
})

//post request 

app.use("/posttodo",(req,res)=>{
    let newtodo = {
        id:Math.floor(Math.random() * 10000),
        title:req.body.title,
        description:req.body.description
    }
    fs.readFile("storedata.json","utf8",(err,data)=>{
        if (err) throw err ;

        const todo = JSON.parse(data)
        todo.push(newtodo);

        fs.writeFile("storedata.json",JSON.stringify(todo),(err)=>{
            if (err) throw err  
            res.send(newtodo)
        })

    })
})

// update todo
app.use("/update",(req,res)=>{
    console.log("update");
    let newtodo = {
        id:req.body.id, 
        title:req.body.title,
        description:req.body.description
    }

    fs.readFile("storedata.json","utf8",(err,dat)=>{
        if(err) throw err; 
        var data = JSON.parse(dat)
        var flag = 0
        for(let i = 0 ; i< data.length;i++){
            if(data[i].id === newtodo.id){
              data[i] = newtodo
              flag = i
            }
        }
     
     fs.writeFile("storedata.json",JSON.stringify(data),(err,d)=>{
               if(err) throw err 
               res.send(data[flag])
               
     })   
    })
})

//delete todo 


app.delete("/delete/:id",(req,res)=>{
    fs.readFile("storedata.json","utf8",(err,dat)=>{
        if(err) throw err;

        var data = JSON.parse(dat)
     
   
        for(let i = 0 ; i < data.length;i++){
            if(data[i].id === parseInt(req.params.id)){
                    var index = i 
            }
        }

        data.splice(index,1)

        fs.writeFile("storedata.json",JSON.stringify(data),(err,dat)=>{
            if(err) throw err;

            res.send("Deleted Successfully")
        })
    })
})

app.listen(process.env.PORT,()=>{
    console.log("Server is connected to PORT " + process.env.PORT);
})