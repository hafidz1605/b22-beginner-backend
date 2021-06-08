const variantModel = require('../models/variant')
const time = require('../helpers/time')

exports.getVariant = (req, res) => {
  variantModel.getVariant((err, results, _fields) => {
    if (!err) {
      return res.status(200).json({
        success: true,
        message: 'list of variant',
        results

      })
    } else {
      return res.status(404).json({
        success: false,
        message: 'variant not found'
      })
    }
  })
}

exports.createVariant = (req, res) => {
  variantModel.createVar(req.body, () => {
    return res.json({
      sucess: true,
      message: 'item created'
    })
  })
}

exports.updateVariant = (req, res) => {
  const { id } = req.params

  variantModel.getVariantById(id, (err, results, _fields) => {
    if (!err) {
      if (results.length > 0) {
        const { Name, value } = req.body
        const updateData = { id, Name, value, updated_at: time.now() }
        variantModel.updateVariant(updateData, (err, results, _fields) => {
          if (!err) {
            return res.status(200).json({
              success: true,
              message: 'variant updated'
            })
          } else {
            return res.status(500).json({
              success: false,
              message: 'server error'
            })
          }
        }
        )
      } else {
        return res.status(404).json({
          success: false,
          message: 'variant not found'
        })
      }
    }
  }
  )
}

exports.deleteVariant = (req, res) => {
  const { id } = req.params
  variantModel.getVariantById(id, (err, results, _fields) => {
    if (!err) {
      if (results.length > 0) {
        variantModel.deleteVariant(id, (err, results, _fields) => {
          if (!err) {
            return res.status(200).json({
              success: true,
              message: 'variant deleted'
            })
          }
        })
      } else {
        return res.status(404).json({
          success: false,
          message: 'variant not found'
        })
      }
    }
  })
}
