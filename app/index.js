const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const error = require('koa-json-error');
const parameter = require('koa-parameter');
const mongoose = require('mongoose');
const app = new Koa();
const routing = require('./routes');
const {connectionStr} = require('./config');
app.use(async (ctx, next) => {
  try{
    await next();
  }catch(err) {
    ctx.status = err.status || err.statusCode || 500;
    ctx.body = {
      message: err.message
    }
  }
});

mongoose.connect(connectionStr, {useUnifiedTopology: true,  useNewUrlParser: true}, () => {
    console.log('DB链接成功');
});
mongoose.connection.on('error', console.error);

app.use(error({
  postFormat: (err, {stack, ...rest}) => {
    return process.env.NODE_ENV === 'production' ?
      rest: {stack, ...rest};
  }
}));
app.use(bodyparser());
app.use(parameter(app));
routing(app);

app.listen(3000, () => {
    console.log('程序启动在 3000 端口');
});