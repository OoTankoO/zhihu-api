const db = [{name: '李雷'}];

class UsersCtl {
    find(ctx) {
        a.b
        ctx.body = db;
    }
    findById(ctx) {
        if (ctx.params.id * 1 >= db.length) {
            ctx.throw(412, '先决条件失败');
        }
        ctx.body = db[ctx.params.id * 1];
    }
    create(ctx) {
        ctx.verifyParams({
            name: {type: 'string', required: true},
            age: {type: 'number', required: false}
        });
        db.push(ctx.request.body);
        ctx.body = ctx.request.body;
    }
    update(ctx) {
        if (ctx.params.id * 1 >= db.length) {
            ctx.throw(412, '先决条件失败');
        }
        ctx.verifyParams({
            name: {type: 'string', required: true},
            age: {type: 'number', required: false}
        });
        db[ctx.params.id * 1] = ctx.request.body;
        ctx.body = ctx.request.body;
    }
    delete(ctx) {
        if (ctx.params.id * 1 >= db.length) {
            ctx.throw(412, '先决条件失败');
        }
        db.splice(ctx.params.id * 1, 1);
        ctx.status = 204;
    }
}

module.exports = new UsersCtl();