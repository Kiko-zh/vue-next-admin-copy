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
          "/@": pathResolve('./src/')
        }
      }
    })
    ```