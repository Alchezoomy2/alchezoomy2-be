const client = require('../client.js');

module.exports = class Subscription {
    teacherId;
    email;

    constructor(row, teacherId) {
        this.teacherId = Number(teacherId);
        this.studentId = row.id;
        this.email = row.email;
    }

    static async insert({ student, teacher }) {

        const returnedTeacherRaw = await client.query(`
        SELECT id
        FROM teachers
        WHERE email = $1
        `, [teacher]);

        const returnedTeacherId = returnedTeacherRaw.rows[0].id;

        const returnedPermissionsRaw = await client.query(`
        SELECT permissions
        FROM students
        WHERE email = $1
        `, [student]);

        const permissions = returnedPermissionsRaw.rows[0].permissions;

        if (!permissions.includes(returnedTeacherId) && returnedTeacherId) {
            console.log(returnedTeacherId)
            const returnedMeetingArray = await client.query(`
            UPDATE students
            SET permissions = array_append(permissions, $1)
            WHERE email=$2
            RETURNING *
            `, [returnedTeacherId, student])

            return returnedMeetingArray.rows[0].permissions;
        }

        return permissions

    }

    static async findByTeacherId(teacherId) {
        const { rows } = await client.query(`
        SELECT 
        email, 
        id
        FROM students
        WHERE $1 = ANY (permissions)
        `, [teacherId])

        if (!rows[0]) return null;

        return rows.map(row => new Subscription(row, teacherId))
    }
}