const client = require('../client.js');

module.exports = class Teacher {
    id;
    teacher_id;
    user_name;
    email;
    pic_url;
    color;
    access_token;
    account_id;
    timezone;
    account_created;
    last_update;

    constructor(row) {
        this.id = row.id;
        this.teacher_id = row.teacher_id;
        this.user_name = row.user_name;
        this.email = row.email;
        this.pic_url = row.pic_url;
        this.color = row.color;
        this.access_token = row.access_token;
        this.account_id = row.account_id;
        this.timezone = row.timezone;
        this.account_created = row.account_created;
        this.last_update = row.last_update;
    }


    static async insert({ teacher_id, user_name, email, pic_url, access_token, account_id, timezone }) {

        const currentDate = new Date().toISOString();

        const { rows } = await client.query(
            `INSERT INTO teachers 
                    (
                        teacher_id, 
                        user_name, 
                        email, 
                        pic_url, 
                        account_id, 
                        access_token,
                        timezone, 
                        account_created,
                        last_update
                    )
                VALUES
                    ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                    RETURNING *`,
            [
                teacher_id,
                user_name,
                email,
                pic_url,
                account_id,
                access_token,
                timezone,
                currentDate,
                currentDate
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

    static async login(teacherId, oauthToken) {

        const currentDate = new Date().toISOString();

        const { rows } = await clinet.query(`
        UPDATE teachers
        SET
        last_update = $1,
        access_token = $2
        WHERE teacher_id = $3
        RETURNING *
        `, [currentDate, oauthToken, teacherId]);

        return new Teacher(rows[0])
    }


}
