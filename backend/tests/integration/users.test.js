const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const app = require('../../src/app');
const connection = require('../../src/db/connection');

const { expect, use } = chai;

use(chaiHttp);

describe('Testando os endpoints de user', function () {
    it('Testando o retorno de um usuario ', async function () {
        sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);

        const response = await chai
            .request(app)
            .post('/user')
            .send(
                {
                    Username: 'Luke',
                    Password: '1234',
                },
            );

        expect(response.status).to.equal(201);
        expect(response.body).to.
            deep.equal({ message: 'Usuario cadastradao com sucesso com o id 42' });
    });

    afterEach(sinon.restore);
});