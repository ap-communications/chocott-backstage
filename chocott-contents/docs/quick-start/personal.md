# パーソナルアカウントでchocott-backstageを立ち上げる

パーソナルアカウント（個人のGitHubアカウント）でchocott-backstageを利用する場合の手順です。

## 前提条件

- macOS、またはWindows（WSL2のUbuntu等）などのLinux環境で作業していること
- GitHubのパーソナルアカウントを持っていること
- Dockerがインストールされていること
- [Quick startのリポジトリのコピー手順](./index.md)に従い、ご自身のGitHubリポジトリとしてclone済みであること

## 手順概要

1. GitHub Appの登録
2. GitHub PATの取得
3. 環境変数の設定
4. docker composeによる起動
5. 動作確認

## 1. GitHub Appの登録

[Authenticationのドキュメント](../authentication/githubapp/index.md)を参照し、パーソナルアカウントにGitHub Appを登録してください。

登録時の注意点：
- App Install時は「All repositories」を選択することを推奨します

登録後、以下の情報をメモしてください：
- App ID
- Client ID
- Client Secret

## 2. GitHub PATの取得

[GitHub PATのドキュメント](../integration/githubpat/index.md)を参照し、Personal Access Token（PAT）を取得してください。  
取得した値は[4. 環境変数の設定](#4-環境変数の設定)にて使用します。

## 3. 環境変数の設定

以下の環境変数を設定してください。

```shell
export AUTH_GITHUB_CLIENT_ID="<Client IDの文字列>"
export AUTH_GITHUB_CLIENT_SECRET="<Client Secretの文字列>"
export GITHUB_PERSONAL_TOKEN="<PATの文字列>"
export BACKSTAGE_BACKEND_SECRET="$(openssl rand -hex 32)"
```

`BACKSTAGE_BACKEND_SECRET` はBackstageのバックエンドが内部認証に使用する秘密鍵です。`openssl` コマンドでランダムな文字列を生成して設定してください。

## 4. docker composeによる起動

```shell
cd chocott-contents/deploy/personal/docker-compose
docker compose up -d
```

アプリケーションが起動します。起動後少し（10秒程度）お待ちください。

## 5. 動作確認

http://localhost:7007/ にアクセスしてください。  
無事Backstage Portalにアクセスできれば成功です！

### 補足：クリーンアップ

アプリケーションを停止する場合は以下のコマンドを実行してください。

```shell
cd chocott-contents/deploy/personal/docker-compose
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