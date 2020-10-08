let express = require("express")
let app = express()
Array.prototype.count = function(item){
    let c = 0;
    for(let idx= 0;idx<this.length;idx++){
        if(item==this[idx]){
            c+=1;
        }
    }
    return c

}
Object.prototype.toArray = function(){
    let items = [];
    for (const key in this) {
        if (this.hasOwnProperty(key)) {
            const element = this[key];
            items.push(element);
        }
    }
    return items;
}
let typeBuff = {
    meat:{
        "2":"Atk Up (S)",
        "3":"Atk Up (S)",
        "4":"Atk Up (M)",
        "5":"Atk Up (M)",
        "6":"Atk Up (L)"
    },
    veg:{
        "2":"Ele res Up (S)",
        "3":"Ele res Up (S)",
        "4":"Ele res Up (M)",
        "5":"Ele res Up (M)",
        "6":"Ele res Up (L)"
    },
    fish:{
        
        "2":"Defense Up (S)",
        "3":"Defense Up (S)",
        "4":"Defense Up (M)",
        "5":"Defense Up (M)",
        "6":"Defense Up (L)"
    },
    ale:{}
    
}
let colorBuff = {
    red:{
        "2":"Felyne Polisher",
        "4":"Felyne Rider",
        "6":"Felyne Slugger"
    },
    yellow:{
        "2":"Felyne Sharpshooter",
        "4":"Felyne Bombadier",
        "6":"Felyne Pyro"
    },
    orange:{
        
        "2":"Felyne Riser",
        "4":"Felyne Black Belt",
        "6":"Felyne Heroics"
    },
    blue:{
        
        "2":"Felyne Acrobat",
        "4":"Felyne Feet",
        "6":"Felyne Moxie"
    },

    purple:{
        
        "2":"Felyne Groomer",
        "4":"Felyne Medicine",
        "6":"Felyne Specialist"
    },
    maroon:{
        
        "2":"Felyne Cleats",
        "4":"Felyne Tailor",
        "6":"Felyne Safeguard"
    },
    green:{
        
        "2":"Felyne Iron Carver",
        "4":"Felyne Exchanger",
        "6":"Felyne Carver (Hi)"
    },
    gold:{
        
        "2":"Felyne Harvester",
        "4":"Felyne Fat Cat",
        "6":"Felyne Lucky Cat"
    }
    
    
    
    
    
}
let unallowedCombo = {
    meat:["maroon","green","gold"],
    veg:["maroon","green","gold"],
    fish:["maroon","green","gold"],
    ale:["red","yellow","purple","blue","orange"]
    
}
function checkForUnallowedCombination(orderList){
    orderList = orderList.toArray()
    for (let index = 0; index < orderList.length; index++) {
        const element = orderList[index];
        let checks = element.split(".").slice(0,2);
        
        if(unallowedCombo[checks[0]].includes(checks[1])){
            return true;
        }
    }
    
    return false;
}
function getMeatBuff(typeList){
    try {
        let meatBuff = typeBuff.meat[typeList.count("meat")]
        return meatBuff
    } catch (error) {
        
    }
}
function getVegBuff(typeList){
    try {
        let vegeBuff = typeBuff.veg[typeList.count("veg")]
        return vegeBuff
    } catch (error) {
        
    }
}
function getFishBuff(typeList){
    try {
        let fishBuff = typeBuff.fish[typeList.count("fish")]
        return fishBuff
    } catch (error) {
        
    }
}
function getColorBuff(colorList){
    let colorBuffList = []
    let buffCount = 0;
    try {
        let counter = colorList.count("red")
        let occurence = colorBuff.red[counter]
        let redBuff = occurence
        if(redBuff){
            colorBuffList.push(redBuff)
        }
        
        buffCount+=counter;
        if(buffCount==6){
            return colorBuffList
        }
    } catch (error) {
        
    }
    try {
        let counter = colorList.count("green")
        let occurence = colorBuff.green[counter]
        let greenBuff = occurence
        if(greenBuff){
            colorBuffList.push(greenBuff)
        }
        
        buffCount+=counter;
        if(buffCount==6){
            return colorBuffList
        }
    } catch (error) {
        
    }
    try {
        let counter = colorList.count("yellow")
        let occurence = colorBuff.yellow[counter]
        let yellowBuff = occurence
        if(yellowBuff){
            colorBuffList.push(yellowBuff)
        }
        
        buffCount+=counter;
        if(buffCount==6){
            return colorBuffList
        }
    } catch (error) {
        
    }
    try {
        let counter = colorList.count("blue")
        let occurence = colorBuff.blue[colorList.count("blue")]
        let blueBuff = occurence
        if(blueBuff){
            colorBuffList.push(blueBuff)
        }
        
        buffCount+=counter;
        if(buffCount==6){
            return colorBuffList
        }
    } catch (error) {
        
    }
    try {
        let counter = colorList.count("orange")
        let occurence = colorBuff.orange[colorList.count("orange")]
        let orangeBuff = occurence
        if(orangeBuff){
            colorBuffList.push(orangeBuff)
        }
        
        buffCount+=counter;
        if(buffCount==6){
            return colorBuffList
        }
    } catch (error) {
        
    }

    try {
        let counter = colorList.count("purple")
        let occurence = colorBuff.purple[colorList.count("purple")]
        let purpleBuff = occurence
        if(purpleBuff){
            colorBuffList.push(purpleBuff)
        }
        buffCount+=counter;
        if(buffCount==6){
            return colorBuffList
        }
    } catch (error) {
        
    }
    try {
        let counter = colorList.count("gold")
        let occurence = colorBuff.gold[colorList.count("gold")]
        let goldBuff = occurence
        if(goldBuff){
            colorBuffList.push(redBuff)
        }
        
        buffCount+=counter;
        if(buffCount==6){
            return colorBuffList
        }
    } catch (error) {
        

    }

    try {
        let counter = colorList.count("maroon")
        let occurence = colorBuff.maroon[colorList.count("maroon")]
        let maroonBuff = occurence
        if(maroonBuff){
            colorBuffList.push(maroonBuff)
        }
        
        buffCount+=counter;
        if(buffCount==6){
            return colorBuffList
        }
    } catch (error) {
        
    }
    return colorBuffList
}
app.get("/calculate",(req,res)=>{
    if(checkForUnallowedCombination(req.query)){
        res.end("Invalid combo...");
        return;
    }
    let colorList = []
    let typeList = []
    let mealBuffs = {}
    let statBuffs = {"Health":0,"Stamina":50}
    let queries = req.query.toArray()
    for (let index = 0; index < queries.length; index++) {
        let element = req.query[index];
        let elem = element.split(".")
        typeList.push(elem[0])
        colorList.push(elem[1])
        if(elem.length==3){
            if(elem[2] == "fr"){
                if(statBuffs.Health<50){
                    statBuffs.Health+=10
                }
            }
        }
    }
    let foodBuffs = []
    let meatbuff = getMeatBuff(typeList)
    let fishbuff = getFishBuff(typeList)
    let vegbuff = getVegBuff(typeList);
    if(meatbuff){
        foodBuffs.push(meatbuff)
    }
    if(fishbuff){
        foodBuffs.push(fishbuff)
    }

    if(vegbuff){
        foodBuffs.push(vegbuff)
    }
    // searching for red
    let colorBuffs = getColorBuff(colorList);
    mealBuffs = {
        foodBuffs:foodBuffs,
        foodSkills:colorBuffs,
        statBuffs:statBuffs
    }
    res.json(mealBuffs);
})
module.exports = app