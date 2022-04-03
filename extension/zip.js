const fs = require("fs")
const child_process = require("child_process")

if (!fs.existsSync(`./dist`)) throw new Error('Directory "dist" does not exist.')

child_process.execSync(`zip -r dist.zip ./dist`)
