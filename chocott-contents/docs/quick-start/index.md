# Quick start

chocott-backstageを利用するには、GitHubアカウントにGitHub Appを登録する必要があります。

GitHub AppはOrganization（組織）アカウントまたはパーソナルアカウント（個人のGitHubアカウント）のどちらにも登録できます。利用形態に応じて、以下のいずれかの手順を参照してください。

## Organizationアカウントで利用する場合

OrganizationのメンバーでBackstageを共有利用する場合は、OrganizationアカウントにGitHub Appを登録します。

- Organizationのユーザー・チーム情報をBackstageに取り込むことができます
- サインインできるのはOrganizationのメンバーのみとなります

→ [Organizationアカウントで利用する場合の手順](./organization.md)

## パーソナルアカウントで利用する場合

個人で検証・学習目的で利用する場合は、パーソナルアカウントにGitHub Appを登録します。

- 設定ファイルの編集が必要です
- GitHubアカウントを持っているすべての方がサインイン可能となります（ローカル環境での利用を想定）

→ [パーソナルアカウントで利用する場合の手順](./personal.md)

## ご自身でソースコードも修正してみたい方

[本リポジトリ](https://github.com/ap-communications/chocott-backstage)は [GitHubテンプレートリポジトリ](https://docs.github.com/ja/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) として設定されています。以下の手順で、ご自身のGitHub環境に新しいリポジトリとしてコピーすることができます。

`Use this template` ボタンをクリックするとサブメニューが表示されますので、そこで `Create a new repository` を選択してください。
コピーする先のリポジトリ情報を入力する画面が表示されますので、必要な項目を入力すれば完了です（Private repositoryにすることもできます）。


### 事前準備

nodeやyarnなどいくつかのコマンドが必要です。詳しくは [Backstage公式ドキュメントのGetting Started](https://backstage.io/docs/getting-started/#prerequisites)をご確認ください。

なお、chocott-backstageではNode 18を利用して実装しています。

また、TechDocsを表示するためにmkdocsというツールも必要になります。[TechDocsのドキュメント](../techdocs/index.md) をご確認いただき、インストールしてください。


### ローカル向けコンフィグレーションファイルの用意

リポジトリのトップフォルダにある、テンプレートファイルをもとにローカル向けコンフィグレーションを作成します。
なお、初期状態ではデータベースにsqliteを利用するように設定しています。PostgreSQLを利用する場合は [Databaseのドキュメント](../database/index.md) を参考にしてapp-config.local.yamlの設定を書き換えてください。

```shell
cd <repository top>
cp app-config.local.yaml.sample app-config.local.yaml

```

### ローカル環境で実行

以下のコマンドでアプリケーションが起動します。起動後 http://localhost:3000/ にアクセスしてください。
サインインは、連携したGitHubのユーザーアカウントで行うことができます。

```sh
yarn install
yarn start
```

アクセスしましたら、[ソフトウェアカタログのページ](../catalogs/index.md) をご参考にしていただき、既存のソフトウェアカタログを登録したり新規に作成するなどして、実際に機能をお試しください。
