const itemModel = require('../models/items')
const time = require('../helpers/time')

exports.getItems = (req, res) => {
  const word = req.query.search
  let by = req.query.order.by
  let order = req.query.order.method
  if (!by) {
    by = 'id'
  }
  if (!order) {
    order = 'ASC'
  }

  if (word) {
    itemModel.searchItem(word, by, order, (err, results, _fields) => {
      if (err) throw err
      else if (results.length === 0) {
        return res.json({
          message: 'items not found'
        })
      } else {
        return res.status(200).json({
          sucess: true,
          message: 'Search result',
          results
        })
      }
    })
  } else {
    itemModel.searchItems(word, by, order, (err, results, _fields) => {
      if (!err) {
        return res.status(200).json({
          sucess: true,
          message: 'item list',
          results
        })
      }
    })
  }
}

exports.getDetail = (req, res) => {
  const { id } = req.params
  let size = req.query.size
  if (!size) {
    size = 'Regular'
  }
  itemModel.getItemById(id, size, (err, results, _fields) => {
    if (!err && results.length === 1) {
      return res.status(200).json({
        success: true,
        message: 'item detail',
        results: results[0]
      })
    } else {
      return res.status(404).json({
        success: false,
        message: 'items not found'
      })
    }
  })
}

exports.createItem = (req, res) => {
  itemModel.createItem(req.body, () => {
    return res.json({
      sucess: true,
      message: 'item created'
    })
  })
}

exports.updateItem = (req, res) => {
  const { id } = req.params
  itemModel.getNameById(id, (err, results, _fields) => {
    if (!err) {
      if (results.length > 0) {
        let { Name, price } = req.body
        console.log(Name)
        const updateData = { id, Name, price, updated_at: time.now() }
        price = parseInt(price)
        if (price < 0 || typeof price !== 'number') {
          return res.status(300).json({
            message: 'price shoulde be number and greater than 0'
          })
        } else {
          itemModel.updateItem(updateData, (err, results, _fields) => {
            if (!err) {
              return res.status(200).json({
                success: true,
                message: 'item updated'
              })
            } else {
              return res.status(500).json({
                success: false,
                message: 'server error'
              })
            }
          }
          )
        }
      } else {
        return res.status(404).json({
          success: false,
          message: 'item not found'
        })
      }
    }
  }
  )
}

exports.patchItem = (req, res) => {
  const { id } = req.params
  itemModel.getNameById(id, (err, results, _fields) => {
    if (!err) {
      if (results.length > 0) {
        const key = Object.keys(req.body)
        if (key.length > 1) {
          return res.status(400).json({
            success: false,
            message: 'only need one key'
          })
        } else {
          const firstColumn = key[0]
          const updateData = { id, updated_at: time.now(), [firstColumn]: req.body[firstColumn] }
          itemModel.patchItem(updateData, (err, results, _fields) => {
            if (!err) {
              return res.status(200).json({
                success: true,
                message: 'item updated'
              })
            } else {
              console.log(err)
              return res.status(500).json({
                success: false,
                message: 'server error '
              })
            }
          })
        }
      } else {
        return res.status(404).json({
          success: false,
          message: 'items not found'
        })
      }
    }
  })
}

exports.deleteItem = (req, res) => {
  const { id } = req.params
  itemModel.getNameById(id, (err, results, _fields) => {
    if (!err) {
      if (results.length > 0) {
        itemModel.deleteItem(id, (err, results, _fields) => {
          if (!err) {
            return res.status(200).json({
              success: true,
              message: 'item deleted'
            })
          }
        })
      } else {
        return res.status(404).json({
          success: false,
          message: 'items not found'
        })
      }
    }
  })
}
