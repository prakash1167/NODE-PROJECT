const express = require('express');
const app = express();
const ejs=require('ejs');
const cors=require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
require('dotenv').config();
let bodyParser = require('body-parser');
const{uploadPhoto}=require('./middlewares/uploadImage.js');
// routers
const adminRouter = require('./controllers/admin.js');
const userRouter = require('./controllers/user.js');
// db models
const User = require('./models/User.js');
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(bodyParser.json());
// middlewares
const userAuthenticator = require('./middlewares/userAuthentication.js');
const requestLogger = require('./middlewares/requestLogger.js');
const adminValidator = require('./middlewares/adminValidator.js');
const PORT = 5000;
app.use(cors());
const authenticateUser = async(useremail, userpass) => {
    try {
       
      
  // check if user exists or not
  const findUser = await User.findOne({ email : useremail}).exec();;
  if (findUser && (await findUser.isPasswordMatched(userpass)))
        
         {
                if(findUser.isAdmin) {
                    return 'admin';
                } else {
                    return 'user'
                }
            }
        }
    catch(err) {
        console.log(`DB ERROR: ${err}`);
    }
    return '';
} 
;


app.use("/style.css",express.static(__dirname + "/style.css"));
app.use('/public/images', express.static(__dirname + '/public/images'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(express.json());
app.use(requestLogger);
app.use(session({
     
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        saveUninitialized: false,
        resave: false
    }
}));
app.set('view engine', 'ejs')
app.get('/login', (req, res) => {
    // load login page
    if(req.session.useremail != undefined && req.session.useremail != '') {
        res.redirect('/');
    } else {
        res.sendFile(path.resolve(__dirname + '/public/html/login.html'));
    }
});

// user validator middleware here...
app.use(userAuthenticator);

app.post('/login', async(req, res) => {
    let reqPayload = req.body;
    if(req.session.useremail == undefined || req.session.useremail == '') {
        if(reqPayload != undefined && reqPayload.useremail != undefined && reqPayload.userpass != undefined) {
            // authenticate user
            let isValidUser = await authenticateUser(reqPayload.useremail,reqPayload. userpass);
            if(isValidUser === 'admin' || isValidUser === 'user') {
                //
                console.log('isValidUser: ' + isValidUser);
                console.log('user is valid');
                // create session obj
                req.session.useremail = reqPayload.useremail;
                if(isValidUser === 'admin') {
                    req.session.isAdmin = true;
                    
                }
                console.log('Session is created');
                console.log(`Session obj: ${JSON.stringify(req.session)}`);

                if(req.originalUrl === '/login' && req.method === 'POST') {
                    res.setHeader('content-type', 'application/json');
                    res.send({
                        message: 'valid user',
                        redirectUrl: '/'
                    });
                    return;
                }  
            } else {
                if(req.originalUrl === '/login' && req.method === 'POST') {
                    res.setHeader('content-type', 'application/json');
                    res.send({
                        message: 'user doesn\'t exists',
                        isUserNotExists: true
                    });
                    return;
                }
            }
        }
    }
    res.redirect('/');
});

app.use(adminValidator);
app.use('/', userRouter);
app.use('/admin/', adminRouter);

app.listen(PORT, async() => {
    console.log(`server has started and listening at port ${PORT}...`);
    await mongoose.connect(process.env.dbConnectionUrl,{
        //useNewUrlParse:true,
        useUnifiedTopology:true
    });
    console.log('DB connected');
});
