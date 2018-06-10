# D3.js サンプル

http://blockbuilder.org/mvanegas10/4a9ee4ddb865e17a301317c66ab5b113

を参考に、Partition を TypeScript で実装してみる。

## セットアップ手順

Typescript, Webpack を使えるようにする。

```sh
npm init

npm install --save typescript webpack webpack-cli ts-loader

tsc --init

webpack init

npm install --save d3 @types/d3
```

package.json の script 以下を以下のように編集。
```json
  "scripts": {
    "build": "webpack --mode=development",
    "start": "webpack-dev-server --mode=development"
  }
```
「npm start」で localhost:8080 でアクセス。