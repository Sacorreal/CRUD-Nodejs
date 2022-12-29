const express = require("express"); 
const router = express.Router(); 

router.get("/", (req, res) => {
    res.render("index", {titulo: "mi título dinámico"})
})

// se puede pasar un objeto con el nombre de las variales. 
router.get("/servicios", (req, res) => {
    res.render("servicios", {tituloServicios: "mi título dinámico de los servicios"})
})

module.exports = router; 