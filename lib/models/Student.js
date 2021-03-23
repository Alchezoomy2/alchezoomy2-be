const client = require('../client.js');
const isStudentAlsoTeacher = require('../utils/isStudentAlsoTeacher.js');
const Meeting = require('./Meeting.js')


module.exports = class Student {
    id;
    userName;
    picUrl;
    studentId;
    email;
    accountId;
    accessToken;
    accountCreated;
    timezone;
    lastUpdate;

    constructor(row) {
        this.id = row.id;
        this.userName = row.user_name;
        this.picUrl = row.pic_url;
        this.studentId = row.student_id;
        this.email = row.email;
        this.accountId = row.account_id;
        this.accessToken = row.access_token;
        this.accountCreated = row.account_created;
        this.timezone = row.timezone;
        this.lastUpdate = row.last_update;
    }


    static async insert(newStudentObj) {
        const currentDate = new Date().toISOString();

        const teacherId = await isStudentAlsoTeacher(newStudentObj.studentId);

        const { rows } = await client.query(`
        
            INSERT INTO students
            (
                student_id,
                user_name,
                pic_url,
                email,
                account_id,
                access_token,
                account_created,
                last_update,
                timezone
            ) 
            VALUES
            ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *`,
            [
                newStudentObj.studentId,
                newStudentObj.userName,
                newStudentObj.picUrl,
                newStudentObj.email,
                newStudentObj.accountId,
                newStudentObj.accessToken,
                currentDate,
                currentDate,
                newStudentObj.timezone
            ]);

        return new Student(rows[0])
    }

    static async findById(studentId) {

        const currentDate = new Date().toISOString().slice(0, 10);

        const { rows } = await client.query(`
        UPDATE students
        SET last_update = $2
        WHERE id = $1
        RETURNING *`,
            [
                studentId,
                currentDate
            ]);

        return new Student(rows[0])

    }

    static async findAll() {
        const { rows } = await client.querty(`
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