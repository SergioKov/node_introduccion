console.log(' --- hola mundo desde node ---');

/*
if (false) {
    fetch('https://www.bibleqt.es/modules/text/nrt/nrt_01.htm')
        .then(response => response.text())
        .then(data => {
            console.log(data);
        })
        .catch(eror => {
            console.log('error :', error);
        });
}
*/

//-----------------------------//

const express = require('express');
//console.log(http);

const PORT = 8080;
const app = express();
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs/promises'); //libreria de promesas

/*
//modo 1
const http = require('http');
const server = http.createServer(); //antes
server.listen(PORT, (req, res) => {
    console.log('Servidor escuchando con server en el puerto ' + PORT);
});
*/

app.listen(PORT, (req, res) => {
    console.log('Servidor escuchando con express en el puerto ' + PORT);
});

app.use(express.json());

/*
app.get('/', (request, response) => {
    console.log(request.query.name);
    console.log(response);

    console.log('--- cierro la conexion con response.end() ---');
    response.end();
});
*/

//console.log('__dirname: ', __dirname);
//console.log('__filename: ', __filename);

//console.log('path.resolve(): ', path.resolve(__dirname, 'data'));

const filePath = path.resolve(__dirname, 'data', 'users.json');

/*
fs.readFile(filePath, (err, data) => {
    if (err) {
        //informar de error
        console.log('err: ', err);
    }

    const jsonData = JSON.parse(data);
    console.log(jsonData);
});
*/
/*
app.get('/users', (req, res) => {
    console.log('HOLA Sergio');

    fs.readFile(filePath, (err, data) => {
        if (err) {
            //informar de error
            console.log('err: ', err);
        }

        const jsonData = JSON.parse(data);
        console.log(jsonData);
        res.send(jsonData);
    });

    //res.send({ message: 'Hola' });
});
*/
/*
app.get('/user/:id', (req, res) => {
    console.log(req.params.id);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            //informar de error
        }

        const jsonData = JSON.parse(data);
        const jsonId = jsonData.find(v => v.userId === req.params.id); //mejor porque obtiene primer resultado

        //const jsonId = jsonData.filter(v => v.userId === req.params.id);//devuelve un array

        console.log('jsonId: ', jsonId);

        //console.log(jsonData);
        res.send(jsonId);
    });
});
*/

/*
//1. hay que poner la ruta en postman. ruta: localhost:8080/user/Miss
//2. al dar al send en postman se ejecutara el escript app.get() y pintara datos en postman con res.send()
//3. si no pongo res.send() el navegador se quedará cargando siempre (pillado) por escuchar y no devolvernada
app.get('/user/:title', (req, res) => {
    console.log('--- por get --- req.params.title: 'req.params.title);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            //informar de error
        }

        const jsonData = JSON.parse(data);
        //const jsonTitle = jsonData.find(v => v.userId === req.params.id);//mejor porque obtiene primer resultado

        const jsonTitle = jsonData.filter(v => v.title === req.params.title); //devuelve un array

        console.log('jsonTitle: ', jsonTitle);

        //console.log(jsonData);
        res.send(jsonTitle);
    });
});
*/

/*
// modo de callback
app.post('/user', (req, res) => {
    console.log('--- por post --- req.body: ', req.body);

    //meto nuevo usuario desde postman
    const newItem = req.body;

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.status(500).send({ error: 'Error del servidor' });
            return;
        } //informar de error

        const jsonData = JSON.parse(data);
        console.log('jsonData: ', jsonData);
        console.log(jsonData);

        //añado el objeto de nuevo usuario 'newItem' con el objeto ya existente 'jsonData'
        jsonData.push(newItem);
        console.log('ahora jsonData: ', jsonData);

        const newInfo = jsonData;

        fs.writeFile(filePath, JSON.stringify(newInfo), err => {
            if (err) return res.status(500).send('Error al guardar el archivo');

            console.log('ahora newInfo: ', newInfo);

            res.send(newInfo);
        });
    });

    res.end();
});
*/

//modo promesa
app.post('/user', async (req, res) => {
    try {
        const data = await fsPromises.readFile(filePath);
        const jsonData = JSON.parse(data);
        console.log('jsonData: ');
        console.log(jsonData);

        const newItem = req.body;

        //añado el objeto de nuevo usuario 'newItem' con el objeto ya existente 'jsonData'
        jsonData.push(newItem);
        console.log('ahora jsonData: ', jsonData);

        //añado el objeto de nuevo usuario 'newItem' con el objeto ya existente 'jsonData'
        jsonData.push(newItem);
        console.log('ahora jsonData: ', jsonData);

        const newInfo = jsonData;

        await fsPromises.writeFile(filePath, JSON.stringify(newInfo));
        res.send(jsonData);
    } catch (error) {
        res.send({ error: err });
    }

    res.end();
});
