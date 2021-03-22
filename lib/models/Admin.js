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
        console.log("🚀 ~ file: Admin.js ~ line 27 ~ Admin ~ verify ~ adminFilename", adminFilename)

        let admin;
        fs.readFile('./admin.json', (err, data) => {
            if (err) throw err
            admin = JSON.parse(data)
            console.log("🚀 ~ file: Admin.js ~ line 24 ~ Admin ~ rawAdmin ~ obj", admin)
        });
        console.log(admin.userName, userName)
        console.log(admin.passwordHash, passwordHash)

        if (admin && admin.userName === userName && admin.passwordHash === passwordHash) {
            if (admin.userName === 'admin') {
                return 'new'
            }
            return "success"
        } else {
            return "false"
        }

        return "whats happening?";
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

