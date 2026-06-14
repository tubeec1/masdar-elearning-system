const db = require("../dbConnection/databaseConnection");

const createCourse = async (
  categoryId,
  teacherId,
  title,
  slug,
  description,
  thumbnail,
  introVideo,
  duration,
  language,
  level,
  price,
  totalStudents,
  status
) => {
  const [result] = await db.execute(
    `
    INSERT INTO courses
    (
      categoryId,
      teacherId,
      title,
      slug,
      description,
      thumbnail,
      introVideo,
      duration,
      language,
      level,
      price,
      totalStudents,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      categoryId,
      teacherId,
      title,
      slug,
      description,
      thumbnail,
      introVideo,
      duration,
      language,
      level,
      price,
      totalStudents,
      status,
    ]
  );

  const [rows] = await db.execute(
    "SELECT * FROM courses WHERE id=?",
    [result.insertId]
  );

  return rows[0];
};


const getAllCourses = async () => {
  const [rows] = await db.execute(`
    SELECT
      c.id,
      c.title,
      c.slug,
      c.description,
      c.thumbnail,
      c.introVideo,
      c.duration,
      c.language,
      c.level,
      c.price,
      c.totalStudents,
      c.status,
      cat.name AS categoryName,
     u.fullName AS teacherName
    FROM courses c
    JOIN categories cat ON c.categoryId = cat.id
    JOIN users u ON c.teacherId = u.id
  `);

  return rows;
};
const getCourseById = async (id) => {
  const [rows] = await db.execute(
    `
    SELECT
      c.id,
      c.title,
      c.slug,
      c.description,
      c.thumbnail,
      c.introVideo,
      c.duration,
      c.language,
      c.level,
      c.price,
      c.totalStudents,
      c.status,
      cat.name AS categoryName,
       u.fullName AS teacherName
    FROM courses c
    JOIN categories cat ON c.categoryId = cat.id
    JOIN users u ON c.teacherId = u.id
    WHERE c.id = ?
    `,
    [id]
  );

  return rows[0];
};

const updateCourse = async (
  id,
  categoryId,
  teacherId,
  title,
  slug,
  description,
  thumbnail,
  introVideo,
  duration,
  language,
  level,
  price,
  totalStudents,
  status
) => {
  const [result] = await db.execute(
    `
    UPDATE courses
    SET
      categoryId=?,
      teacherId=?,
      title=?,
      slug=?,
      description=?,
      thumbnail=?,
      introVideo=?,
      duration=?,
      language=?,
      level=?,
      price=?,
      totalStudents=?,
      status=?
    WHERE id=?
    `,
    [
      categoryId,
      teacherId,
      title,
      slug,
      description,
      thumbnail,
      introVideo,
      duration,
      language,
      level,
      price,
      totalStudents,
      status,
      id,
    ]
  );

  return result;
};

const deleteCourse = async (id) => {
  const [result] = await db.execute(
    "DELETE FROM courses WHERE id=?",
    [id]
  );

  return result;
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};