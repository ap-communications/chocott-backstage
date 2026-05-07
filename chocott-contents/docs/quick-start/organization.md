# Organizationアカウントでchocott-backstageを立ち上げる

Organization（組織）アカウントにGitHub Appを登録してchocott-backstageを利用する場合の手順です。

## 前提条件

- macOS、またはWindows（WSL2のUbuntu等）などのLinux環境で作業していること
- GitHubのOrganizationアカウントのオーナー権限を持っていること
- Dockerがインストールされていること
- [Quick startのリポジトリのコピー手順](./index.md)に従い、ご自身のGitHubリポジトリとしてclone済みであること

## 手順概要

1. GitHub Appの登録
2. GitHub Credentialファイルの作成
3. 環境変数の設定
4. docker composeによる起動
5. 動作確認

## 1. GitHub Appの登録

[Authenticationのドキュメント](../authentication/githubapp/index.md)を参照し、OrganizationアカウントにGitHub Appを登録してください。

## 2. GitHub Credentialファイルの作成

[Integrationのドキュメント](../integration/index.md)を参照し、GitHub Credentialファイルを作成してください。

## 3. 環境変数の設定

以下の環境変数を設定してください。

```shell
export AUTH_GITHUB_CLIENT_ID="<Client IDの文字列>"
export AUTH_GITHUB_CLIENT_SECRET="<Client Secretの文字列>"
export GITHUB_CREDENTIAL_FILE="$(pwd)/github-credentials.yaml"
export GITHUB_ORG="<Organization名>"
export BACKSTAGE_BACKEND_SECRET="$(openssl rand -hex 32)"
```

`BACKSTAGE_BACKEND_SECRET` はBackstageのバックエンドが内部認証に使用する秘密鍵です。`openssl` コマンドでランダムな文字列を生成して設定してください。

> **注意**: `GITHUB_CREDENTIAL_FILE`は絶対パスで指定する必要があります。

`GITHUB_ORG`には、GitHub Appを登録したOrganization名を指定してください。この設定により、Organizationのユーザー・チーム情報がBackstageに取り込まれます。

## 4. docker composeによる起動

```shell
cd chocott-contents/deploy/organization/docker-compose
docker compose up -d
```

アプリケーションが起動します。GitHubからOrganizationのユーザー情報等を取得する時間が必要となるため、起動後少し（10秒程度）お待ちください。

## 5. 動作確認

http://localhost:7007/ にアクセスしてください。GitHubアカウントでサインインできます。

※サインインできるのはあくまでもGitHub Organizationに所属するメンバーのアカウントのみです

GitHubアカウントでBackstageに最初にサインインする際、以下のようなダイアログが表示されます。表示されましたら「Authorize ... 」のボタンをクリックしてください。2回目のサインイン時には表示されません。

![signin approve permission](./signin-approve-permission.png)

無事Backstage Portalにアクセスできれば成功です！

![backstage portal home](backstage-portal-home.png)

### 補足：クリーンアップ

アプリケーションを停止する場合は以下のコマンドを実行してください。

```shell
cd chocott-contents/deploy/organization/docker-compose
docker compose down
```

データベースのデータも含めてすべて削除する場合は、`--volumes` オプションを追加してください。

```shell
docker compose down --volumes
```

## 次のステップ：ソフトウェアカタログの登録

無事にBackstageが起動したら、続いてBackstage上で実際にソフトウェアカタログを登録してみましょう。  
以下のページを参考に、既存のカタログを登録してみてください。

- **[ソフトウェアカタログを登録する](../catalogs/index.md)**