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
        this.user_name = row.user_name;
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

    static async meetingArray(studentId) {
        console.log(studentId)
        const { rows } = await client.query(`
            SELECT meetings.*
            FROM meetings
            LEFT JOIN subscriptions 
                ON subscriptions.teacher_id = meetings.teacher_id
            WHERE subscriptions.student_id = $1
            AND published = true
            `, [studentId]);

        console.log(rows)

        return rows.map(meeting => new Meeting(meeting));
    }

    // static async addPermission() {

    //     const returnedTeacherRaw = await client.query(`
    //     SELECT id
    //     FROM teachers
    //     WHERE email = $1
    //     `, [teacher]);

    //     const returnedTeacherId = returnedTeacherRaw.rows[0].id;

    //     const returnedPermissionsRaw = await client.query(`
    //     SELECT permissions
    //     FROM students
    //     WHERE email = $1
    //     `, [student]);

    //     const permissions = returnedPermissionsRaw.rows[0].permissions;
    //     console.log(permissions)
    //     if (!permissions.includes(returnedTeacherId) && returnedTeacherId) {
    //         console.log(returnedTeacherId)
    //         const returnedMeetingArray = await client.query(`
    //         UPDATE students
    //         SET permissions = array_append(permissions, $1)
    //         WHERE email=$2
    //         RETURNING *
    //         `, [returnedTeacherId, student])

    //         return returnedMeetingArray.rows[0].permissions;
    //     }

    //     return permissions
    // }

}