# 補足：ソースコードを修正してみたい方

こちらは、ソースコードをご自分で修正されたい方向けのページです。

## 事前準備

nodeやyarnなどいくつかのコマンドが必要です。詳しくは [Backstage公式ドキュメントのGetting Started](https://backstage.io/docs/getting-started/#prerequisites)をご確認ください。

なお、chocott-backstageではNode 24を利用して実装しています。

また、TechDocsを表示するためにmkdocsというツールも必要になります。[TechDocsのドキュメント](../techdocs/index.md) をご確認いただき、インストールしてください。

## ローカル向けコンフィグレーションファイルの用意

リポジトリのトップフォルダにある、テンプレートファイルをもとにローカル向けコンフィグレーションを作成します。
なお、初期状態ではデータベースにsqliteを利用するように設定しています。PostgreSQLを利用する場合は [Databaseのドキュメント](../database/index.md) を参考にしてapp-config.local.yamlの設定を書き換えてください。

```shell
cd <repository top>
cp app-config.local.yaml.sample app-config.local.yaml

```

## ローカル環境で実行

以下のコマンドでアプリケーションが起動します。起動後 http://localhost:3000/ にアクセスしてください。
サインインは、連携したGitHubのユーザーアカウントで行うことができます。

```sh
yarn install
yarn start
```

アクセスしましたら、[ソフトウェアカタログのページ](../catalogs/index.md) をご参考にしていただき、既存のソフトウェアカタログを登録したり新規に作成するなどして、実際に機能をお試しください。
