# ソフトウェアテンプレート

ソフトウェアテンプレート機能はBackstageが持つ主要機能のうちの１つです。
テンプレートとして登録された情報を元に、コードリポジトリ等に新たなリポジトリやファイルを追加することができます。

こちらが [公式ドキュメント](https://backstage.io/docs/features/software-templates/) です。

## なぜソフトウェアテンプレートが必要なのか？

新しいプロジェクトやリポジトリを立ち上げる際、テンプレートがない状態では以下のような課題が生じやすくなります。

- フォルダ構成・CI/CD設定・ライブラリ選定などをゼロから決める必要があり、本来の開発以外の作業に時間を取られる
- 担当者やチームによって構成や品質にばらつきが生じる
- 新しいメンバーが参加したとき、どのように始めるかがわかりにくい

ソフトウェアテンプレートを活用すると、こうした課題を解消できます。

- 組織やチームが定めた標準的なリポジトリ構成やリソース設定を、UIベースで必要な情報を入力するだけでセルフサービスで払い出せる
- テンプレートからの払い出しによって組織として統一したいリポジトリ設定やコーディング規約、カタログ登録までを一気通貫で統一して揃えられる
- GitHubに限らず、他のSCMと連携させるようにカスタマイズすることができる
- クラウドベンダーやOSSの各種エコシステムと連携するプラグインを作ることもできる

このように、ソフトウェアテンプレートは **開発者の自律性** と **組織全体の標準化** を両立させるための仕組みです。

## 導入・運用にあたっての注意点

カスタマイズ性が高い分、複雑性や管理の手間も増えやすくなります。

ソフトウェアテンプレートを本格的に活用するためには、事前にアプリケーションの実行環境となるInternal Developer Platform（IDP）の整備や、Software Templateを継続的にメンテナンスするための体制を用意する必要があります。
こうした整備は、一般的に **プラットフォームチーム** と呼ばれる専門チームが担当することが多いです。

テンプレートは独自に追加することもできます。ここでは簡単な例として 

1. [ソフトウェアカタログ](../catalogs/index.md) を追加するテンプレートをご紹介します。
2. 

## catalog-info作成のPull Requestを作成するテンプレート

ソフトウェアテンプレートを作成するためには以下の２つの情報が必要になります

- テンプレート用カタログ情報
- 作成するファイル内容（コンテンツ）

サンプルのソフトウェアカタログは [こちら](https://github.com/ap-communications/chocott-backstage/tree/main/chocott-contents/scaffolders/catalog-info) で公開しています。

### テンプレート用カタログ情報

テンプレート情報も通常のソフトウェアコンポーネントのカタログと同様にカタログファイルでその内容を定義します。（[カタログファイル](https://github.com/ap-communications/chocott-backstage/tree/main/chocott-contents/scaffolders/catalog-info/create-pullreq-catalog-info.yaml)）

こちらのファイルで入力項目と、テンプレート作成時に実行する内容、テンプレート作成後Backstage側に反映する内容を記載します。

### 作成するファイル内容（コンテンツ）

上記のカタログ情報のなかで作成するファイル内容のフォルダを指定します。以下の部分

```yaml
    - id: fetch-base
      name: Fetch Base
      action: fetch:template
      input:
        url: ./contents   # コンテンツを格納したフォルダ
        values:
          name: ${{ parameters.name }}
          owner: ${{ parameters.owner }}
          hasDocs: ${{ parameters.hasDocs }}

```

ここで指定したフォルダの中身すべてが原則そのまま指定されたリポジトリにコピーされます。

なお、一部の文字列は置換処理を行うことができます。置換する文字列は上記のvaluesのところで指定します。ここではname、owner、hasDocsという３つの項目を置換しようとしています。
置換先はコンテンツファイルの中身に記載します。例えば以下のような内容です。

```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: ${{ values.name | dump }}
spec:
  type: service
  owner: ${{ values.owner | dump }}
  lifecycle: production
```

`${{ values.name | dump }}` はnameで指定した文字列に置換されます。また簡単な条件分岐なども記述できます。

このように一部の文字列を置換しながら、新しいリポジトリを作成したり、Pull Requestとして登録したりできるのがBackstageのソフトウェアテンプレートの特長になります。

なお、ここで紹介したサンプルテンプレートは実際にご利用いただくことができます。

[ソフトウェアカタログ](../catalogs/index.md) の「既存のカタログのインポート」の手順で以下のURLを指定していただければテンプレートとして取り込まれます。

```
https://github.com/ap-communications/chocott-backstage/tree/main/chocott-contents/scaffolders/catalog-info/create-pullreq-catalog-info.yaml
```

取り込まれたあとはサイドメニューから「Create...」を選択し、テンプレートが追加されていることをご確認ください。

## 提供しているテンプレート一覧

chocott-backstageでは以下のテンプレートを提供しています。

| テンプレート | 概要 |
|---|---|
| catalog-info作成のPull Requestを作成するテンプレート | 既存のリポジトリに `catalog-info.yaml` を追加するPull Requestを作成する |
| [Express API × TypeScriptテンプレート](./express-api-typescript.md) | Node.js/Express × TypeScriptのHTTP APIリポジトリを新規作成する |
