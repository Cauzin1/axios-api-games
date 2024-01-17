const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors()); //para que o front-end consiga acessar o back-end
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//testar criar arquivo json com dados e importar aqui
//var DBGames = require('./dbgames');

var DataBase = {
    games: [
        {
            id: 23,
            title: "Call of duty MW",
            year: 2019,
            price: 60
        },
        {
            id: 65,
            title: "Sea of thieves",
            year: 2018,
            price: 40
        },
        {
            id: 2,
            title: "Minecraft",
            year: 2012,
            price: 20
        }
    ]
}

app.get('/menu', (req, res) => {
    res.statusCode = 200;    
    res.json(DataBase.games);
});

app.get("/games/:id",(req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);

        var game = DataBase.games.find(g => g.id == id);
        //Essa função é usada como um teste de condição para cada elemento da array. Ele retorna o primeiro elemento da array
        //para o qual a condição g.id == id é verdadeira.

        if(game != undefined){
            res.statusCode = 200
            res.json(game);
    }else{
            res.sendStatus(404);
        }
}
});

app.post("/games",(req,res)=>{
    var {title,price,year} = req.body;

    DataBase.games.push({
        id: 2323,
        title,
        year,
        price 
    });

    res.sendStatus(200);
}
);

app.delete("/games/:id",(req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id);
        var indexGame = DataBase.games.findIndex(g => g.id == id);

        if(indexGame == -1){
            res.sendStatus(404);
        } else {
            DataBase.games.splice(indexGame,1);
            res.sendStatus(200);
        
        }

    }

})

app.put("/games/:id",(req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id);
        var game = DataBase.games.find(g => g.id == id);

        if(game != undefined){

            var {title,price,year} = req.body;

            if(title != undefined){
                game.title = title;
            }
            if(price != undefined){
                game.price = price;
            }
            if(year != undefined){
                game.year = year;
            }

            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    }
}
);

//para cadastrar um game eu preciso passar o id, o title, o price e o year
//para isso eu preciso usar o body-parser ou seja usar o body.(alguma coisa)

app.listen(4000, () => {
    console.log('Server running on port 4000');
}
);