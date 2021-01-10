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


    static async insert({
        teacher_id,
        user_name,
        email,
        pic_url,
        access_token,
        account_id,
        timezone
    }) {
        const currentDate = new Date().toISOString();

        console.log(teacher_id,
            user_name,
            email,
            pic_url,
            access_token,
            account_id,
            timezone)

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
        console.log(rows[0])
        return new Teacher(rows[0])
    }

    static async parse({ id, first_name, last_name, email, pic_url, account_id, timezone }, oauthToken) {
        return {
            teacher_id: id,
            user_name: first_name + ' ' + last_name,
            email,
            pic_url,
            account_id,
            access_token: oauthToken,
            new_user: true,
            timezone
        }
    }

    static async findById(teacherId) {

        const currentDate = new Date().toISOString();

        const { rows } = await client.query(`
        UPDATE teachers
        SET last_update = $2
        WHERE teacher_id = $1
        RETURNING *`,
            [
                teacherId,
                currentDate
            ]);
        if (!rows[0]) return null;

        return new Teacher(rows[0]);
    }

    // static async retrieveZoomMeetings()
}
