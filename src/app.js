const path=require('path')
const express= require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app=express()
const port=process.env.PORT || 3000

const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Akshat Chaurasia',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Akshat Chaurasia'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Akshat Chaurasia'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({
            error:'Please provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude,longitude,location}={}) => {
        if(error) 
        return res.send({error})
        forecast(latitude,longitude, (error, fdata) => {
            if(error)
            return res.send({error})
            res.send({
                forecast: fdata,
                location,
                address:req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Akshat Chaurasia',
        errorMessage: 'Could not get help topics.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Akshat Chaurasia',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, ()=>{
    console.log("Server is up on port "+ port)
})