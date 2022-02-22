const peopleRoutes = require("./people")
const workRoutes = require("./work")

const constructor = (app) =>{
    app.use('/people', peopleRoutes)
    app.use('/work', workRoutes)
    app.use("*", (req, res) => {
        res.status(404).json({error: 'Not Found'})
    })
}

module.exports = constructor