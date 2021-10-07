const request= require('supertest');
const app =require('../app');
const bcrypt= require('bcryptjs');
const {sequelize,user}= require('../models')


describe('sigin example',()=>{
    beforeAll(async()=>{
        await user.destroy({
            truncate:true
        })
        // await sequelize.authenticate();
        // console.log('Database connected!');
        
    })
    test('Should Sign in',(done)=>{
        request(app)
        .post('/user/register')
        .expect("Content-Type",/json/)
        .send({
            username:'test1',
            password: "password"
        })
        .expect(201)
        .expect('"test1"')
         .end(async(err,res)=>{
            if(err) return await done(err);
            return await done();
         })
    })

    test('should fail sign in ---> password is invalid',(done)=>{
        request(app)
        .post('/user/register')
        .expect("Content-Type",/json/)
        .send({
            username:'test1',
            password: 12345
        })
        .expect(401)
        .expect('"password is invalid"')
         .end(async(err,res)=>{
            if(err) return await done(err);
            return await done();
         })
    })

    test('should fail sign in  ---> password is short',(done)=>{
        request(app)
        .post('/user/register')
        .expect("Content-Type",/json/)
        .send({
            username:'test1',
            password: 'pass'
        })
        .expect(401)
        .expect('"password should contains atleast 5 characters"')
         .end(async(err,res)=>{
            if(err) return await done(err);
            return await done();
         })
    })

    test('should fail sign in ---> username already exist',(done)=>{
        request(app)
        .post('/user/register')
        .expect("Content-Type",/json/)
        .send({
            username:'test1',
            password: 'password'
        })
        .expect(403)
        .expect('"Username is already existed"')
         .end(async(err,res)=>{
            if(err) return await done(err);
            return await done();
         })
    })
})

describe('Login example',()=>{
    test('should login ',(done)=>{
        request(app)
        .post('/user/login')
        .expect("Content-Type",/json/)
        .send({
            username:'test1',
            password: 'password'
        })
        .expect(201)
        .expect('"Login accessed"')
         .end(async(err,res)=>{
            if(err) return await done(err);
            return await done();
         })
    })

    test('should not login',(done)=>{
        request(app)
        .post('/user/login')
        .expect("Content-Type",/json/)
        .send({
            username:'test2',
            password: 'passwod'
        })
        .expect(401)
        .expect('"Login credentials is invalid"')
         .end(async(err,res)=>{
            if(err) return await done(err);
            return await done();
         })
    })
})
