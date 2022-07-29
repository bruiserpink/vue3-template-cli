const fs = require("fs-extra")
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const chalk = require('chalk')
// Creator.js

// 创建page部分
module.exports = async function create(pageName, options) {
	const isValidProject = fs.existsSync('src') && fs.statSync('src').isDirectory() && fs.existsSync('package.json')
	if(!isValidProject) {
		console.log(chalk.red("请确定你的项目合法并在根目录执行命令"))
		process.exit()
	}
	// 拼接得到项目目录
	const { stdout, stderr } = await exec(`plop ${pageName}`);
  console.log(chalk.red(stderr));
}
