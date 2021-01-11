const client = require('../client.js');
const isStudentAlsoTeacher = require('../utils/isStudentAlsoTeacher.js');


module.exports = class Teacher {
    id;
    user_name;
    pic_url;
    student_id;
    email;
    account_id;
    access_token;
    permissions;
    account_created;
    timezone;
    last_update;

    constructor(row) {
        this.id = row.id;
        this.user_name = row.user_name;
        this.pic_url = row.pic_url;
        this.student_id = row.student_id;
        this.email = row.email;
        this.account_id = row.account_id;
        this.access_token = row.access_token;
        this.permissions = row.permissions;
        this.account_created = row.account_created;
        this.timezone = row.timezone;
        this.last_update = row.last_update;
    }


    static async insert(newStudentObj) {
        const currentDate = new Date().toISOString();

        const teacherId = await isStudentAlsoTeacher(newStudentInfo.student_id);

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
                newStudentObj.student_id,
                newStudentObj.user_name,
                newStudentObj.pic_url,
                newStudentObj.email,
                newStudentObj.account_id,
                newStudentObj.access_token,
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
        WHERE student_id = $1
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

        return meetingsArray;
    }


}