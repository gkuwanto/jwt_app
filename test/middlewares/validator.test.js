const sinon = require('sinon');
const expect = require('chai').expect;

const jwt = require('jsonwebtoken');
const config = require('../../config');

const validator = require('../../middlewares/validator');

describe('validator middleware', ()=>{
    it('should call status with 401 if wrong token is passed ', ()=>{
        const req = {
            headers: {
                'x-access-token': 'WRONG TOKEN'
            }
        };

        const res = {
            status: ()=>null
        };
        const send = sinon.spy();
        const next = sinon.spy();
        const statusStub = sinon.stub(res, 'status')
            .returns({send});


        validator(req, res, next);

        expect(send.calledOnce).to.be.true;
        expect(statusStub.calledOnceWith(401)).to.be.true;
        expect(next.notCalled).to.be.true;
    }); 
    it('should call next if correct token is passed ', ()=>{
        const req = {
            headers: {
                'x-access-token': jwt.sign({id:1}, config.secret_key)
            }
        };

        const res = {
            status: ()=>null
        };
        const send = sinon.spy();
        const next = sinon.spy();
        const statusStub = sinon.stub(res, 'status')
            .returns({send});


        validator(req, res, next);

        expect(send.notCalled).to.be.true;
        expect(statusStub.notCalled).to.be.true;
        expect(next.calledOnce).to.be.true;

        statusStub.restore();
    });
});