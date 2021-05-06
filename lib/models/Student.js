const client = require('../client.js');
const Meeting = require('./Meeting.js')
const bcrypt = require('bcryptjs');
const Subscription = require('./Subscription')

const saltRounds = process.env.SALT_ROUNDS;


module.exports = class Student {
    id;
    studentEmail;
    firstName;

    constructor(row) {
        this.id = row.id;
        this.studentEmail = row.student_email;
        this.firstName = row.first_name;
    }


    static async insert({ studentEmail, teacherEmail, password, firstName }) {
        const passwordHash = await bcrypt.hash(password, Number(saltRounds));

        const { rows } = await client.query(`
            INSERT INTO students
            (
                first_name,
                student_email,
                password_hash
            ) 
            VALUES ($1, $2, $3)
            RETURNING *`,
            [firstName, studentEmail, passwordHash])


        await Subscription.insert({ studentEmail, teacherEmail })
        return new Student(rows[0])

    }


    static async login(studentEmail, password) {

        const { rows } = await client.query(`
        SELECT *
        FROM students
        WHERE student_email = $1
        `, [studentEmail])

        if (!!rows[0]) {

            const passwordsMatch = await bcrypt.compare(password, rows[0].password_hash);

            if (passwordsMatch) {
                return new Student(rows[0]);
            }
        }
        throw "Incorrect Username or Password";

    }

    static async changePassword(studentId, { oldPassword, newPassword1 }) {
        const { rows } = await client.query(`
        SELECT *
        FROM students
        WHERE id = $1
        `, [studentId])

        if (!!rows[0]) {
            const passwordsMatch = await bcrypt.compare(oldPassword, rows[0].password_hash);

            if (passwordsMatch) {
                const newPasswordHash = await bcrypt.hash(newPassword1, Number(saltRounds));

                const { rows } = await client.query(`
                UPDATE students
                SET password_hash = $1
                WHERE id = $2
                RETURNING *
                `, [newPasswordHash, studentId])
                if (!!rows[0]) {
                    return new Student(rows[0]);
                }
            }
            return { message: "Invalid password" }
        }

        return { message: "Invalid user" }
    }

    static async changeFirstName(studentId, { newFirstName }) {

        const { rows } = await client.query(`
        UPDATE students
        SET first_name = $1
        WHERE id = $2
        RETURNING *
        `, [newFirstName, studentId])

        if (!!rows[0]) {
            return new Student(rows[0]);
        }
        return { message: "Student not found" }
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
        SELECT 
        meetings.id,
        meetings.topic,
        meetings.display_time,
        meetings.start_time,
        meetings.duration,
        meetings.share_url,
        meetings.video_url,
        meetings.audio_url,
        meetings.transcript_url,
        meetings.chat_url,
        meetings.meeting_views,
        meetings.meeting_favs,
        teachers.user_name,
        teachers.id AS teacher_id,
        teachers.pic_url,
        teachers.color
        FROM meetings
        LEFT JOIN subscriptions 
            ON subscriptions.teacher_id = meetings.teacher_id
        LEFT JOIN teachers
            ON subscriptions.teacher_id = teachers.id
        WHERE subscriptions.student_id = $1
        AND published = true
        ORDER BY start_time DESC
        
            `, [studentId]);
        return rows.map(meeting => new Meeting(meeting));
    }


    static async adminDelete(studentId) {
        let response = { message: "Student Not Found", success: false }
        const { rows } = await client.query(`
        DELETE FROM students
        WHERE id = $1
        `, [studentId])

        await client.query(`
        DELETE FROM subscriptions 
        WHERE student_id = $1`, [studentId])

        if (!!rows[0]) {
            response = { message: "Student Deleted", success: true }
        }

        return response;
    }
    static async delete(studentId, password) {
        let response = { message: "Student Not Found", success: false }
        const { rows } = await client.query(`
        SELECT *
        FROM students
        WHERE id = $1
        `, [studentId])

        if (!!rows[0]) {
            const passwordsMatch = await bcrypt.compare(password, rows[0].password_hash);

            if (passwordsMatch) {
                await client.query(`
                DELETE FROM students WHERE id = $1`, [studentId]);

                await client.query(`
                DELETE FROM subscriptions WHERE student_id = $1`, [studentId]);

                response = { message: "Student Deleted!", success: true }
            } else {
                response = { message: "Password Not Valid", success: false }
            }
        }
        return response;
    }
}
