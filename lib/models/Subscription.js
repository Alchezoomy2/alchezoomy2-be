const client = require('../client.js');

module.exports = class Subscription {
    studentId;
    teacherId;
    email;

    constructor(row, teacherId) {
        this.teacherId = row.teacher_id;
        this.studentId = row.student_id;
        this.creationDate = row.creation_date;
    }

    static async insert({ studentEmail, teacherEmail }) {

        const returnedTeacherRaw = await client.query(`
        SELECT id
        FROM teachers
        WHERE email = $1
        `, [teacherEmail]);

        const returnedStudentRaw = await client.query(`
        SELECT id
        FROM students
        WHERE email = $1
        `, [studentEmail])


        const returnedTeacherId = returnedTeacherRaw.rows[0].id;
        const returnedStudentId = returnedStudentRaw.rows[0].id
        const currentDate = new Date().toISOString().slice(0, 10);

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
            students.user_name,
            students.email,
            students.pic_url
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
                userName: row.user_name,
                email: row.email,
                picURL: row.pic_url,
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
