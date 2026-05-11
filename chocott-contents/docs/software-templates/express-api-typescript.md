# Express API × TypeScriptテンプレート

このページでは、chocott-backstageで提供しているソフトウェアテンプレートの一つである **Express API × TypeScriptテンプレート** について説明します。

## テンプレートの概要

Node.js/Express × TypeScriptのHTTP APIリポジトリを新規作成するテンプレートです。

テンプレート払い出しの手続きと同時に、以下の処理が行われます。

1. テンプレートディレクトリをコピーし、ユーザーが入力した値をコード内に置換
2. 新規リポジトリを作成し、1のコード群をプッシュ
3. コミットを検知し、GitHubワークフローの内容に基づいてGitHub Actionsを実行
4. Backstageのソフトウェアカタログへ登録

![Template flow image](./images/flow-express-api-typescript.svg)

## 前提条件

このテンプレートを利用するには、BackstageとGitHubの連携設定が完了している必要があります。  
設定が完了していない場合は [GitHub Integration](../integration/index.md) をご確認ください。

## テンプレートの登録

登録手順は [ソフトウェアテンプレート > テンプレート登録手順](./index.md#テンプレート共通テンプレート登録手順) を参照してください。

手順3のURL入力では、以下のURLを使用してください。

```
https://github.com/ap-communications/chocott-backstage/blob/main/chocott-contents/scaffolders/express-api-typescript/template.yaml
```

## テンプレートの使い方

左サイドバーの **Create...** からテンプレート一覧を開き、**Express API × TypeScript** テンプレートを選択して **Choose** をクリックします。

![Choose the Express API × TypeScript template](./images/expressapi-template-choose.png)

フォームに以下の情報を入力します。

| 項目 | 説明 |
|---|---|
|  |  |
|  |  |

![Enter template information](./images/expressapi-template-info-input.png)

入力が完了したら **Review** を進めて確認画面で **Create** をクリックします。

![Create from template](./images/expressapi-template-create.png)

ソフトウェアカタログに登録されたコンポーネントを開きます。

![Open catalog page](./images/expressapi-open-catalog.png)

カタログページの **Source** リンクからGitHubリポジトリにアクセスできます。

![Open source repository from catalog](./images/expressapi-catalog-open-source.png)

リポジトリ作成後、自動的にGitHub Actionsが起動します。生成されたリポジトリのActionsタブで初回ワークフローが正常に完了していることを確認してください。

![Check initial GitHub Actions run](./images/expressapi-check-initial-actions.png)

## 払い出し後の確認

払い出されたリポジトリをローカルにクローンして、以下のコマンドで確認してみることもできます。

```shell
$ npm install
$ npm run dev

> expressapi-new-repository@1.0.0 dev
> ts-node src/index.ts

Server is running on port 3000
```

`http://localhost:3000/`でアクセスすると、サンプルアプリが起動しているのがわかります。

![Access the application frontend](./images/expressapi-access-app-frontend.png)


## 生成物

テンプレートを実行すると、以下のファイルを含むGitHubリポジトリが作成されます。

| ファイル／フォルダ | 説明 |
|---|---|
| `.github/workflows/` | GitHub Actionsのビルドワークフロー |
| `src/` | TypeScript/Expressアプリケーションのソースコード |
| `catalog-info.yaml` | Backstageのソフトウェアカタログ定義ファイル |

`catalog-info.yaml` にはGitHub連携のためのannotation（`github.com/project-slug`）が設定されており、カタログページの **CI/CDタブ** でGitHub Actionsの実行結果を、**Pull Requestsタブ** でPull Requestの一覧を確認できます。
