const request = require('supertest')
const app = require('../index')

describe('Post Endpoints', () => {
    it('should return a 401 error', async () => {
        const res = await request(app)
            .post('/timetable')
            .send({
                url: "test",
                username: 'test'
            })
        expect(res.statusCode).toEqual(401)
    });
});

describe('Post Endpoints', () => {
    it('should return a 501 error', async () => {
        const res = await request(app)
            .post('/timetable')
            .send({
                url: "test",
                username: 'test',
                password: "test"
            })
        expect(res.statusCode).toEqual(501)
    });
});