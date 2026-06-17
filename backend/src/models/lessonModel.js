const db = require("../dbConnection/databaseConnection");


const createLesson = async (
  moduleId,
  title,
  description,
  videoUrl,
  duration,
  lessonOrder
) => {
  const [result] = await db.execute(
    `
    INSERT INTO lessons
    (moduleId, title, description, videoUrl, duration, lessonOrder)
    VALUES (?, ?, ?, ?, ?, ?)
    `,
    [moduleId, title, description, videoUrl, duration, lessonOrder]
  );

  const [rows] = await db.execute(
    "SELECT * FROM lessons WHERE id = ?",
    [result.insertId]
  );

  return rows[0];
};


const getLessonsByModule = async (moduleId) => {
  const [rows] = await db.execute(
    `
    SELECT * FROM lessons
    WHERE moduleId = ?
    ORDER BY lessonOrder ASC
    `,
    [moduleId]
  );

  return rows;
};


const getAllLessons = async () => {
  const [rows] = await db.execute(`
    SELECT
      l.id,
      m.title AS moduleName,
      l.title,
      l.description,
      l.videoUrl,
      l.duration,
      l.lessonOrder,
      l.createdAt
    FROM lessons l
    INNER JOIN modules m
      ON l.moduleId = m.id
    ORDER BY l.lessonOrder ASC
  `);

  return rows;
};




const getLessonById = async (id) => {
  const [rows] = await db.execute(
    `
    SELECT
      l.id,
      m.title AS moduleName,
      l.title,
      l.description,
      l.videoUrl,
      l.duration,
      l.lessonOrder,
      l.createdAt
    FROM lessons l
    INNER JOIN modules m
      ON l.moduleId = m.id
    WHERE l.id = ?
    `,
    [id]
  );

  return rows[0];
};


const updateLesson = async (
  id,
  title,
  description,
  videoUrl,
  duration,
  lessonOrder
) => {
  const [result] = await db.execute(
    `
    UPDATE lessons
    SET title = ?, description = ?, videoUrl = ?, duration = ?, lessonOrder = ?
    WHERE id = ?
    `,
    [title, description, videoUrl, duration, lessonOrder, id]
  );

  return result;
};


const deleteLesson = async (id) => {
  const [result] = await db.execute(
    "DELETE FROM lessons WHERE id = ?",
    [id]
  );

  return result;
};

module.exports = {
  createLesson,
  getAllLessons,
  getLessonsByModule,
  getLessonById,
  updateLesson,
  deleteLesson,
};