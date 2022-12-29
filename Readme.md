# API - CRUD con *Nodejs*

## *Introducción*

> Para conocer más acerca del autor del proyecto puedes visitar mi sitio web [Schneider Correa](https://schneider.vercel.app/)
---
La aplicación desarrollada consiste en guardar una lista de animales para una veterinaria para luego poder consultarlos, editarlos ó eliminarlos. 

Apuntes del curso de *NodeJS*, permite ejecutar Javascript del lado del servidor, para crear el backend de una aplicación se utilizó el framework *Express*, ya que facilita las peticiones y crear los Endpoints de la API-Rest. 

Se utilizó una base de datos **NoSQL**, llamada *MongoDB*, la cual tiene una solución en la nube para almacenar la información; para poder facilitar las operaciones CRUD a la base de datos se utilizó la librería *Mongoose*. 

## *Configuraciones iniciales*
---
El archivo que inicializa todo el proyecto es el **app.js**, en donde se deben realizar todas las configuraciones iniciales del proyecto. 

### *Vistas*
---
Como se va utilizar el motor de plantillas *EJS* se tiene que realizar la siguiente configuración y así evitar al llamar a cada plantilla con el nombre de la extensión .ejs en el archivo **app.js**: 
```javascript
app.set("view engine", "ejs"); 
app.set("views", __dirname +"/views");
``` 
### *Rutas*
---
Es necesario indicar cuales serán las rutas disponibles en el app, para ello se establece una ruta home y una de mascotas que va contener toda la logica y creación de cada ruta de la API 

```javascript  
app.use("/", require("./router/rutasWeb"));
app.use("/mascotas", require("./router/mascotas"))
``` 
Si el usuario se dirige a una ruta no especificada se redigire a una pagina 404 por medio del siguiente ***middleware***, controlador o software intermedio 

```javascript  
app.use((req, res, next) => {
    res.status(404).render("404") //404 es el nombre de la vista, se omite el nombre de la extensión ejs
})
``` 


### *Conexión a MongoDB*
---
La conexión a Mongo se realiza por medio de la libreria Mongoose, para facilitar el manejo, para establecer una conexión segura y no exponer datos sensibles se crean variales de entorno, para ello se crea un archivo con la extension .env y se almacenan las variables con la sintaxis: 
> NOMBRE_VARIABLE = valor. 
> USER = usuario

**Por convención las variables de entorno se nombran en Mayúscula sostenida**

para el uso de las variables de entorno se llama en el archivo **app.js** de la siguiente forma: 
> process.env.NOMBRE_VARIBLE

Cuando se declaren las variables se debe crear el siguiente script en el archivo **app.js**: 

`require("dotenv").config()` 

Y se debe ejecutar la siguiente configuración por defecto que proviene de la documentación de *Mongoose*: 
```javascript  
mongoose.set('strictQuery', true)

mongoose.connect(uri,{ keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,} )

    .then(db => console.log("Conectado a base de datos"))
    .catch(e => console.log(e))
``` 
## *Creación de la Base de datos*
---
Dentro del proyecto se crea la carpeta *models* la cual va contener el esquema y los modelos que se van almacenar en la base de datos. 
>***Se usa esta terminología ya que es una base de datos NoSQL, no relacional, pero el objetivo es el mismo***

el nombre de archivo se crea de acuerdo a los modelos creados, para nuestro caso solo se creo un modelo llamado **mascota** que va contener el esquema de la información y los tipos de datos que se van almacenar por medio de ***documentos***: 
```javascript  
const mascotaSchema = new Schema({
    nombre: String,
    descripcion: String
})
```
Posterior a la creación de la estructura la base de datos, es decir al esquema, se crea la tabla Mascota ó ***modelo*** como se conoce en bases de datos no relacionales como MongoDB: 

```javascript  
const Mascota = mongoose.model("Mascota", mascotaSchema); 

module.exports = Mascota;

``` 
## *Creación de las vistas - Capturando los datos*
---
>Todas las vistas de la aplicación se crearon en la carpeta **views**. 

El objetivo principal de toda aplicación web, es manipular datos, poder capturalos hacer alguna operación con ellos y devolverlos a los usuarios, para poder realizar la captura de las mascotas que se van almacenar en la base de datos, previamente creada se creó el siguiente formulario en la vista crear  ruta: ***\views\crear.ejs***: 

### *Creando Mascotas - POST*

el valor del atributo ***action*** indica a cual ruta se debe ir posterior a que se envíe el formulario, es este caso se envia a la ruta ***mascotas*** 
```html 
<form action="/mascotas" >
``` 
Se establece el método para indicar que se van enviar datos desde el cliente al servidor
```html  
<form  method="POST"
``` 
Por defecto los navegadores (clientes) siempre hacen peticiones por el método GET, para obtener datos desde el servidor al navegador, pero cuando queremos enviar datos al servidor utilizamos el método POST, por ello para capturar los datos del formulario anterior creamos la siguiente ruta: 
```javascript  
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
``` 


### *Editando Mascotas - PUT*
---
Para editar las mascotas se creo un boton por cada una de las mascotas y este lleva a una vista que se genera de forma dinámica 














