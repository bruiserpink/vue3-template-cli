### download cli
```bash
npm i bp-template-cli -g
```

##### create project: -f是否强制替换同名文件夹
```bash
bp-template create <projectName> [-f]
```

##### create page & router: 
会在校验项目目录成功后在src/view下生成page模板，并在`src/router/routes.ts`文件中自动追加文件路由信息(ps.生成文件名会自动转为dashCase，但是由plop append配置问题，自动追加的router路径无法转为dashCase,需要手动修改，后续寻找解决方案)
```bash 
bp-template page <pageName>
```

##### create component:
-g: 全局组件,无需路径。直接在src/components下生成组件 `bp-template comp testComp -g`
page下生成: `bp-template comp home/components/testComp`  在`src/views/home`下生成组件testComp.vue，若home下没有components文件夹，则会自动生成。
```bash 
bp-template comp <comp path> [-g]
```
已完成:
1. 创建项目
2. 创建page
3. 创建router
2. 创建component

TODO: 
1. 更新api(*扩展功能*)
2. 创建store
3. 根据配置生成children路由