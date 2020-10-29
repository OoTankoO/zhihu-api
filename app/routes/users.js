const Router = require('koa-router');
const router = new Router({prefix: '/users'});
const {find, findById, create, update, delete:del,
    login} = require('../controlers/users');

const auth = async (ctx) => {

};

router.get('/', find);
router.post('/', create);
router.get('/:id', findById);
// router.put('/:id', update); // 整体更新
router.patch('/:id', update); // 部分更新
router.delete('/:id', del);

router.post('/login', login);

module.exports = router;