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
    compCreator.options = this.options
    if(this.isValidProject) {
      Plop.prepare(
        {
          configPath: path.join(__dirname.slice(0, __dirname.length - 4), "plop-comp.js"),
        },
        env => Plop.execute(env, run)
      )
    } else {
      console.log(chalk.red(`Create ${targetPath} fail, check your target path and try again`))
      process.exit(1)
    }
  }
  checkPath(compPath, options) {
    this.compPath = compPath
    this.options = options
    const cwd = process.cwd()
    let targetPath = ''
    if(options.global) {
      //新建全局组件
      targetPath = path.resolve(cwd, 'src', 'components', `${compPath}.vue`)
      this.isValidProject = true
      this.targetPath = targetPath
    } else {
      //新建组件,必须有一级page,不然项目结构不规范
      const pagePath = path.resolve(cwd, 'src/views', compPath.split('/')[0])
      if(!fs.existsSync(pagePath)) {
        console.log(chalk.red(`The page ${compPath.split('/')[0]} is not found`))
        process.exit(1)
      }
      if(options.children) {
        //新建二级路由组件: home/home1格式
        if(!compPath.split('/')[1] || compPath.split('/')[2]) {
          console.log(chalk.red(`Please input valid child component path`))
          process.exit(1)
        }
        targetPath = path.resolve(cwd, 'src/views', `${compPath}`, 'index.vue')
      } else {
        if(!compPath.split('/')[1]) {
          console.log(chalk.red(`Please input component file name`))
          process.exit(1)
        }
        targetPath = path.resolve(cwd, 'src/views', `${compPath}`)
      }
      this.isValidProject = true
      this.targetPath = targetPath
    }
  }
}
