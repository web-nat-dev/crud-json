const express = require('express')
const router = express.Router()

const { getItems, addItem, editItem, deleteItem } = require('../controller/itemsController')

router.route('/').get(getItems).post(addItem)
router.route('/:id').put(editItem).delete(deleteItem)

module.exports = router