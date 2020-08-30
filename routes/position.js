const {
    Router
} = require("express")
const controller = require("../controllers/position")
const router = Router()


router.get('/:categoryId', controller.getByCategoryId)
router.post('/', controller.create)
router.patch('/:id', controller.update)
router.delete('/:id', controller.remove)

module.exports = router