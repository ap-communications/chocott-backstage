# Express API × TypeScriptテンプレート

このページでは、chocott-backstageで提供しているソフトウェアテンプレートの一つである **Express API × TypeScriptテンプレート** について説明します。

## テンプレートの概要

Node.js/Express × TypeScriptのHTTP APIリポジトリを新規作成するテンプレートです。

テンプレート払い出しの手続きと同時に、以下の処理が行われます。

1. テンプレートディレクトリをコピーし、ユーザーが入力した値をコード内に置換
2. 新規リポジトリを作成し、1のコード群をプッシュ
3. Backstageのソフトウェアカタログへ登録

また、

## 前提条件

このテンプレートを利用するには、BackstageとGitHubの連携設定が完了している必要があります。

設定が完了していない場合は [GitHub Integration](../integration/index.md) をご確認ください。

## テンプレートの登録

テンプレートはソフトウェアカタログと同様に、Backstageへのインポートが必要です。

サイドメニューから `Create...` を選択し、Create a New Component画面で「REGISTER EXISTING COMPONENT」ボタンをクリックします。
Select URLのところに、以下のURLを入力し、「ANALYZE」→「IMPORT」をクリックしてください。

```
https://github.com/ap-communications/chocott-backstage/blob/main/chocott-contents/scaffolders/express-api-typescript/template.yaml
```

インポートが完了したらサイドメニューの `Create...` を開き、「Express API × TypeScriptのサンプルテンプレート」が追加されていることを確認してください。

## テンプレートの使い方

サイドメニューから `Create...` を選択し、「Express API × TypeScriptのサンプルテンプレート」の「CHOOSE」ボタンをクリックします。

### リポジトリの作成先を入力する

「Repository Location」に、作成先のGitHub Organization名またはユーザーアカウント名とリポジトリ名を指定します。

入力後、「REVIEW」→「CREATE」をクリックするとリポジトリの作成が始まります。

### 作成完了後

作成が完了すると、以下のリンクが表示されます。

- **Repository** — 作成されたGitHubリポジトリへのリンク
- **Open in catalog** — Backstageのソフトウェアカタログページへのリンク

「Open in catalog」をクリックすると、作成したリポジトリのカタログページが開きます。

## 生成物

テンプレートを実行すると、以下のファイルを含むGitHubリポジトリが作成されます。

| ファイル／フォルダ | 説明 |
|---|---|
| `.github/workflows/` | GitHub Actionsのビルドワークフロー |
| `src/` | TypeScript/Expressアプリケーションのソースコード |
| `catalog-info.yaml` | Backstageのソフトウェアカタログ定義ファイル |

`catalog-info.yaml` にはGitHub連携のためのannotation（`github.com/project-slug`）が設定されており、カタログページの **CI/CDタブ** でGitHub Actionsの実行結果を、**Pull Requestsタブ** でPull Requestの一覧を確認できます。
