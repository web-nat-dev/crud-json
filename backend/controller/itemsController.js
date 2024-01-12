const asyncHandler = require('express-async-handler')
const path = require('path')
const fs = require('fs')



const jsonfile = path.join(__dirname, '../data/items.json')



const readFile = () => {
  try {
    const data = fs.readFileSync(jsonfile,
      {
        encoding: 'utf8',
        flag: 'r'
      })

    return JSON.parse(data)
  } catch (err) {
    console.log(err)
    return false
  }
}

const saveFile = (data) => {
  try {
    fs.writeFileSync(jsonfile, JSON.stringify(data),
      {
        encoding: 'utf8',
        flag: 'w'
      })

    return true
  } catch (err) {
    console.log(err)
    return false
  }
}



const getItems = asyncHandler(async (req, res) => {
  try {
    const items = readFile()

    if (!items) {
      res.status(500).json({
        success: false,
        message: 'Failed to read file.',
        error: 'ERR_READ_FILE'
      })
    } else {
      res.status(200).json({
        success: true,
        message: 'File read successfully.',
        data: items
      })
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
      message: err?.message
    })
  }
})

const addItem = asyncHandler(async (req, res) => {
  try {
    const { id, name } = req.body

    if (!id || !name) {
      res.status(400).json({
        success: false,
        message: 'Required fields are missing values.',
        error: 'ERR_REQUIRED_FIELDS'
      })
    }

    const old_items = readFile()
    const newId = parseInt(id)

    if (!old_items) {
      res.status(500).json({
        success: false,
        message: 'Failed to read file.',
        error: 'ERR_READ_FILE'
      })
    } else {
      const duplicates = old_items.filter(item => item.id === newId)
      if (duplicates.length > 0) {
        res.status(400).json({
          success: false,
          message: 'Item ID already exists.',
          error: 'ERR_ID_EXISTS'
        })
      } else {
        const new_array = [...old_items, { id: newId, name }]
        const isSaved = saveFile(new_array)

        if (isSaved) {
          res.status(200).json({
            success: true,
            message: 'File saved successfully.',
            data: new_array
          })
        } else {
          res.status(500).json({
            success: false,
            message: 'Failed to save file.',
            error: 'ERR_SAVE_FILE'
          })
        }
      }
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
      message: err?.message
    })
  }
})

const editItem = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params

    if (!id) {
      res.status(400).json({
        success: false,
        error: 'Failed to update item.',
        message: 'Item ID is required.'
      })
    }

    if (!req.body.id || !req.body.name) {
      res.status(400).json({
        success: false,
        message: 'Required fields are missing values.',
        error: 'ERR_REQUIRED_FIELDS'
      })
    }

    const newId = parseInt(id)

    let items = readFile()

    if (!items) {
      res.status(500).json({
        success: false,
        message: 'Failed to read file.',
        error: 'ERR_FILE_READ'
      })
    } else {
      if (items.filter(item => item.id === newId).length === 1) {
        let x

        items.forEach((row, index) => {
          if (row.id === newId) {
            x = index
          }
        })

        items[x] = { id: newId, name: req.body.name }

        const isSaved = saveFile(items)

        if (isSaved) {
          res.status(200).json({
            success: true,
            message: 'File saved successfully.',
            data: items
          })
        } else {
          res.status(500).json({
            success: false,
            message: 'Failed to save file.',
            error: 'ERR_SAVE_FILE'
          })
        }
      } else {
        res.status(500).json({
          success: false,
          message: 'Item ID not found or has duplicates.',
          error: 'ERR_ID_NOT_FOUND'
        })
      }
      // items = items.filter(item => item.id.toString() !== id)

      // const result = saveFile(items)

      // if (result) {
      //   res.status(200).json({
      //     success: true,
      //     message: 'File written successfully.',
      //     data: items
      //   })
      // } else {
      //   res.status(500).json({
      //     success: false,
      //     message: 'Failed to save changes to the file.',
      //     error: 'ERR_SAVE_FILE'
      //   })
      // }
    }

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
      message: err?.message
    })
  }
})

const deleteItem = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params

    if (!id) {
      res.status(400).json({
        success: false,
        error: 'Failed to delete item.',
        message: 'Item ID is required.'
      })
    }

    let items = readFile()

    if (!items) {
      res.status(500).json({
        success: false,
        message: items.message,
        error: items.error
      })
    } else {
      items = items.filter(item => item.id.toString() !== id)

      const result = saveFile(items)

      if (result) {
        res.status(200).json({
          success: true,
          message: 'File written successfully.',
          data: items
        })
      } else {
        res.status(500).json({
          success: false,
          message: 'Failed to save changes to the file.',
          error: 'ERR_SAVE_FILE'
        })
      }
    }

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
      message: err?.message
    })
  }
})



module.exports = {
  getItems,
  addItem,
  editItem,
  deleteItem
}