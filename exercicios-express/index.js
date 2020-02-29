const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const saudacao = require('./saudacaoMid')
const usuarioApi = require('./api/usuario')
const produtoApi = require('./api/produto')
produtoApi(app, 'com parametros!')
// require('./api/produto') (app, 'com param!')

app.post('/usuario', usuarioApi.salvar)
app.get('/usuario', usuarioApi.obter)



app.use(bodyParser.text())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/corpo', (req, res) => {
    res.send(req.body)
})

app.use(saudacao("Liniker"))

app.use((req, res, next) => {
    console.log("Antes...")
    next()
})

app.get('/clientes/relatorio', (req, res) => {
    res.send(`Cliente relatório: completo =
     ${ req.query.completo} ano = ${req.query.ano}`)
})


app.get('/clientes/:id', (req, res) => {
    res.send(`Cliente ${req.params.id} selecionado!`)
})


app.post('/corpo', (req, res) => {
    let corpo = ''
    req.on('data', function(parte) {
        corpo += parte
    })

    req.on('end', function(){
        res.send(corpo)
        // res.json(JSON.parse(corpo))
    })
})


app.use('/opa', (req, res, next) => {
    console.log("Durante!...")
    res.json({
        data: [
            { id: 7, name: "Ana", position: 1 },
            { id: 34, name: "Bia", position: 2 },
            { id: 73, name: "Carlos", position: 3 }
        ],
        count: 30,
        skip: 0,
        limit: 3,
        status: 200
    })
    //Retorna um objeto de Array ..
    // res.json([
    //     { id: 7, name: "Ana", position: 1 },
    //     { id: 34, name: "Bia", position: 2 },
    //     { id: 73, name: "Carlos", position: 3 }
    // ])

    //Retorna um HTML via get
    // res.send("Estou <b>bem !</b> <h1>TESTE</h1>")


    // Retorna um Json 
    // res.json({
    //     name: 'IPad 32Gb',
    //     price: 1899.00,
    //     discount: 0.12
    // })
    next()

})

app.use((req, res) => {
    console.log("Depois...")
})


app.listen(3000, () => {
    console.log("Backend Executando 2...")
})