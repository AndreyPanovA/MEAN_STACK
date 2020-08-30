module.exports.login = function (req, res) {
    res.json({
        login: {
            email: req.body.email,
            password: req.body.password
        }
    })
}
module.exports.register = function (req, res) {
    res.send("Register page from controller")
}