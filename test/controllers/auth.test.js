const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const app = require('../../index');
const request = require('supertest');
const db = require('../../models/index');
const User = db.authentication;
const bcrypt = require('bcryptjs');


describe('user authentication', ()=>{
    describe('registration', ()=>{
        let userStub = null;
        before(()=>{
            const promise = new Promise((resolve)=>{
                setTimeout(() => resolve({id:1}), 100);
            });
            userStub = sinon.stub(User, 'create')
                .returns(promise);
        });
        after(()=>{
            userStub.restore();
        });
        it('should register with correct input', async ()=>{
            const res = await request(app)
                .post('/auth/register')
                .send({username: 'asdf', password:'asdf1234'});
            expect(res.body).ownProperty('token');
            expect(res.body.auth).to.be.true;
        });
        it('should reject wrong inputs', async ()=>{
            const res = await request(app)
                .post('/auth/register');
            expect(res.status).to.eq(400);
        });
    });

    describe('login',()=>{
        let bcryptStub = null;
        let userStub = null;
        before(()=>{
            const promise = new Promise((resolve)=>{
                setTimeout(() => resolve({
                    dataValues:{
                        id:1, 
                        username:'asdf',
                        password:'asdf1234'
                    }
                }), 100);
            });
            userStub = sinon.stub(User, 'findOne')
                .returns(promise);
            bcryptStub = sinon.stub(bcrypt, 'compareSync')
                .callsFake((a,b)=>a==b);
        });
        after(()=>{
            bcryptStub.restore();
            userStub.restore();
        });
        it('should login with correct input', async ()=>{
            const res = await request(app)
                .post('/auth/login')
                .send({username: 'asdf', password:'asdf1234'});
            expect(res.body).ownProperty('token');
            expect(res.body.auth).to.be.true;
        });
        it('should reject wrong logins', async ()=>{
            const res = await request(app)
                .post('/auth/login')
                .send({username: 'asdf', password:'wrongpass'});
            expect(res.status).to.eq(401);
            expect(res.body.msg).to.eq('Failed to login');
        });
    });
});