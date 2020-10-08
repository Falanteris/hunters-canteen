let express = require("express")
let app = express()
var cookieSession = require('cookie-session')

app.set('trust proxy', 1) // trust first proxy
app.set('view engine', 'pug')
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

app.get('/', function (req, res, next) {
  // Update views
  req.session.foods = []
  
  // Write response
  res.end("Welcome!, how may we serve you today?");
})
app.route("/add/:type/color/:color")
.get((req,res)=>{
    let getFood = req.params.type;
    let getColor = req.params.color;
    if(req.session.foods.length>6){
        res.end("Cannot add more, you will have replace one of the ingredients");
        return;
    }
    req.session.foods.push(getFood+"."+getColor);
    res.write("Added: "+getFood,()=>{
        res.end();
    })
})
.post((req,res)=>{
    let getFood = req.params.type;
    if(req.session.foods.length>6){
        res.end("Cannot add more, you will have replace one of the ingredients");
       
    }

    res.write(getFood,()=>{
        res.end();
    })
})


app.get("/current",(req,res)=>{
    let items = {}
    for (let index = 0; index < req.session.foods.length; index++) {
        let element = req.session.foods[index];
        items[index] = element
    }
    res.json(items);

})

app.get("/switch/:index/type/:type/color/:color",(req,res)=>{
    let idx = req.params.index
    let type = req.params.type
    let color = req.params.color
    
    req.session.foods[idx] = type+"."+color;
    res.end("Item switched to : " + req.session.foods[idx])

})
app.get("/consume",(req,res,next)=>{
    let query = ""
    for (let index = 0; index < req.session.foods.length; index++) {
        let element = req.session.foods[index];
        query+=index+"="+element;
        if(index<req.session.foods.length -1){
            query+="&"
        }
        console.log(query)
        
    }
    let fullUrl = req.headers.host+"/buffs/calculate?"+query
    //res.render("templates/buff",{"message":})
    res.end("<body>Get your buff <a href=\""+fullUrl+"\">here</a></body>");
    
})

module.exports = app;