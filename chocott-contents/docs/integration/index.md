# Backend向けGitHubのインテグレーション

BackstageのBackend Serverが各外部サービスに連携するための設定がIntegrationです。

Backstageでは、TechDocsの作成等の目的のため、Backstage Serverが直接・定期的にGitHub等のシステムにアクセスします。  
GitHubとのインテグレーション方法は利用形態によって異なります。

- **Organizationアカウントで利用する場合**：このページの手順に従い、GitHub AppのCredentialファイルを作成してください
- **パーソナルアカウントで利用する場合**：[GitHub PATの取得](./githubpat/index.md)を参照してください
- [GitHub Appの登録（Organizationアカウント）](../authentication/githubapp/organization/index.md)の手順を完了してください

---

## 1. GitHub App Credentialの設定

まず最初にGitHub AppのPrivate keyを作成します。  
`https://github.com/organizations/<GitHub Organization名>/settings/apps`にアクセスし、[GitHub Appの登録（Organizationアカウント）](../authentication/githubapp/organization/index.md)の手順で作成したGitHub App横の「Edit」をクリックしましょう。

GitHub Appの設定画面の中に「Private keys」という項目があります。ここで「Generate a private key」ボタンを
クリックしてください。  
クリックするとローカルPCにpemファイルがダウンロードされます。

![GitHubプライベートキーの生成](./generate-private-key.png)

## 2. Backstage用Credentialファイルの作成

このリポジトリのトップディレクトリに `github-credentials.yaml.sample` というCredentialファイルのテンプレートがあります。  
こちらのファイルをコピーして、Credentialファイルを作成します。以下のコマンドを実行してください。

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
  -----BEGIN RSA PRIVATE KEY----- # ←各行の行頭に半角スペースを2つ入れてください
  ...Key content...
  -----END RSA PRIVATE KEY-----
```

appId、clientId、clientSecretについてはGitHub Appの情報を登録してください。  
webhookSecretはGitHub Webhookを利用しない場合でも記載が必要なフィールドです。利用しない場合は適当な文字列（例えば `webhook-secret` ）を指定してください。  
privateKeyの欄はさきほど作成したGitHubのprivate key PEMファイルの内容を指定します。

**※【重要】privateKey以下の部分は先頭に2文字分スペースを挿入してください**

## 作業完了後の手順

- 「**Organizationアカウントでchocott-backstageを立ち上げる**」で作業をされていた方は、[3. 環境変数の設定](../quick-start/organization.md#3-環境変数の設定)の手順から作業を続けてください。
