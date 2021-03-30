const client = require('../client.js');
const Meeting = require('./Meeting.js')
const bcrypt = require('bcryptjs');
const Subscription = require('./Subscription')

const saltRounds = process.env.SALT_ROUNDS;


module.exports = class Student {
    id;
    studentEmail;

    constructor(row) {
        console.log("🚀 ~ file: Student.js ~ line 15 ~ Student ~ constructor ~ row", row)
        this.id = row.id;
        this.studentEmail = row.student_email
    }


    static async insert({ studentEmail, teacherEmail, password }) {
        const passwordHash = await bcrypt.hash(password, Number(saltRounds));

        const { rows } = await client.query(`
            INSERT INTO students
            (
                student_email,
                password_hash
            ) 
            VALUES ($1, $2)
            RETURNING *`,
            [studentEmail, passwordHash])


        await Subscription.insert({ studentEmail, teacherEmail })
        return newStudent(rows[0])

    }

    // static async insert(newStudentObj) {
    //     const currentDate = new Date().toISOString();

    //     const teacherId = await isStudentAlsoTeacher(newStudentObj.studentId);

    //     const { rows } = await client.query(`

    //         INSERT INTO students
    //         (
    //             student_id,
    //             user_name,
    //             pic_url,
    //             email,
    //             account_id,
    //             access_token,
    //             account_created,
    //             last_update,
    //             timezone
    //         ) 
    //         VALUES
    //         ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    //         RETURNING *`,
    //         [
    //             newStudentObj.studentId,
    //             newStudentObj.userName,
    //             newStudentObj.picUrl,
    //             newStudentObj.email,
    //             newStudentObj.accountId,
    //             newStudentObj.accessToken,
    //             currentDate,
    //             currentDate,
    //             newStudentObj.timezone
    //         ]);

    //     return new Student(rows[0])
    // }

    static async login(studentEmail, password) {

        const { rows } = await client.query(`
        SELECT *
        FROM students
        WHERE student_email = $1
        `, [studentEmail])

        const passwordsMatch = await bcrypt.compare(password, rows[0].password_hash);

        if (passwordsMatch) {
            console.log('passwords match')
            return new Student(rows[0]);
        }
        return null;

    }

    static async findById(studentId) {

        const { rows } = await client.query(`
            SELECT * 
            FROM students
            WHERE id = $1`,
            [
                studentId,
            ]);

        return new Student(rows[0])

    }

    static async findByEmail(studentEmail) {
        const { rows } = await client.query(`
            SELECT *
            FROM students
            WHERE student_email = $1
            `, [studentEmail]
        )
        console.log("🚀 ~ file: Student.js ~ line 110 ~ Student ~ findByEmail ~ rows", rows)

        if (!rows[0]) return null;

        return new Student(rows[0])
    }

    static async findAll() {
        const { rows } = await client.query(`
        SELECT * 
        FROM students
        ORDER BY id
        `)
        if (!rows[0]) return [];

        return rows.map(row => new Student(row))
    }

    static async meetingArray(studentId) {

        const { rows } = await client.query(`
            SELECT meetings.*
            FROM meetings
            LEFT JOIN subscriptions 
                ON subscriptions.teacher_id = meetings.teacher_id
            WHERE subscriptions.student_id = $1
            AND published = true
            ORDER BY start_time DESC
            `, [studentId]);

        return rows.map(meeting => new Meeting(meeting));
    }

    static async delete(id) {

        const { rows } = await client.query(`
        DELETE FROM students
        WHERE id = $1
        RETURNING *
        `, [id])

        if (rows.length === 0) return null
        return new Student(rows[0])
    }
}
