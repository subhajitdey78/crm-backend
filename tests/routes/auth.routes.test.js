const request = require('supertest')
const app = require("../../app")
const db = require("../db")

beforeAll(async () => await db.clearDataBase())
afterAll(async () => {
    await db.closeDatabase()
    app.close()
})

const api_endpoint = '/crm/api/'

const testPlayload ={
    userType:"CUSTOMER",
    password:"12345678",
    name: "Test",
    userId: 2,
    email: "test@relevel.com",
    userStatus: "PENDING",
    ticketsCreated: [],
    ticketsAssigned: []
}

describe("Post signup endpoint", () => {
    it('should signUp', async () => {
        const res = await request(app)
        .post(api_endpoint + 'auth/signup')
        .send(testPlayload)
    expect(res.statusCode).toEqual(201)
    expect(res.body).toEqual(
        expect.objectContaining({
            'email': 'test@relevel.com',
            'name': "Test",
            'userId': '2',
            'userStatus': 'APPROVED',
            'userType': 'CUSTOMER'
        })
     )   
    })
})

describe("Post signin endpoint", () => {
    it('should signin', async () => {
        console.log(app)
        const res = await request(app)
        .post(api_endpoint + 'auth/signin')
        .send(testPlayload)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(
        expect.objectContaining({
            'email': 'test@relevel.com',
            'name': "Test",
            'userId': '2',
            'userStatus': 'APPROVED',
            'userType': 'CUSTOMER'
        })
     )   
    })
})