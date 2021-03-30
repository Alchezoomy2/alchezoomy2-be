const client = require('../client.js');

module.exports = class Subscription {
    studentId;
    teacherId;
    creationDate;

    constructor(row, teacherId) {
        this.teacherId = row.teacher_id;
        this.studentId = row.student_id;
        this.creationDate = row.creation_date;
    }

    static async insert({ studentEmail, teacherEmail }) {
        console.log("🚀 ~ file: Subscription.js ~ line 15 ~ Subscription ~ insert ~ studentEmail, teacherEmail", studentEmail, teacherEmail)

        const returnedTeacherRaw = await client.query(`
        SELECT id
        FROM teachers
        WHERE email = $1
        `, [teacherEmail]);

        const returnedStudentRaw = await client.query(`
        SELECT id
        FROM students
        WHERE student_email = $1
        `, [studentEmail])
        console.log("🚀 ~ file: Subscription.js ~ line 28 ~ Subscription ~ insert ~ returnedTeacherRaw.rows[0].id", returnedTeacherRaw.rows[0].id)
        console.log("🚀 ~ file: Subscription.js ~ line 28 ~ Subscription ~ insert ~ returnedStudentRaw.rows[0].id", returnedStudentRaw.rows[0].id)



        const returnedTeacherId = returnedTeacherRaw.rows[0].id;
        console.log("🚀 ~ file: Subscription.js ~ line 31 ~ Subscription ~ insert ~ returnedTeacherId", returnedTeacherId)
        const returnedStudentId = returnedStudentRaw.rows[0].id;
        console.log("🚀 ~ file: Subscription.js ~ line 33 ~ Subscription ~ insert ~ returnedStudentId ", returnedStudentId)

        const currentDate = new Date().toISOString().slice(0, 10);
        console.log("🚀 ~ file: Subscription.js ~ line 49 ~ Subscription ~ insert ~ returnedTeacherId, returnedStudentId, currentDate", returnedTeacherId, returnedStudentId, currentDate)

        const { rows } = await client.query(`
            INSERT INTO subscriptions
            (
                teacher_id,
                student_id,
                creation_date
            )
            VALUES ($1, $2, $3)
            RETURNING *
        `, [returnedTeacherId, returnedStudentId, currentDate])

        return returnedStudentId;
    }

    static async findByTeacherId(teacherId) {
        const { rows } = await client.query(`
        SELECT 
            subscriptions.id,
            subscriptions.creation_date,
            students.id AS student_id,
            students.student_email
        FROM subscriptions
            LEFT JOIN students
            ON students.id = subscriptions.student_id
        WHERE teacher_id = $1
        `, [teacherId])

        if (!rows[0]) return [];

        return rows.map(row => {
            return {
                id: row.id,
                studentId: row.student_id,
                studentEmail: row.student_email,
                creationDate: row.creation_date
            }
        })
    }

    static async findByStudentId(studentId) {
        const { rows } = await client.query(`
        SELECT *
        FROM subscriptions
        WHERE student_id = $2
        `, [studentId])

        if (!rows[0]) return [];

        return rows.map(row => new Subscription(row))
    }

    static async deleteSubscription(subscriptionId) {
        const { rows } = await client.query(`
        DELETE FROM subscriptions 
        WHERE id = $1 
        RETURNING *`, [subscriptionId])

        return new Subscription(rows[0])
    }
}
