# パーソナルアカウントで利用する場合

パーソナルアカウント（個人のGitHubアカウント）にGitHub Appを登録してchocott-backstageを利用する場合の手順です。

## 前提条件

- macOS、またはWindows（WSL2のUbuntu等）などのLinux環境で作業していること
- GitHubのパーソナルアカウントを持っていること
- Dockerがインストールされていること

## 手順概要

1. コードのclone
2. GitHub Appの登録
3. GitHub Credentialファイルの作成
4. 設定ファイルの編集
5. 環境変数の設定
6. docker composeによる起動
7. 動作確認
8. クリーンアップ

## 1. コードのclone

[本リポジトリ](https://github.com/ap-communications/chocott-backstage)をcloneしてください。

```shell
git clone https://github.com/ap-communications/chocott-backstage.git --depth 1
cd chocott-backstage
```

## 2. GitHub Appの登録

[Authenticationのドキュメント](../authentication/index.md)を参照し、パーソナルアカウントにGitHub Appを登録してください。

登録時の注意点：
- 「パーソナルアカウントに作成する場合」の手順に従ってください
- App Install時は「All repositories」を選択することを推奨します

登録後、以下の情報をメモしてください：
- App ID
- Client ID
- Client Secret

## 3. GitHub Credentialファイルの作成

[Integrationのドキュメント](../integration/index.md)を参照し、GitHub Credentialファイルを作成してください。

```shell
cp github-credentials.yaml.sample github-credentials.yaml
```

`github-credentials.yaml`に以下の情報を設定します：
- appId
- clientId
- clientSecret
- webhookSecret（Webhookを使用しないため適当な文字列で可）
- privateKey（GitHub Appで生成したPrivate Key）

## 4. 設定ファイルの編集

パーソナルアカウントで利用する場合、設定ファイルの編集が必要です。

[chocott-contents/deploy/app-config.chocott.yaml](../../deploy/app-config.chocott.yaml)を編集してください。

### signIn resolversの設定

パーソナルアカウントにGitHub Appを登録した場合、組織のユーザー情報をBackstageに取り込むことができません。そのため、`allMatchersAsGuest`を有効にする必要があります。

```yaml
auth:
  environment: development
  providers:
    github:
      development:
        clientId: ${AUTH_GITHUB_CLIENT_ID}
        clientSecret: ${AUTH_GITHUB_CLIENT_SECRET}
        signIn:
          resolvers:
            - resolver: usernameMatchingUserEntityName
            - resolver: allMatchersAsGuest  # この行のコメントを外す
```

### githubOrgプロバイダーの無効化

組織のユーザー・チーム情報を取り込む機能は使用できないため、`githubOrg`の設定をコメントアウトしてください。

```yaml
catalog:
  # 以下をコメントアウト
  # providers:
  #   githubOrg:
  #     id: 'github-local'
  #     githubUrl: 'https://github.com'
  #     schedule:
  #       frequency:
  #         minutes: 60
  #       timeout:
  #         minutes: 5
  #       initialDelay:
  #         seconds: 10
  #     orgs:
  #     - ${GITHUB_ORG}
```

> **注意**: この設定により、GitHubアカウントを持っているすべての方がBackstageにサインイン可能となります。ローカル環境での利用を想定しています。

## 5. 環境変数の設定

以下の環境変数を設定してください。

```shell
export AUTH_GITHUB_CLIENT_ID="<Client IDの文字列>"
export AUTH_GITHUB_CLIENT_SECRET="<Client Secretの文字列>"
export GITHUB_CREDENTIAL_FILE="$(pwd)/github-credentials.yaml"
```

> **注意**: `GITHUB_CREDENTIAL_FILE`は絶対パスで指定する必要があります。

パーソナルアカウントで利用する場合、`GITHUB_ORG`の設定は不要です。

## 6. docker composeによる起動

```shell
cd chocott-contents/deploy/docker-compose
docker compose up -d
```

アプリケーションが起動します。起動後少し（10秒程度）お待ちください。

## 7. 動作確認

http://localhost:7007/ にアクセスしてください。  
無事Backstage Portalにアクセスできれば成功です！

![backstage portal home](backstage-portal-home.png)

### 補足：クリーンアップ

アプリケーションを停止する場合は以下のコマンドを実行してください。

```shell
cd chocott-contents/deploy/docker-compose
docker compose down
```

データベースのデータも含めてすべて削除する場合は、`--volumes` オプションを追加してください。

```shell
docker compose down --volumes
```

## 次のステップ：ソフトウェアカタログの登録

無事にBackstageが起動したら、続いてBackstage上で実際にソフトウェアカタログを登録してみましょう。  
以下のページを参考に、既存のカタログを登録してみてください。

- **[ソフトウェアカタログ](../catalogs/index.md)**