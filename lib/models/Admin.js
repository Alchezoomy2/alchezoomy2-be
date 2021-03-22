const fs = require('fs');
const bcrypt = require('bcryptjs');

const saltRounds = process.env.SALT_ROUNDS;
const adminFilename = process.env.ADMIN_FILENAME;

module.exports = class Admin {
    userName;
    passwordHash;

    constructor(row) {
        this.userName = row.userName;
        this.passwordHash = row.passwordHash;
    }

    static async verify(userName, password) {
        const passwordHash = await bcrypt.hash(password, Number(saltRounds));


        const rawAdmin = await fs.readFileSync(adminFilename);
        console.log("🚀 ~ file: Admin.js ~ line 21 ~ Admin ~ verify ~ rawAdmin", rawAdmin)
        let admin = JSON.parse(rawAdmin)
        console.log("🚀 ~ file: Admin.js ~ line 22 ~ Admin ~ verify ~ admin", admin)


        if (admin.userName === userName && admin.passwordHash === passwordHash) {
            if (admin.userName === 'admin') {
                return 'new'
            }
            return "success"
        } else {
            return "false"
        }
    }

    static async create(userName, password) {
        const passwordHash = await bcrypt.hash(password, Number(saltRounds))

        const rawAdmin = fs.readFileSync(adminFilename);
        let admin = JSON.parse(rawAdmin)

        admin.userName = userName;
        admin.password = passwordHash;

        const adminString = JSON.stringify(admin);
        fs.writeFileSync(adminFilename, adminString);
        return "success"

    }

    static async changePassword(userName, oldPassword, newPassword) {
        const oldPasswordHash = await bcrypt.hash(oldPassword, Number(saltRounds));
        const newPasswordHash = await bcrypt.hash(newPassword, Number(saltRounds));

        const rawAdmin = fs.readFileSync(adminFilename);
        let admin = JSON.parse(rawAdmin)

        if (admin.userName === userName && admin.passwordHash === oldPasswordHash) {
            admin.passwordHash = newPasswordHash;
            const adminString = JSON.stringify(admin);
            fs.writeFileSync(adminFilename, adminString);
            return "success"
        }

        return "false"
    }


}

