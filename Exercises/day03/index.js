const express = require('express');
require('dotenv').config()
const middleware = require('./middleware');
const IdValidator =require('./route_middleware')
const users = require('./const');

const app = express();
const hostname = process.env.HOSTNAME;
const port = process.env.PORT
// console.log(hostname, port);

app.use(express.json());
app.use(middleware);


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
        const response = users.map(user => user);

        console.log('res--', response);

        res.status(200).send(response);

    } catch (error) {
        console.log(error);
        console.log('server error!!');
    }
});

// app.listen(3000);

//task -03- /users/:id

app.get('/users/:id', IdValidator, (req, res) => {

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
        const id = req.body.id
        const name = req.body.name
        const email = req.body.email
        const age = req.body.age
        const role = req.body.role
        const isActive = req.body.isActive
        const newUser = {
            id,
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

app.patch("/users/:id", IdValidator, (req, res) => {
    try {
        const { name, email, age, role, isActive } = req.body;
        const param = req.params.id;

        console.log('Request Body:', req.body);
        console.log('User ID to Update:', param);

        let userFound = false;

        const updatedUsers = users.map(user => {
            if (user.id == param) {
                userFound = true;
                console.log("userfound", userFound);
                return {
                    ...user,
                    name: name || user.name,
                    email: email || user.email,
                    age: age || user.age,
                    role: role || user.role,
                    isActive: isActive !== undefined ? isActive : user.isActive
                };

            }
            console.log('user', user);
            return user;

        });
        [...users, ...updatedUsers];
        console.log("updateduser", users);

        if (!userFound) {
            return res.status(404).send({ error: "User not found" });
        }

        // Send updated users array as a response
        res.status(200).send(updatedUsers);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ error: "Server error!" });
    }
});

app.delete('/users/:id', IdValidator, (req, res) => {
    try {
        const param = req.params.id
        console.log('param id',param);

        const updatedUsers = users.filter(user => {
            console.log('user id:-',user.id);
            return user.id != parseInt(param);
        });
        console.log(updatedUsers);

        res.status(200).json({ updatedUsers });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ error: "Server error!" });

    }
})


app.listen(port, hostname, (err) => {
    console.log(`server is running at http://${hostname}:${port}/`);
});