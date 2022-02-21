const express = require('express')
const path = require('path')
const app = express()

const port = process.env.PORT || 3000

const hbs = require('hbs')
const weather = require('./utils/weather')

const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
//console.log(__dirname)
app.use(express.static(publicDirectoryPath))

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name : 'Darshil'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'Weather App',
        name : 'Darshil Jariwala'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:'Help Text Template',
        title: 'help',
        name : 'Darshil Jariwala'
    })
})


app.get('/weather',(req,res) =>{

    if(!req.query.address){
        return res.send({
            error : 'Please enter an address as a query'
        })
   }

   weather(req.query.address,(error,forecastData) =>{
       if(error){
           return res.send({
               error: error
           })
       }
       res.send({
           forecast : forecastData,
           address : req.query.address
       })
   })
    
})

app.get('/products',(req,res) =>{
    if(!req.query.search){
        return res.send({
            error: 'Please provide a search term'
        })
    }
    res.send({
        products : []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{errorMessage:"Help page not found",name: "Darshil",title: "404 help"})
})

app.get('*',(req,res) =>{
    res.render('404',{errorMessage:"Error page not found",name : "Darshil",title: "404"})
})

app.listen(port,()=>{
    console.log("The server is up and running on port "+port)
})