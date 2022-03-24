const { app } = require('./app')
const { sequelize } = require('./util/database')

sequelize
    .authenticate()
    .then(() => console.log('Database authenticaded'))
    .catch((err) => console.log(err));

sequelize
    .sync()
    .then(() => console.log('Database synced'))
    .catch(err => console.log(err))
    

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Express app running on port ${PORT}`)
})