require('dotenv').config();

const Koa = require('koa');
const cors = require('@koa/cors');
const mongoose = require('mongoose');
const logger = require('koa-logger');
const helmet = require('koa-helmet');
const koaBody = require('koa-bodyparser');
const cloudinary = require('cloudinary');

const responses = require('./middlewares/response');

const routes = require('./routes');

const app = new Koa();
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_SERVER, { useNewUrlParser: true });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET
});

// trust proxy
app.proxy = true;

app.use(logger());
app.use(koaBody());
app.use(cors());
app.use(helmet());
app.use(koaBody());
app.use(responses);

app.use(routes.routes());
app.use(routes.allowedMethods());


// start server
const port = process.env.APP_PORT || 3000;
app.listen(port, () => console.log('Server listening on', port));
