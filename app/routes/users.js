const Router = require('koa-router');
const jsonwebtoken = require('jsonwebtoken');
const jwt = require('koa-jwt');
const router = new Router({prefix: '/users'});
const {find, findById, create, update, delete:del,
    login, checkOwner,
    listFollowing, follow} = require('../controlers/users');

const {secret} = require('../config');

// const auth = async (ctx, next) => {
//     const {authorization = ''} = ctx.request.header;
//     const token = authorization.replace('Bearer ', '');
//     try {
//         const user = jsonwebtoken.verify(token, secret);
//         ctx.state.user = user;
//         await next();
//     } catch(err) {
//         ctx.throw(401, err.message);
//     }
// };
const auth = jwt({ secret });

router.get('/', find);
router.post('/', create);
router.get('/:id', findById);
// router.put('/:id', update); // 整体更新
router.patch('/:id', auth, checkOwner, update); // 部分更新
router.delete('/:id', auth, checkOwner, del);

router.post('/login', login);

router.get('/:id/following', listFollowing);
router.put('/following/:id', auth, follow);

module.exports = router;