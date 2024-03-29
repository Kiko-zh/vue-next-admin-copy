## 0.0.1

`2023/2/3`

- 代码规范与检查

  - add `prettier`

    - `npm i prettier -D`
    - create file: `.prettierrc.js` or `prettier.config.js` and `.prettierignore`

  - add `eslint` 及其相关插件

    - `npm i eslint -D`
    - `npm i eslint-plugin-vue @typescript-eslint/parser @typescript-eslint/eslint-plugin -D`
    - `npm i eslint-config-prettier eslint-plugin-prettier -D`

  - create file: `.eslintrc.js` or `.eslintrc.json` and `.eslintignore`

  - 修改 `package.json`
    - add `npm run lint`
    - add `npm run format`

Q: ctrl+s 保存 code 时，无法自动进行格式化

- style - sass

  - [stylelint setting](https://juejin.cn/post/7118294114734440455)

- husky
  - `npm i husky -D`
  - add a new script in package.json: `"prepare": "husky install"`
  - execute: `npx husky add .husky/pre-commit "npm run lint && npm run format"`

## 0.0.0

`2023/2/22`

- `npm create vite@latest vue-next-admin-copy -- --template vue-ts` 创建项目

- Vue3 搭配 vscode extensions 之 volar

- 配置路径别名

  - prepare `npm install @types/node -D`
  - 修改文件 `tsconfig.json`
    ```json
    {
    	"compilerOptions": {
    		//...
    		"paths": {
    			"/@/*": ["src/*"]
    		}
    	}
    }
    ```
  - 修改文件 `vite.config.js`
    ```js
    defineConfig({
    	//...
    	resolve: {
    		alias: {
    			'/@': pathResolve('./src/')
    		}
    	}
    })
    ```
