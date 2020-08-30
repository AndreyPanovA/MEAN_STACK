const {
    Router
} = require("express")
const controller = require("../controllers/analitics")
const router = Router()


router.get("/overview", controller.overview)
router.get("/analitics", controller.analitics)

module.exports = router