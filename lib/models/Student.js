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
    permissions;
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
        this.permissions = row.permissions;
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
                permissions,
                account_created,
                last_update,
                timezone
            ) 
            VALUES
            ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *`,
            [
                newStudentObj.studentId,
                newStudentObj.userName,
                newStudentObj.picUrl,
                newStudentObj.email,
                newStudentObj.accountId,
                newStudentObj.accessToken,
                teacherId,
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

    static async meetingArray(permissions) {
        let meetingsArray = [];

        for (let teacherId of permissions) {
            const returnedMeetingsObj = await client.query(`
            SELECT *
            FROM meetings
            WHERE teacher_id = $1
            AND published = true
            ORDER BY start_time DESC
            `, [teacherId]);

            meetingsArray.push(...returnedMeetingsObj.rows);
        }

        return meetingsArray.map(meeting => new Meeting(meeting));
    }

    static async addPermission({ student, teacher }) {

        const returnedTeacherRaw = await client.query(`
        SELECT id
        FROM teachers
        WHERE email = $1
        `, [teacher]);

        const returnedTeacherId = returnedTeacherRaw.rows[0].id;

        const currentPermissionsRaw = await client.query(`
        SELECT permissions
        FROM students
        WHERE email = $1
        `, [student]);

        const permissions = currentPermissionsRaw.rows[0].permissions;


        if (returnedTeacherId) {

            if (!permissions.includes(returnedTeacherId))
                permissions.push(returnedTeacherId)

            const returnedMeetingArray = await client.query(`
            UPDATE students
            SET permissions = ARRAY[$1]
            WHERE email=$2
            RETURNING *
            `, [permissions, student])

            return returnedMeetingArray.rows[0];
        }

        return "error, adding permissions"
    }

}