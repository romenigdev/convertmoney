const express = require('express')
const app = express()
const path = require('path')
const convert = require('./lib/convert')
const apiBCB = require('./lib/api-bcb')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', async (req, res) => {
    const cotacao = await apiBCB.getCotacao()
    console.log('cotacao > ', cotacao)
    res.render('home',{
        cotacao
    })
})

app.get('/quote', (req, res) => {
    const {amount, quote} = req.query
    if(amount && quote){
        const convertion = convert.convert(quote, amount)
        res.render('quote', {
            error: false,
            amount: convert.formatMoney(amount),
            quote: convert.formatMoney(quote),
            convertion: convert.formatMoney(convertion)
        })
    } else {
        res.render('quote', { error: 'Valores inválidos.'})
    }
})

app.listen(3000, err => {
    if(err){
        console.log('The server could not listen to port 3000.')
    } else {
        console.log('The server is online')
    }
})