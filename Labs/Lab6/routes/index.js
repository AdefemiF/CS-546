const bandRoutes = require("./bands")
const albumRoutes = require("./albums")

const constructor = (app) =>{
    app.use('/bands', bandRoutes)
    app.use('/albums', albumRoutes)
    app.use("*", (req, res) => {
        res.status(404).json({error: 'Not Found'})
    })
}

module.exports = constructor