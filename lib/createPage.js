import fs from"fs-extra"
import chalk from'chalk'
import path from 'path'
import { Plop, run } from 'plop'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Creator.js

// 创建page部分
export default async function create(pageName, options) {
	const cwd = process.cwd()
	const isValidProject = fs.existsSync('src') && fs.statSync('src').isDirectory() && fs.existsSync('package.json')
	if(!isValidProject) {
		console.log(chalk.red("请确定你的项目合法并在根目录执行命令"))
		process.exit()
	}
	Plop.prepare(
		{
			configPath: path.join(__dirname.slice(0, __dirname.length - 4), "plop-page.js"),
		},
		env => Plop.execute(env, run)
	)
}
