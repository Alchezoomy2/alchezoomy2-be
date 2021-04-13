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

        const rawObj = fs.readFileSync(adminFilename);
        let adminObj = JSON.parse(rawObj)

        if (adminObj[userName]) {
            const passwordsMatch = await bcrypt.compare(password, adminObj[userName])

            if (passwordsMatch) {
                if (password === 'admin') return { status: "new", userName }
                return { status: "success", userName }
            }
        }

        return { status: "fail" }
    }

    static async create(userName, password) {
        const passwordHash = await bcrypt.hash(password, Number(saltRounds))

        const rawArray = fs.readFileSync(adminFilename);
        let adminArray = JSON.parse(rawArray)
        adminArray[userName] = passwordHash;

        const adminString = JSON.stringify(adminArray);
        fs.writeFileSync(adminFilename, adminString);
        return { userName }
    }

    static async changePassword(userName, oldPassword, newPassword) {

        const rawObj = fs.readFileSync(adminFilename);
        let adminObj = JSON.parse(rawObj)

        if (adminObj[userName]) {
            const passwordsMatch = await bcrypt.compare(oldPassword, adminObj[userName])

            if (passwordsMatch) {
                const newPasswordHash = await bcrypt.hash(newPassword, Number(saltRounds));
                adminObj[userName] = newPasswordHash;

                const adminString = JSON.stringify(adminArray);
                fs.writeFileSync(adminFilename, adminString);

                return { status: "success" }
            }
        }

        return { status: "false" }
    }


}

