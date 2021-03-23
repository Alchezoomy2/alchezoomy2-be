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

        const rawAdmin = fs.readFileSync(adminFilename);

        let admin = JSON.parse(rawAdmin)

        const passwordsMatch = await bcrypt.compare(password, admin.passwordHash)
        if (admin && admin.userName === userName && passwordsMatch) {
            if (admin.userName === 'admin') {
                return { status: 'new' }
            }
            return {
                status: "success",
                userName
            }
        } else {
            return {
                status: "fail"
            }
        }
    }

    static async create(userName, password) {
        const passwordHash = await bcrypt.hash(password, Number(saltRounds))

        const rawAdmin = fs.readFileSync(adminFilename);
        let admin = JSON.parse(rawAdmin)

        admin.userName = userName;
        admin.passwordHash = passwordHash;

        const adminString = JSON.stringify(admin);
        fs.writeFileSync(adminFilename, adminString);
        return { userName }

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
            return { status: "success" }
        }

        return { status: "false" }
    }


}

