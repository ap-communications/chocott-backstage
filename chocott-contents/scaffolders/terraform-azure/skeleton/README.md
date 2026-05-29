# ${{ values.name }}

Terraform(Azure)ハンズオン用リポジトリです。Resource Group、Storage Account、CosmosDBを作成するTerraform構成ファイルが含まれています。

## 作成されるAzureリソース

| リソース | 名前 |
| ---------- | ------ |
| Resource Group | `rg-${{ values.prefix }}` |
| Storage Account | `st${{ values.prefix }}` |
| CosmosDB | `cosmos-${{ values.prefix }}` |

- **リージョン** : Japan East (`japaneast`)
- **CosmosDB容量モード** : Serverless

## ファイル構成

```text
.
├── main.tf         # リソース定義
├── variables.tf    # 入力変数
├── locals.tf       # リソース名の自動生成
├── versions.tf     # Terraform/Providerバージョン
├── outputs.tf      # 出力定義
├── .tflint.hcl     # TFLint設定
└── .github/
    └── workflows/
        └── tf-check.yml  # CI: fmt check + tflint
```

## 使い方

### 前提条件

- [Terraform](https://developer.hashicorp.com/terraform/install) `>= 1.6.0`
- Azure CLIまたはサービスプリンシパルによるAzure認証

### デプロイ手順

```bash
terraform init
terraform plan -var="prefix=<your-prefix>"
terraform apply -var="prefix=<your-prefix>"
```

### CI（GitHub Actions）

プッシュ・プルリクエスト時に以下のチェックが自動実行されます。

- `terraform fmt -check`: Terraformコードのフォーマットチェック
- `tflint`: azurermプラグインによる静的解析
