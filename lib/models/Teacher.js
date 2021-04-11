const client = require('../client.js');

module.exports = class Teacher {
    id;
    teacherId;
    userName;
    email;
    picUrl;
    color;
    accountId;
    timezone;
    accountCreated;
    lastUpdate;

    constructor(row) {
        this.id = row.id;
        this.teacherId = row.teacher_id;
        this.userName = row.user_name;
        this.email = row.email;
        this.picUrl = row.pic_url;
        this.color = row.color;
        this.accountId = row.account_id;
        this.timezone = row.timezone;
        this.accountCreated = row.account_created;
        this.lastUpdate = row.last_update;
    }


    static async insert({ teacherId, userName, email, picUrl, accountId, timezone, color }) {

        const currentDate = new Date().toISOString();

        const { rows } = await client.query(
            `INSERT INTO teachers 
                    (
                        teacher_id, 
                        user_name, 
                        email, 
                        pic_url, 
                        account_id, 
                        timezone, 
                        account_created,
                        last_update,
                        color
                    )
                VALUES
                    ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                    RETURNING *`,
            [
                teacherId,
                userName,
                email,
                picUrl,
                accountId,
                timezone,
                currentDate,
                currentDate,
                color
            ]);

        return new Teacher(rows[0])
    }

    static async findById(teacherId) {

        const { rows } = await client.query(`
        SELECT * 
        FROM teachers
        WHERE teacher_id = $1
        RETURNING *`,
            [
                teacherId,
            ]);
        if (!rows[0]) return null;

        return new Teacher(rows[0]);
    }

    static async findAll() {
        const { rows } = await client.query(`
            SELECT * 
            FROM teachers
            ORDER BY id
        `)
        if (!rows[0]) return [];

        return rows.map(row => new Teacher(row))
    }

    static async login(teacherId, oauthToken) {

        const currentDate = new Date().toISOString();

        const { rows } = await client.query(`
        UPDATE teachers
        SET
        last_update = $1,
        access_token = $2
        WHERE teacher_id = $3
        RETURNING *
        `, [currentDate, oauthToken, teacherId]);

        return new Teacher(rows[0])
    }

    static async deauthorize(userId) {

        const { rows } = await client.query(`
        DELETE FROM teachers
        WHERE teacher_id = $1
        RETURNING *
        `, [userId])

        if (rows.length === 0) return null
        return new Teacher(rows[0])
    }

    static async delete(id) {
        const { rows } = await client.query(`
        DELETE FROM teachers
        WHERE id = $1
        RETURNING *
        `, [id])

        if (rows.length === 0) return null
        return new Teacher(rows[0])
    }

    static async updateColor(teacherId, newColor) {
        const updatedTeacher = await client.query(`
        UPDATE teachers 
        SET color = $1
        WHERE id = $2
        RETURNING *
        `, [newColor, teacherId])

        const updatedMeetings = await client.query(`
        UPDATE meetings 
        SET color = $1
        WHERE teacher_id = $2
        RETURNING *
        `, [newColor, teacherId])

        return { updatedTeacher, updatedMeetings }

    }

}
