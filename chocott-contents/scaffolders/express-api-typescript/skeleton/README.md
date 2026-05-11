# ${{ values.name }}

TypeScript + Node.js/ExpressのHTTP APIサンプルです。

## エンドポイント

| メソッド | パス | 説明 |
|--------|------|------|
| GET | `/` | Hello World レスポンスを返します |
| GET | `/health` | ヘルスチェック用エンドポイントです |

## セットアップ

```bash
npm install
```

## 開発サーバーの起動

```bash
npm run dev
```

## ビルド

```bash
npm run build
```

## 起動

```bash
npm start
```

ポート番号は環境変数 `PORT` で変更できます（デフォルト: 3000）。

## Lint

```bash
npm run lint
```
