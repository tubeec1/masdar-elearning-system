const db = require("../dbConnection/databaseConnection");

const createCategory = async (name, description, status ,thumbnail) => {
  const [result] = await db.execute(
    `INSERT INTO categories(name, description, thumbnail,status )
     VALUES(?,?,?,?)`,
    [name, description, thumbnail ,status]
  );

  const [rows] = await db.execute("SELECT * FROM categories where id =?",
    [result.insertId]

  );
return  rows[0];
}

const getAllCategories = async () => {
  const [rows] = await db.execute(
    `SELECT * FROM categories `
  );
  return rows;
};

const getCategoryById = async (id) => {
  const [rows] = await db.execute(
    `SELECT * FROM categories WHERE id = ?`,
    [id]
  );

  return rows[0];
};
const updateCategory = async (id, name, description, thumbnail) => {
  const [result] = await db.execute(
    `UPDATE categories
     SET name=?, description=?, thumbnail=?
     WHERE id=?`,
    [name, description, thumbnail, id]
  );

  return result;
};

const deleteCategory = async (id) => {
  const [result] = await db.execute(
    `DELETE FROM categories WHERE id=?`,
    [id]
  );

  return result;
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};