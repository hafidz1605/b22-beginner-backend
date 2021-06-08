const db = require('../helpers/db')

exports.getCategory = (cb) => {
  db.query(`
SELECT Name
FROM category
WHERE Rgt = Lft + 1
  `, cb)
}

exports.getSpecificCategory = (mainCategory, cb) => {
  db.query(`
  SELECT parent.name
FROM category AS node,
category AS parent
WHERE parent.lft > node.lft AND parent.rgt < node.rgt 
AND node.name = ?
  `, [mainCategory], cb)
}

exports.getMainCategory = (cb) => {
  db.query(`
  SELECT Name
  FROM category where depth=1
  `, cb)
}

exports.createCategory = (data, cb) => {
  db.query(`
INSERT INTO category (Name,depth) 
VALUES('${data.Name}',1);
`, cb)
}

//   db.query(`
//   INSERT INTO category(name, lft, rgt,depth) VALUES('${data.Name}', ${rgt} + 1, ${rgt} + 2,1);
// `, cb)

exports.createRgt = (rgt, cb) => {
  db.query(`
  UPDATE category SET rgt = rgt + 2 WHERE rgt > ${rgt}
  `, cb)
}

exports.createLft = (rgt, cb) => {
  db.query(`
  UPDATE category SET Lft = rgt + 2 WHERE rgt > ${rgt}
  `, cb)
}
exports.getCategoryById = (id, cb) => {
  db.query(`
  SELECT category.id, category.Name 
  FROM CATEGORY
  WHERE category.id=?
  `, [id], cb)
}

exports.updateCategory = (data, cb) => {
  db.query(`
  UPDATE ?? SET Name=?, updated_at=? WHERE id = ?
  `, ['category', data.Name, data.updated_at, data.id], cb)
}

exports.deleteCategory = (id, cb) => {
  db.query(`
  DELETE FROM ?? WHERE id= ?
  `, ['category', id], cb)
}

// exports.getRgt = (data, cb) => {
//   db.query(`
//   SELECT rgt FROM category Where name=?
//   `, [data.after, cb])
// }
