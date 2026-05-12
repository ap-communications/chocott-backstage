# Terraform Azureサンプルテンプレート

このページでは、chocott-backstageで提供しているソフトウェアテンプレートの一つである **Terraform Azureサンプルテンプレート** について説明します。

## テンプレートの概要

Terraform（Azure）構成のサンプルテンプレートです。Resource Group、Storage Account、CosmosDBを作成するTerraform構成ファイルを含むGitHubリポジトリを新規作成します。

> [!NOTE]
> このテンプレートはTerraformの構成ファイルを払い出すものであり、Azureリソースへの実際のデプロイは対象外です。

テンプレート払い出しの手続きと同時に、以下の処理が行われます。

1. テンプレートディレクトリをコピーし、ユーザーが入力した値をコード内に置換
2. 新規リポジトリを作成し、1のコード群をプッシュ
3. コミットを検知し、GitHubワークフローの内容に基づいてGitHub Actionsを実行
4. Backstageのソフトウェアカタログへ登録

![Template flow image](./images/flow-terraform-azure.svg)

## 前提条件

このテンプレートを利用するには、BackstageとGitHubの連携設定が完了している必要があります。  
設定が完了していない場合は [GitHub Integration](../integration/index.md) をご確認ください。

## テンプレートの登録

登録手順は [【テンプレート共通】テンプレート登録手順](./register-software-template.md) を参照してください。
登録するURLを入力する際には、以下のURLを使用してください。

```
https://github.com/ap-communications/chocott-backstage/blob/main/chocott-contents/scaffolders/terraform-azure/terraform-azure-catalog-info.yaml
```

## テンプレートの使い方

左サイドバーの **Create...** からテンプレート一覧を開き、**Terraform Azureサンプル** テンプレートを選択して **Choose** をクリックします。

![Choose the Terraform Azure template](./images/terraform-azure-template-choose.png)

フォームに以下の情報を入力します。

### ステップ1：Terraform構成情報の入力

| 項目 | 入力する値 |
|---|---|
| リソースプレフィックス | Azureリソース名に使用するプレフィックス（英小文字・数字のみ、3〜24文字） |

![Enter Terraform configuration](./images/terraform-azure-template-info-input.png)

入力が完了したら **Next Step** をクリックします。

### ステップ2：GitHubリポジトリの設定

**Personalアカウント利用時**

| 項目 | 入力する値 |
|---|---|
| Owner | <GitHubアカウント名> |
| Repository | <新しく払い出すリポジトリ名（既存のリポジトリと被らない名前を指定）> |

**Organization（組織）アカウント利用時**

| 項目 | 入力する値 |
|---|---|
| Owner | <GitHub Organization名> |
| Repository | <新しく払い出すリポジトリ名（Organizationにある既存のリポジトリと被らない名前を指定）> |

入力が完了したら **Review** をクリックします。

![Enter repository settings](./images/terraform-azure-template-repo-input.png)

入力した内容を確認し、 **Create** をクリックして作成を行います。

![Create from template](./images/terraform-azure-template-create.png)

無事に作成されたらソフトウェアカタログに登録されたコンポーネントを開きます。  
エラーが発生した場合は、ログを確認してください。

![Open catalog page](./images/terraform-azure-open-catalog.png)

カタログページの **Source** リンクからGitHubリポジトリにアクセスできます。

![Open source repository from catalog](./images/terraform-azure-catalog-open-source.png)

リポジトリ作成後、自動的にGitHub Actionsが起動します。生成されたリポジトリのActionsタブでTerraformのフォーマットチェック・Lintチェックのワークフローが正常に完了していることを確認してください。

![Check initial GitHub Actions run](./images/terraform-azure-check-initial-actions.png)

## このテンプレートで何がわかるか

このテンプレートを通じて、ソフトウェアテンプレートとGitHubの仕組みを組み合わせることで、インフラ構成ファイルのリポジトリ払い出し・CI/CDパイプラインの実行・ソフトウェアカタログへの登録までを一気通貫に行えることが確認できたかと思います。

このサンプルはシンプルな構成にとどめていますが、実際の運用に向けてテンプレートをカスタマイズする際は、たとえば以下のような内容を盛り込むことが考えられます。

- 組織内で利用するAzureリソースの標準構成をあらかじめ定義したTerraformモジュールを含める
- GitHub Actionsワークフローに、`terraform plan`の実行やセキュリティスキャン（tfsecなど）のステップをあらかじめ定義しておく
- Terraformの運用方法や命名規則をまとめた利用ガイドをテンプレートに含め、TechDocsとしてカタログページから参照できるようにしておく

こうしたカスタマイズを加えることで、払い出し時に必要な各種手続きをプラットフォームチームの直接支援を介することなく、インフラチームがセルフサービスで完結できるようになります。

## 次のステップ：他のテンプレートを試す

このテンプレート以外にもいくつかテンプレートをご用意しています。  
[サンプルテンプレート](./index.md#サンプルテンプレート)からぜひ試してみてください。
