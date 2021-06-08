const categoryModel = require('../models/category')
const time = require('../helpers/time')

exports.getCategory = (req, res) => {
  const main = req.query.main
  if (main) {
    categoryModel.getSpecificCategory(main, (err, results, _fields) => {
      if (!err && results.length > 0) {
        if (main === 'menu') {
          categoryModel.getMainCategory((err, results, _fields) => {
            if (!err) {
              return res.status(200).json({
                success: true,
                message: 'list of main category',
                results

              })
            }
          })
        } else {
          return res.status(200).json({
            success: true,
            message: `list of ${main} category`,
            results

          })
        }
      } else {
        return res.status(404).json({
          message: `category for ${main} not found`
        })
      }
    })
  } else {
    categoryModel.getCategory((err, results, _fields) => {
      if (!err) {
        return res.status(200).json({
          success: true,
          message: 'list of category',
          results

        })
      } else {
        return res.status(404).json({
          success: false,
          message: 'category not found'
        })
      }
    })
  }
}

exports.createCategory = (req, res) => {
  categoryModel.createCategory(req.body, () => {
    return res.json({
      sucess: true,
      message: 'Category created'

    })
  })
}

exports.updateCategory = (req, res) => {
  const { id } = req.params

  categoryModel.getCategoryById(id, (err, results, _fields) => {
    console.log(err)
    if (!err) {
      if (results.length > 0) {
        const { Name } = req.body
        const updateData = { id, Name, updated_at: time.now() }
        categoryModel.updateCategory(updateData, (err, results, _fields) => {
          if (!err) {
            return res.status(200).json({
              success: true,
              message: 'category updated'
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
          message: 'category not found'
        })
      }
    }
  }
  )
}

exports.deleteCategory = (req, res) => {
  const { id } = req.params
  categoryModel.getCategoryById(id, (err, results, _fields) => {
    if (!err) {
      if (results.length > 0) {
        categoryModel.deleteCategory(id, (err, results, _fields) => {
          if (!err) {
            return res.status(200).json({
              success: true,
              message: 'category deleted'
            })
          }
        })
      } else {
        return res.status(404).json({
          success: false,
          message: 'category not found'
        })
      }
    }
  })
}
