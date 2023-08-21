# Quick start

## 連携先GitHubへの登録

### GitHub Appの登録

GitHub AppをGitHubアカウントに登録する必要があります。 [Authenticationのドキュメント](../authentication/index.md) を参考にAppを登録し、Client IdとClient Secret、Secretファイルを作成してください。

```shell
export AUTH_GITHUB_CLIENT_ID="<Client IDの文字列>"
export AUTH_GITHUB_CLIENT_SECRET="<Secretの文字列>"
```

続けて、Backend向けのGitHub Integrationを実現するため、GitHub App Private Keyを作成します。
[Integratonのドキュメント](../integration/index.md) を参考に、Credential fileを作成します。
作成したファイルパスを GITHUB_CREDENTIAL_FILE という環境変数に設定します。

```bash
export GITHUB_CREDENTIAL_FILE="/<put your folder name>/github-credentials.yaml"

```

組織アカウントにGitHub Appを登録した場合には、その組織のユーザー・チーム情報をBackstageに取り込むことができます。
以下のようにGitHub組織名を環境変数に設定してください。

```shell
export GITHUB_ORG="<organization名>"
```

パーソナルアカウントにGitHub Appを登録した場合には、ユーザー・チーム情報をBackstageに取り込むことができませんので上記の環境変数の設定は不要です。コンフィグレーション(`$TOP/app-config.local.yaml` や `chocott-contents/deploy/app-config.chocott.yaml`)のcatalog.providers.gitHubOrgの項目をコメントアウトしてください。

```yaml
catalog:
  # 個人アカウントにGitHub Appを作成した場合はproviders.githubOrgの項目をコメントアウトしてください
  providers:
    # 下記をコメントアウト
    # githubOrg:
    #   id: 'github-local'
    #   orgs:
    #   - ${GITHUB_ORG}

```

この場合は、GitHubアカウントを持っているすべての方がBackstageにサインイン可能となりますのでご利用の際はご注意ください。


## すぐに動かしたい方

必要なこと

- コードのclone
- 連携するGitHubアカウントへのGitHub Appの登録
- 環境変数の定義
- docker composeによる実行

### コードのclone

[本リポジトリ](https://github.com/ap-communications/chocott-backstage)を clone してください

```
git clone https://github.com/ap-communications/chocott-backstage.git --depth 1

```

### docker composeによる実行

```shell
cd chokott-contents/deploy/docker-compose
docker compose up -d

```

上記でアプリケーションが起動します。GitHubのほうからユーザー情報等を取得する時間が必要となるため、起動後少し（10秒程度）お待ちください。
その後、 http://localhost:7007/ でアクセスできます。GitHubアカウントでサインインできます。

アクセスしましたら、[ソフトウェアカタログのページ](../catalogs/index.md) をご参考にしていただき、既存のソフトウェアカタログを登録したり新規に作成するなどして、実際に機能をお試しください。


## ご自身でソースコードも修正してみたい方

[本リポジトリ](https://github.com/ap-communications/chocott-backstage)は [GitHubテンプレートリポジトリ](https://docs.github.com/ja/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) として設定されています。以下の手順で、ご自身のGitHub環境に新しいリポジトリとしてコピーすることができます。

`Use this template` ボタンをクリックするとサブメニューが表示されますので、そこで `Create a new repository` を選択してください。
コピーする先のリポジトリ情報を入力する画面が表示されますので、必要な項目を入力すれば完了です（Private repositoryにすることもできます）。


### 事前準備

nodeやyarnなどいくつかのコマンドが必要です。詳しくは [Backstage公式ドキュメントのGetting Started](https://backstage.io/docs/getting-started/#prerequisites)をご確認ください。

なお、chocott-backstageでは Node 18を利用して実装しています。

また、TechDocsを表示するために mkdocs というツールも必要になります。[TechDocsのドキュメント](../techdocs/index.md) をご確認いただき、インストールしてください。


### ローカル向けコンフィグレーションファイルの用意

リポジトリのトップフォルダにある、テンプレートファイルをもとにローカル向けコンフィグレーションを作成します。
なお、初期状態ではデータベースにsqliteを利用するように設定しています。PostgreSQLを利用する場合は [Databaseのドキュメント](../database/index.md) を参考にして app-config.local.yamlの設定を書き換えてください。

```shell
cd <repository top>
cp app-config.local.yaml.sample app-config.local.yaml

```

### ローカル環境で実行

以下のコマンドでアプリケーションが起動します。起動後 http://localhost:3000/ にアクセスしてください。
サインインは、連携したGitHubのユーザーアカウントで行うことができます。

```sh
yarn install
yarn dev
```

アクセスしましたら、[ソフトウェアカタログのページ](../catalogs/index.md) をご参考にしていただき、既存のソフトウェアカタログを登録したり新規に作成するなどして、実際に機能をお試しください。
