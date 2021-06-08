const db = require('../helpers/db')

exports.getVariant = (cb) => {
  db.query(`
SELECT Name, value
FROM variant
  `, cb)
}

exports.createVar = (data, cb) => {
  db.query(`
INSERT INTO variant (Name, value) 
VALUES('${data.Name}',${data.value});
`, cb)
}

exports.getVariantById = (id, cb) => {
  db.query(`
  SELECT variant.id, variant.Name , variant.value
  FROM variant
  WHERE variant.id=?
  `, [id], cb)
}

exports.updateVariant = (data, cb) => {
  db.query(`
  UPDATE ?? SET Name=?,Value=?, updated_at=? WHERE id = ?
  `, ['variant', data.Name, data.value, data.updated_at, data.id], cb)
}

exports.deleteVariant = (id, cb) => {
  db.query(`
  DELETE FROM ?? WHERE id= ?
  `, ['variant', id], cb)
}
