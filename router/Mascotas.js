const express = require("express"); 
const router = express.Router(); 

const Mascota = require("../models/mascota")

router.get("/", async (req, res) => {

    try {
        const arrayMascotasDB = await Mascota.find()
        // la respuesta tambien se puede enviar por medio de un json para que consuma frontend 
        //res.json({ arrayMascotas: arrayMascotasDB })
        res.render("mascotas", {
            arrayMascotas: arrayMascotasDB 
        })
        
        
    } catch (error) {
        console.log(error)
    }

    
})

router.get("/crear", (req, res) => {
    res.render("crear", )

})

//los datos se reciben por la vista crear en el formulario se especifica el método 
router.post("/", async (req, res) =>{
    const body= req.body
    try {
        
        await Mascota.create(body)
        //cuando cree el documento en la base de datos, se redirige a la vista mascotas
        res.redirect("/mascotas")
        
    } catch (error) {
        console.log(error)
    }

})

//:id indica que se le va pasar una URL dinamica 
router.get("/:id", async (req, res) => {

    const id = req.params.id

    try {
        const mascotaDB = await Mascota.findOne({_id: id})
       //le estoy enviando a la vista detalle, el objeto mascota, que tiene como valor la búsqueda de la mascota por ID en la BD
        res.render("detalle", {
            mascota: mascotaDB, 
            error: false
            
        })
        
    } catch (error) {
        res.render("detalle", {            
            error: true, 
            mensaje: "No se encuentra el ID seleccionado"
        })
        
    }
})

// Se crea una ruta para eliminar un documento de la base de datos
router.delete("/:id", async (req, res) =>{
    const id = req.params.id
    try {
        //el método findByIdAndDelete permite busca y eliminar un elemento unico en la bd
        const mascotadb = await Mascota.findByIdAndDelete({_id: id})

        //esta es la respuesta que se envia cuando se elimine el documento
        if (mascotadb){
            //no se puede devolver por el metodo redirect, toca enviar la respuesta en json 
            res.json({
                estado:true,
                mensaje: "Mascota eliminada!"
            })

        }else{
            res.json({
                estado:false,
                mensaje: "Falló eliminar"
            })

        }
        
    } catch (error) {
        console.log(error)
    }

})

router.put("/:id", async(req, res) =>{
    const id = req.params.id
    const body = req.body
    
    try {
        const mascotaDB = await Mascota.findByIdAndUpdate(id, body, { useFindAndModify: false})
        res.json({
            estado: true, 
            mensaje: "Mascota editada"
        })
        
    } catch (error) {
        console.log(error)
        res.json({
            estado: false, 
            mensaje: "Falló editar la mascota"
        })
        
    }
})

module.exports = router; 