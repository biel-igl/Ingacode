const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const app = require('../../src/app');
const connection = require('../../src/db/connection');

const { expect, use } = chai;

use(chaiHttp);

const userList = [
    {
        id: 1,
        Username: 'Luke',
        Password: 'Skywalker',
    },
    {
        id: 2,
        Username: 'Dart',
        Password: 'Vader',
    },
];

describe('Testando os endpoints de user', function () {
    it('Testando o retorno de um usuario ', async function () {
        sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);

        const response = await chai
            .request(app)
            .post('/user')
            .send(
                {
                    Username: 'Luke',
                    Password: 'Skywalker',
                },
            );

        expect(response.status).to.equal(201);
        expect(response.body).to.
            deep.equal({ message: 'Usuario cadastradao com sucesso com o id 42' });
    });

    it('Testando a listagem de todas os usuarios', async function () {
        sinon.stub(connection, 'execute').resolves([userList]);
        const response = await chai
            .request(app)
            .get('/user');

        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal(userList);
    });

    it('Testando a listagem do usuario com id 1', async function () {
        sinon.stub(connection, 'execute').resolves([[userList[0]]]);
        const response = await chai
            .request(app)
            .get('/user/1');

        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal(userList[0]);
    });

    it('Testando a alteração de um usuario com o id 1', async function () {
        sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
        const response = await chai
            .request(app)
            .put('/user/1')
            .send(
                {
                    Username: 'Lucão',
                    Password: 'Andarilho dos céus',
                },
            );

        expect(response.status).to.equal(200);
        expect(response.body).to
            .deep.equal({ message: 'Usuario de id 1 atualizado com sucesso' });
    });

    it('Testando a exclusão do usuario com id 1', async function () {
        sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
        const response = await chai
            .request(app)
            .delete('/user/1');

        expect(response.status).to.equal(200);
        expect(response.body).to
            .deep.equal({ message: 'Usuario de id 1 excluído com sucesso' });
    });

    afterEach(sinon.restore);
});