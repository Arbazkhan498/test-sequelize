const app = require('./app');
const {sequelize,User}= require('./models');
app.listen({port: 3000},async()=>{
    console.log('Server up at http://localhost:3000/')
    await sequelize.authenticate()
    console.log('Database connected!');

})