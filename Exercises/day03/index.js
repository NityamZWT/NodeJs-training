const express = require('express');
require('dotenv').config()
const fs = require('node:fs');
const { default: users } = require('./const');
const { json } = require('node:stream/consumers');

const app = express();
const hostname = process.env.HOSTNAME;
const port = process.env.PORT
// console.log(hostname, port);

app.use(express.json());

//task -01- Set up an endpoint GET / to return Welcome to the User Management API!
app.get('/', (req, res) => {
    try {
        console.log('Welcome to the User Management API!');
        res.send('Welcome to the User Management API!');
    } catch (error) {
        console.log(error);
    }
});

//task -02- Basic User Operations
app.get('/users', (req, res) => {
    try {
        console.log(users);
        const response = users.map(user => user.name);

        console.log('res--', response);

        res.status(200).send(response);

    } catch (error) {
        console.log(error);
        console.log('server error!!');
    }
});

// app.listen(3000);

//task -03- /users/:id

app.get('/users/:id', (req, res) => {

    try {
        // console.log('enter');
        const param = req.params.id;
        // console.log(param);
        const response = users.filter(user => user.id == param);
        // const resp = response.json();
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        console.log('server error!!');
    }
})

//task-03- post

app.post('/users', (req, res) => {
    try {
        console.log('in');

        const name = req.body.name
        const email = req.body.email
        const age = req.body.age
        const role = req.body.role
        const isActive = req.body.isActive
        const newUser = {
            name,
            email,
            age,
            role,
            isActive
        }

        console.log('user', newUser);


        users.push(newUser);
        console.log(newUser);

        res.status(200).send(newUser)

    } catch (error) {
        console.log(error);
        console.log('server error!!');
    }

    // task -04- patch

})

app.patch("/users/:id", (req, res) => {
    try {
        const name = req.body.name
        const email = req.body.email
        const age = req.body.age
        const role = req.body.role
        const isActive = req.body.isActive
        console.log(req.body);


        console.log('in');
        const param = req.params.id
        console.log(param);

        const updatedUser = users.map(user => {
            if (user.id == param) {
                user.name = name
                user.email = email
                user.age = age
                user.role = role
                user.isActive = isActive
                return user
            }
            console.log('user', user);
        })
        res.send(updatedUser)
        // console.log('updated--', updatedUser);


    } catch (error) {
        console.log(error);
        console.log('server error!!');
    }
})



app.listen(port, hostname, (err) => {
    console.log(`server is running at http://${hostname}:${port}/`);
});