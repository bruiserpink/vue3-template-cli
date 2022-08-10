import fs from"fs-extra"
import chalk from'chalk'
import path from 'path'
import { Plop, run } from 'plop'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const compCreator = {}
// 创建comp部分
export default class CompCreator {
  constructor() {
    this.compPath = ''
    this.options = {}
    this.isValidProject = false
    this.targetPath = ''
  }
  async create() {
    compCreator.targetPath = this.targetPath
    if(this.isValidProject) {
      Plop.prepare(
        {
          configPath: path.join(__dirname.slice(0, __dirname.length - 4), "plop-comp.js"),
        },
        env => Plop.execute(env, run)
      )
    } else {
      console.log(chalk.red(`Invalid project`))
      process.exit(1)
    }
  }
  checkPath(compPath, options) {
    this.compPath = compPath
    this.options = options
    const cwd = process.cwd()
    let targetPath = ''
    if(options.global) {
      targetPath = path.resolve(cwd, 'src', 'components')
      if(!fs.existsSync(targetPath) || !fs.statSync(targetPath).isDirectory()) {
        console.log(chalk.red(`${targetPath} directory not find`))
        process.exit(1)
      } else if(fs.existsSync(path.resolve(targetPath, compPath))) {
        console.log(chalk.red(`File already exists`))
        process.exit(1)
      } else {
        this.isValidProject = true
      }
      this.targetPath = path.resolve(targetPath, `${compPath}.vue`)
    } else {
      targetPath = path.resolve(cwd, 'src/views', `${compPath}.vue`)
      const direPath = path.dirname(targetPath)
      if(!fs.existsSync(direPath)) {
        console.log(chalk.red(`${direPath} directory not find`))
        process.exit(1)
      } else if(fs.existsSync(targetPath)) {
        console.log(chalk.red(`File already exists`))
        process.exit(1)
      } else {
        this.isValidProject = true
      }
      this.targetPath = targetPath
    }
  }
}
