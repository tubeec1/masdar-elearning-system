const con = require("../dbConnection/databaseConnection");

let createEnrollment = async (studentId, courseId) => {
  const [result] = await con.execute(
    `INSERT INTO enrollments
     (studentId, courseId, status)
     VALUES (?, ?, ?)`,
    [studentId, courseId, "pending"],
  );

  return result;
};

let getMyCourses = async (studentId) => {
  const [rows] = await con.execute(
    `SELECT *
     FROM enrollments
     WHERE studentId = ?
     AND status = 'approved'`,
    [studentId],
  );

  return rows;
};

let getPendingEnrollments = async () => {
  const [rows] = await con.execute(
    `SELECT *
     FROM enrollments
     WHERE status = 'pending'`,
  );

  return rows;
};

let updateEnrollmentStatus = async (
  enrollmentId,
  status,
  adminId,
) => {
  const [result] = await con.execute(
    `UPDATE enrollments
     SET status = ?,
         approvedBy = ?,
         approvedAt = NOW()
     WHERE id = ?`,
    [status, adminId, enrollmentId],
  );

  return result;
};

module.exports = {
  createEnrollment,
  getMyCourses,
  getPendingEnrollments,
  updateEnrollmentStatus,
};