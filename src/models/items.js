const db = require('../helpers/db')

exports.getItems = (by, order, cb) => {
  db.query(`
  SELECT items.id, items.Name, category.Name as category, items.price, items.created_at, items.updated_at
  FROM items 
  LEFT JOIN category ON items.category_id = category.id
  ORDER BY ${by} ${order}
  `, cb)
}
exports.getItemById = (id, size, cb) => {
  db.query(`
  SELECT items.id, items.Name, category.Name as category, variant.name as size,items.price*variant.value as price, items.created_at, items.updated_at
  FROM items 
  LEFT JOIN category ON items.category_id = category.id
  CROSS JOIN variant
  WHERE items.id=? AND variant.name=?
  `, [id, size], cb)
}
exports.getNameById = (id, cb) => {
  db.query(`
  SELECT Name FROM items 
  
  WHERE id=?
  `, [id], cb)
}

exports.createItem = (data, cb) => {
  db.query(`
  INSERT INTO ?? (??, ??,??)
  VALUE (?, ?,?)
  `, ['items', 'Name', 'price', 'category_id', data.Name, data.price, data.category], cb)
}

exports.patchItem = (data, cb) => {
  const key = Object.keys(data)
  const lastColumn = key[key.length - 1]
  db.query(`
  UPDATE ?? SET ${lastColumn} = ?, updated_at=? WHERE id = ?`
  , ['items', data[lastColumn], data.updated_at, data.id], cb)
}

exports.updateItem = (data, cb) => {
  db.query(`
  UPDATE ?? SET Name=?, price=?, updated_at=? WHERE id = ?
  `, ['items', data.Name, data.price, data.updated_at, data.id], cb)
}

exports.deleteItem = (id, cb) => {
  db.query(`
  DELETE FROM ?? WHERE id= ?
  `, ['items', id], cb)
}

exports.searchItem = (word, by, order, cb) => {
  db.query(`
  SELECT ??, ??, ?? as category, ??, ??, ?? FROM items 
  LEFT JOIN category ON items.category_id = category.id
  WHERE items.Name LIKE '%${word}%'
  ORDER BY ${by} ${order}
  `, ['items.id', 'items.Name', 'category.name', 'items.price', 'items.created_at', 'items.updated_at'], cb)
}
