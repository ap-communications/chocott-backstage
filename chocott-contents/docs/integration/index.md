# Backend向けGitHubのインテグレーション

BackstageのBackend Serverが各外部サービスに連携するための設定が Integration です。

Backstageでは、TechDocsの作成等の目的のため、Backstage Serverが直接・定期的にGitHub等のシステムにアクセスします。
ここではBackend Server向けのGitHub連携方法について記載します。

## GitHub Credentialの作成

### GitHub App Private keyの作成

まず最初にGitHub AppのPrivate keyを作成します。

GitHub Appの設定画面の中に「Private keys」という項目があります。ここで「Generate a private key」ボタンを
クリックしてください。クリックするとローカルPCにpemファイルがダウンロードされます。

![generate github private key](./generate-private-key.png)

### Backstage用Credentialファイルの作成

このリポジトリのトップディレクトリに `github-credentials.yaml.sample` というCredentialファイルのテンプレートがあります。こちらのファイルをコピーして、Credentialファイルを作成しいます。

```shell
cp github-credentials.yaml.sample github-credentials.yaml

```

内容は以下のようになっています。

```yaml
appId: app id
clientId: client id
clientSecret: client secret
webhookSecret: webhook-secret
privateKey: |
  -----BEGIN RSA PRIVATE KEY-----
  ...Key content...
  -----END RSA PRIVATE KEY-----
```

appId、clientId、clientSecretについてはGitHub Appの情報を登録してください。
webhookSecretについてはGitHub Webhookを利用する際に指定するものです。Webhookを利用しない場合は適当な文字列
（例えば `webhook-secret` ）を指定してください。
privateKeyの欄はさきほど作成したGitHubのprivate key PEMファイルの内容を指定します。


**【重要】privateKey以下の部分は先頭に2文字分スペースを挿入してください。**


### Credentialファイルパスを環境変数に設定

作成が完了したら、GITHUB_CREDENTIAL_FILE 環境変数にgithub-credentails.yamlのパス名を指定してください。

```shell
export GITHUB_CREDENTIAL_FILE="/<put your folder name>/github-credentials.yaml"

```

