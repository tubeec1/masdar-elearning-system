

const db = require("../dbConnection/databaseConnection");


const createModule = async (
  courseId,
  title,
  description,
  moduleOrder
) => {
  const [result] = await db.execute(
    `
    INSERT INTO modules
    (courseId, title, description, moduleOrder)
    VALUES (?, ?, ?, ?)
    `,
    [courseId, title, description, moduleOrder]
  );

  const [rows] = await db.execute(
    "SELECT * FROM modules WHERE id = ?",
    [result.insertId]
  );

  return rows[0];
};
const getAllModules = async () => {
  const [rows] = await db.execute(`
    SELECT
      m.id,
      c.title AS courseName,
      m.title,
      m.description,
      m.moduleOrder
    FROM modules m
    INNER JOIN courses c
      ON m.courseId = c.id
    ORDER BY m.moduleOrder ASC
  `);

  return rows;
};

const getModulesByid = async (id) => {
  const [rows] = await db.execute(
    `
    SELECT
      m.id,
      m.courseId,
      c.title AS courseName,
      m.title,
      m.description,
      m.moduleOrder
    FROM modules m
    INNER JOIN courses c
      ON m.courseId = c.id
    WHERE m.id = ?
    `,
    [id]
  );

  return rows;
};


const updateModule = async (
  id,
  title,
  description,
  moduleOrder
) => {
  const [result] = await db.execute(
    `
    UPDATE modules
    SET title = ?, description = ?, moduleOrder = ?
    WHERE id = ?
    `,
    [title, description, moduleOrder, id]
  );

  return result;
};


const deleteModule = async (id) => {
  const [result] = await db.execute(
    "DELETE FROM modules WHERE id = ?",
    [id]
  );

  return result;
};

module.exports = {
  createModule,
  getModulesByid,
  getAllModules,
  updateModule,
  deleteModule,
};