const supertest = require('supertest')

const server = require('./server')

const db = require('../database/dbConfig')


describe('server operations', () => {

    describe('POST /api/auth/register', () => { 


        it('should return HTTP status code 201 when passed correct data', async () => {
            return supertest(server)
                .post('/api/auth/register')
                .send({ username: 'tahilybperez', password: 'pass' })
                .then(res => {
                    
                    expect(res.status).toBe(201)
                })
        })

        it('should insert new user into the database', () => {

            return supertest(server)
                .post('/api/auth/register')
                .send({ username: 'johndoey', password: 'pass' })
                .then(res => {
                    console.log(res.body)
                    expect(res.body.data.username).toBe('johndoey') 
                })
        })

    })


    describe('POST /api/auth/login', () => { 


        it('should return HTTP status code 200 when passed correct data', () => {
            return supertest(server)
                .post('/api/auth/login')
                .send({ username: 'iselawilson', password: 'pass' })
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })

        it('should return HTTP status code 401 when passed incorrect data', async () => {

            return supertest(server)
                .post('/api/auth/login')
                .send({ username: 'iselawilson', password: 'passs' })
                .then(res => {
                    expect(res.status).toBe(401)
                })
        })

    })


    describe('GET /api/jokes', () => { 

        let token;

        beforeAll((done) => {
          supertest(server)
            .post('/api/auth/login')
            .send({
              username: 'iselawilson',
              password: 'pass',
            })
            .end((err, response) => {
                // console.log(response)
              token = response.body.token; 
              done();
            });
        });

        it('should require return 401 because no authorization present', () => {
            return supertest(server)
                .get('/api/jokes')
                .then(res => {
                     expect(res.status).toBe(401)
                })
        })

        it('should return status code 200 - OK, when uses credentials', () => {

            return supertest(server)
            
                .get('/api/jokes')
                .set('Authorization', token) 
                .then(res => {
                 expect(res.status).toBe(200)
                })
                
        })
    
    })

})