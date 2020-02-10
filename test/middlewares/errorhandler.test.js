const sinon = require('sinon');
const expect = require('chai').expect;

const errorhandler = require('../../middlewares/error-handler');

describe('errorhandler middleware', ()=>{
    it('should return response with json', ()=>{
        const errorMessage = 'Test';
        const err = new Error(errorMessage);
        const res = {
            status: ()=>null
        };
        const send = sinon.spy();
        const next = sinon.spy();
        const statusStub = sinon.stub(res, 'status')
            .returns({send});
        const consoleLogStub = sinon.spy(console, 'log');

        errorhandler(err, null, res, next);

        expect(consoleLogStub.calledOnce).to.be.true;
        expect(send.calledOnce).to.be.true;
        expect(statusStub.calledOnce).to.be.true;
        expect(next.notCalled).to.be.true;


        statusStub.restore();
        consoleLogStub.restore();
    });
});