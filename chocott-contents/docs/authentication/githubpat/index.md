# GitHub PATの取得

パーソナルアカウントでchocott-backstageを利用する場合、GitHubのFine-grained personal access token（PAT）を使用してGitHubリポジトリにアクセスします。

## PATの作成手順

GitHubにサインインし、[Fine-grained personal access tokens](https://github.com/settings/personal-access-tokens) にアクセスします。

「Generate new token」を選択します。

![Generate new token](./githubpat-generate-new-token.png)

以下のように設定を行います。

| 項目名 | 入力内容 |
|-------|------|
|Token name| <トークン名として任意の文字列> |
|Description| <任意の文字列> |
|Resource owner| <自身のアカウント> |
|Expiration| <トークンの利用期限> |

![GitHub PAT new token settings](./githubpat-new-token-settings.png)

**Repository access**は「All repositories」を選択します。

![GitHub PAT repository settings](./githubpat-new-token-repository-settings.png)

**Permissions**では以下の項目のパーミッションを設定します。  

| 項目名 | 指定内容 | 備考 |
|-------|---------|-----|
| Administration | Read & write | リポジトリ作成のため |
| Commit statuses | Read-only | |
| Contents | Read & write | |
| Environments | Read & write | テンプレートでGitHub Environmentsを作成する場合 |
| Issues | Read & write | |
| Members |Read-only | |
| Metadata |Read-only | |
| Pull requests | Read & write | |
| Secrets | Read & write | テンプレートでGitHub Action Repository Secretsを作成する場合 |
| Variables | Read & write | テンプレートでGitHub Action Repository Variablesを作成する場合 |
| Workflows | Read & write | テンプレートでWorkflowを作成する場合 |

![GitHub PAT permissions](./githubpat-new-token-permissions.png)

「Generate token」を選択します。

![GitHub PAT generate token](githubpat-new-token-generate-token.png)

PATに付与するPermissionsの設定を確認したうえで、Generate tokenをクリックします。  
PATの場合は一度作成してからPermissionの設定を変更することができないので、間違えないようにご注意ください。

![GitHub PAT confirm generate token](githubpat-new-token-confirm-generate-token.png)

作成が完了したらトークンが払い出されますので、この値をメモしておきましょう。

![GitHub PAT copy token](githubpat-new-token-copy-token.png)
