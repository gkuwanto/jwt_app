const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const request = require('supertest');

const jwt = require('jsonwebtoken');
const config = require('../../config');

const db = require('../../models/index');
const Todo = db.todo;
const app = require('../../index');

describe('dummy CRUD', ()=>{
    describe('creation', ()=>{
        let todoStub = null;
        let jwttoken = '';
        before(()=>{
            const promise = new Promise((resolve)=>{
                setTimeout(() => resolve({id:1, title:'AA'}), 100);
            });
            todoStub = sinon.stub(Todo, 'create')
                .returns(promise);
            jwttoken = jwt.sign({ id: 1 }, config.secret_key);
        });
        after(()=>{
            todoStub.restore();
        });
        it('should create todo list', async ()=>{
            const res = await request(app)
                .post('/dummy')
                .set('x-access-token',jwttoken)
                .send({title:'AA'});
            expect(res.status).to.eq(201);
        });
        it('should reject wrong token', async ()=>{
            const res = await request(app)
                .post('/dummy')
                .set('x-access-token', 'WRONG');
            expect(res.status).to.eq(401);
        });
    });
    describe('read', ()=>{
        let todoStubFindOne = null;
        let todoStubFindAll = null;
        let jwttoken = '';
        before(()=>{
            const promise = new Promise((resolve)=>{
                setTimeout(() => resolve({id:1, title:'AA'}), 100);
            });
            const promise_array = new Promise((resolve)=>{
                setTimeout(() => resolve([{id:1, title:'AA'}]), 100);
            });
            todoStubFindOne = sinon.stub(Todo, 'findOne')
                .returns(promise);
            todoStubFindAll = sinon.stub(Todo, 'findAll')
                .returns(promise_array);
            jwttoken = jwt.sign({ id: 1 }, config.secret_key);
        });
        after(()=>{
            todoStubFindOne.restore();
            todoStubFindAll.restore();
        });
        it('should get all todo list', async ()=>{
            const res = await request(app)
                .get('/dummy')
                .set('x-access-token',jwttoken);
            expect(res.body[0]).ownProperty('title');
            expect(res.body[0]).ownProperty('id');
        });
        it('should get specific todo list', async ()=>{
            const res = await request(app)
                .get('/dummy/1')
                .set('x-access-token',jwttoken);
            expect(todoStubFindOne.calledWith({where:{id:1}}))
            expect(res.body).ownProperty('title');
            expect(res.body).ownProperty('id');
        });
        it('should reject wrong token', async ()=>{
            const res = await request(app)
                .get('/dummy')
                .set('x-access-token', 'WRONG');
            expect(res.status).to.eq(401);
        });
    });
    describe('update', ()=>{
        let todoStubFindOne = null;
        let jwttoken = '';
        let spy = null;
        before(()=>{
            spy = sinon.spy()
            const promise = new Promise((resolve)=>{
                setTimeout(() => resolve({id:1, title:'AA', save:spy}), 100);
            });
            todoStubFindOne = sinon.stub(Todo, 'findOne')
                .returns(promise);
            jwttoken = jwt.sign({ id: 1 }, config.secret_key);
        });
        after(()=>{
            todoStubFindOne.restore();
        });
        it('should get specific todo list', async ()=>{
            const res = await request(app)
                .put('/dummy/1')
                .set('x-access-token',jwttoken)
                .send({title:"BB"});
            expect(spy.calledOnce,'save function').to.be.true
            expect(res.status).to.eq(204);
        });
        it('should reject wrong token', async ()=>{
            const res = await request(app)
                .put('/dummy')
                .set('x-access-token', 'WRONG')
                .send({title:"BB"});;
            expect(res.status).to.eq(401);
        });
    });
    describe('delete', ()=>{
        let todoStubFindOne = null;
        let jwttoken = '';
        let spy = null;
        before(()=>{
            spy = sinon.spy()
            const promise = new Promise((resolve)=>{
                setTimeout(() => resolve({id:1, title:'AA', destroy:spy}), 100);
            });
            todoStubFindOne = sinon.stub(Todo, 'findOne')
                .returns(promise);
            jwttoken = jwt.sign({ id: 1 }, config.secret_key);
        });
        after(()=>{
            todoStubFindOne.restore();
        });
        it('should get specific todo list', async ()=>{
            const res = await request(app)
                .delete('/dummy/1')
                .set('x-access-token',jwttoken);
            expect(spy.calledOnce,'destroy function').to.be.true
            expect(res.status).to.eq(204);
        });
        it('should reject wrong token', async ()=>{
            const res = await request(app)
                .delete('/dummy')
                .set('x-access-token', 'WRONG');
            expect(res.status).to.eq(401);
        });
    });
});