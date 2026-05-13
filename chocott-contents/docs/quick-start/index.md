# Quick start

こちらのページでは、chocott-backstageを利用する手順についてまとめています。

## 目次

- [Quick start](#quick-start)
  - [目次](#目次)
  - [1. リポジトリのコピー](#1-リポジトリのコピー)
  - [2. chocott-backstageを立ち上げる](#2-chocott-backstageを立ち上げる)
    - [2.1 Organizationアカウントで利用する場合](#21-organizationアカウントで利用する場合)
    - [2.2 パーソナルアカウントで利用する場合](#22-パーソナルアカウントで利用する場合)
  - [3. ソフトウェアカタログを登録する](#3-ソフトウェアカタログを登録する)
  - [4. ソフトウェアテンプレートを利用する](#4-ソフトウェアテンプレートを利用する)
  - [補足：ソースコードを修正してみたい方](#補足ソースコードを修正してみたい方)

## 1. リポジトリのコピー

chocott-backstageを利用するには、まず本リポジトリをご自身のGitHub環境にコピーしてください。

[本リポジトリ](https://github.com/ap-communications/chocott-backstage)は [GitHubテンプレートリポジトリ](https://docs.github.com/ja/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) として設定されています。以下の手順で、ご自身のGitHub環境に新しいリポジトリとしてコピーすることができます。

`Use this template`ボタンをクリックするとサブメニューが表示されますので、そこで`Create a new repository`を選択してください。
コピーする先のリポジトリ情報を入力する画面が表示されますので、必要な項目を入力すれば完了です（Private repositoryにすることもできます）。

リポジトリのコピーが完了したら、ローカル環境にcloneしてください。

```shell
git clone https://github.com/<あなたのアカウント>/chocott-backstage.git --depth 1
cd chocott-backstage
```

## 2. chocott-backstageを立ち上げる

chocott-backstageを利用するには、GitHubアカウントにGitHub Appを登録する必要があります。

GitHub AppはOrganization（組織）アカウントまたはパーソナルアカウント（個人のGitHubアカウント）のどちらにも登録できます。利用形態に応じて、以下のいずれかの手順を参照してください。

### 2.1 Organizationアカウントで利用する場合

OrganizationのメンバーでBackstageを試してみたい場合は、OrganizationアカウントにGitHub Appを登録します。

- Organizationのユーザー・チーム情報をBackstageに取り込むことができます
- サインインできるのはOrganizationのメンバーのみとなります

以下の手順を参考に、Backstageを起動してみてください。

→ [Organizationアカウントでchocott-backstageを立ち上げる](./organization.md)

### 2.2 パーソナルアカウントで利用する場合

個人で検証・学習目的で利用する場合は、パーソナルアカウントにGitHub Appを登録します。

- GitHubアカウントを持っているすべての方がサインイン可能となります（ローカル環境での利用を想定）
- ログイン認証はGitHub Appを利用しますが、GitHub PATを利用してバックエンド認証を行います。

> [!NOTE]
> 【ご注意】BackstageのGitHubプラグインはGitHub Organizationを利用する前提に動作する仕様になっているため、  
> GitHub PATを利用する場合はカタログ表示機能などのプラグインの一部機能が正常に動作しないことがあります。予めご了承ください。

以下の手順を参考に、Backstageを起動してみてください。

→ [パーソナルアカウントでchocott-backstageを立ち上げる](./personal.md)

## 3. ソフトウェアカタログを登録する

chocott-backstageが無事起動できたら、以下の手順を参考にソフトウェアカタログを登録してみましょう。

→ [ソフトウェアカタログを登録する](../catalogs/index.md)

## 4. ソフトウェアテンプレートを利用する

ソフトウェアカタログが登録できたら、続いてソフトウェアテンプレートを利用してみましょう。

→ [ソフトウェアテンプレートを利用する](../software-templates/index.md)

## 補足：ソースコードを修正してみたい方

こちらは番外編となります。  
ソースコードから触れてみたい方はこちらを参照してください。

→ [補足：ソースコードを修正してみたい方](./manual-customize.md)