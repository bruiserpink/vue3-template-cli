const path = require('path')
const downloadGitRepo = require('download-git-repo')
const ora = require("ora");
const chalk = require('chalk');
const handlebars = require('handlebars')
const fs = require('fs-extra')

class Creator {
	// 项目名称及项目路径
	constructor(name, target) {
		this.name = name
		this.target = target
    this.cloneSuccess = false //git repo clone
    this.timeOut = 1000 * 60 * 5 //最长等待5分钟
  }
  // 创建项目部分
  async create(repoUrl, templateType) {
    const Types = {
      react: 'react-hooks',
      vue3: '',
    }
    // 下载模板到模板目录
    const res = await this.download(repoUrl, Types[templateType] || '');
    this.cloneSuccess = res
  }
  async download(url, branch) {
    const repoUrl = url || 'https://github.com/Bruiser-pink/vue-template.git'
    const templateUrl = branch ? `direct:${repoUrl}#${branch}` : `direct:${repoUrl}`
    // 调用 downloadGitRepo 方法将对应模板下载到指定目录
    // 定义一个loading
    const spinner = ora(`clone repository from ${templateUrl}`);
    console.log(`clone repository from ${chalk.cyan(repoUrl)}`)
    // 启动loading
    spinner.start();
    setTimeout(() => {
      spinner.color = "yellow";
      spinner.text = "Cloning---";
    }, 1000);
    const res = await this.cloneRepo(templateUrl)
    if(res) {
      spinner.text = "done";
      spinner.succeed();
      return true
    } else {
      spinner.text = `clone fail`;
      spinner.fail();
      return false
    }
  }
  //clone仓库
  async cloneRepo(templateUrl) {
    return new Promise((resolve, reject) => {
      downloadGitRepo(templateUrl, this.target, { clone: true }, (err) => {
        if(err) {
          console.log(chalk.red(err))
          reject(false)
        } else {
          resolve(true)
        }
      })
    })
  }
  // 打印模板操作提示
  logTemplateUseTips() {
    // 模板使用提示
    console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`);
    console.log(`\r\n  cd ${chalk.cyan(this.name)}\n`);
    console.log("  npm install\r\n");
    console.log("  npm run dev\r\n");
  }
  //根据输入把模板信息写入package.json
  editorPackageJson(params) {
    const packagePath = path.join(this.target, 'package.json');
    // 判断是否有package.json, 要把输入的数据回填到模板中
    if (fs.existsSync(packagePath)) {
        const content = fs.readFileSync(packagePath).toString();
        // handlebars 模板处理引擎
        const template = handlebars.compile(content);
        const result = template(params);
        fs.writeFileSync(packagePath, result);
    } else {
        console.log(chalk.red('failed! no package.json'));
    }
  }
}

module.exports = Creator