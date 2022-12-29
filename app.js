const express = require("express"); 
const bodyParser = require("body-parser"); 
const app = express(); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


require("dotenv").config(); 

const port = 3000; 

// conexion a base de datos
const mongoose = require("mongoose"); 

// Se utiliza variables de entorno con el process.env.nombreVariable
const uri = `mongodb://${process.env.USER}:${process.env.PASSWORD}@ac-dpl9why-shard-00-00.fuv16e1.mongodb.net:27017,ac-dpl9why-shard-00-01.fuv16e1.mongodb.net:27017,ac-dpl9why-shard-00-02.fuv16e1.mongodb.net:27017/${process.env.DBNAME}?ssl=true&replicaSet=atlas-z25b64-shard-0&authSource=admin&retryWrites=true&w=majority`

mongoose.set('strictQuery', true)

mongoose.connect(uri,{ keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,} )

    .then(db => console.log("Conectado a base de datos"))
    .catch(e => console.log(e))
    


//motor de plantillas
app.set("view engine", "ejs");
app.set("views", __dirname +"/views"); 

//middleware 
app.use(express.static(__dirname + "/public"))

//rutas web
app.use("/", require("./router/rutasWeb"));
app.use("/mascotas", require("./router/mascotas"))

app.use((req, res, next) => {
    res.status(404).render("404")
})


app.listen(port, () => {
    console.log("Servidor en el puerto", port)
})