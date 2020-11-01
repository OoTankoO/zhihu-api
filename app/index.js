const Koa = require('koa');
const koaStatic = require('koa-static');
const koaBody = require('koa-body');
const error = require('koa-json-error');
const parameter = require('koa-parameter');
const mongoose = require('mongoose');
const path = require('path');
const app = new Koa();
const routing = require('./routes');
const {connectionStr} = require('./config');
// app.use(async (ctx, next) => {
//   try{
//     await next();
//   }catch(err) {
//     ctx.status = err.status || err.statusCode || 500;
//     ctx.body = {
//       message: err.message
//     }
//   }
// });

mongoose.connect(connectionStr, {useUnifiedTopology: true,  useNewUrlParser: true}, () => {
    console.log('DB链接成功');
});
mongoose.connection.on('error', console.error);

app.use(koaStatic(path.join(__dirname, '/public')));
app.use(error({
  postFormat: (err, {stack, ...rest}) => {
    return process.env.NODE_ENV === 'production' ?
      rest: {stack, ...rest};
  }
}));
app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, '/public/uploads'),
    keepExtensions: true, // 保持扩展名
  }
}));
app.use(parameter(app));
routing(app);

app.listen(3000, () => {
    console.log('程序启动在 3000 端口');
});