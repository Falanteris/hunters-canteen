
let express = require("express")
let app = express()
let food = require("./routes/food");
let buff = require("./routes/buff")

app.use("/food",food);
app.use("/buffs",buff)
app.set('port', process.env.PORT || 3000);

module.exports = app