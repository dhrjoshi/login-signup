const express = require('express');
const connect = require('./config/database');
const bodyParser = require('body-parser');

const apiRoutes = require('./routes/index');

// const User = require('./models/user');
// const UserController = require('./controllers/user-controller');

const setupAndStartServer = async () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.listen(4000, async () => {
        console.log('Server Started at PORT 4000');
        await connect();
        console.log('Mongodb connected');
        // const user = await User.create({
        //     email: 'a@b.com',
        //     password: 'abc123',
        //     userName: 'dhruv',
        //     phoneNumber: 9283746574,
        //     city: 'Delhi'
        // })
        // const user = await UserController.signUp({
        //     email: 'b@c.com',
        //     password: 'abcd123',
        //     userName: 'xyz',
        //     phoneNumber: 9183746574,
        //     city: 'XYZ'
        // });
        // app.post('/signup', UserController.signUp);
        app.use('/api', apiRoutes);
    });
}

setupAndStartServer();