# ソフトウェアカタログを登録する

[ソフトウェアカタログ](https://backstage.io/docs/features/software-catalog/) はBackstageの主要な機能の１つです。
みなさんが開発するソフトウェア・サービスの情報をカタログ情報としてBackstage上で管理します。

chocott-backstageの初期状態ではBackstageが用意しているサンプルカタログのみが見える状態です。ここにカタログを追加していきましょう。

## 1. 既存のカタログのインポート

最初にchocott-backstageのリポジトリ情報を閲覧できるカタログを登録してみましょう。

![register existing catalog](register-existing-catalog.png)

サイドメニューから `Create...` を選択し、Create a New Component画面で「REGISTER EXISTING COMPONENT」ボタンをクリックします。すると登録画面が表示されます。

![register catalog url](register-url.png)

Select URLのところに、以下のURLを入力し、「ANALYZE」ボタンをクリックしてください。

```
https://github.com/ap-communications/chocott-backstage/blob/main/chocott-contents/catalog-info.yaml
```

ちなみに実際にブラウザで上記のURLにアクセスするとわかりますが、これはこれから登録するソフトウェアカタログを定義するファイルです。  
Backstageに登録されるエンティティはこのようなyamlファイルで定義されています。

次のような画面が表示されますので、「IMPORT」ボタンをクリックしましょう。

![review registering catalog](register-review.png)

IMPORTが完了すると以下のような画面が表示されます。

![register completed](register-completed.png)

ここで「VIEW COMPONENT」をクリックします。

組織利用している場合は、「VIEW COMPONENT」をクリックすると以下のようなダイアログが出ることがあります。  
これはサインイン時の認証とは別にGitHubへのアクセストークン取得のためのものとなっています。「LOG IN」ボタンをクリックして先に進んでください。

![catalog view first time](catalog-view-firsttime.png)

「VIEW COMPONENT」をクリックすると、IMPORTしたカタログ情報が表示されます。
こちらが最新のchocott-backstageリポジトリの情報です。

![Catalog view overview](catalog-view-overview.png)

`CI/CDタブ` ではchocott-backstageリポジトリにおけるGitHub Actionsの実行結果を見ることができます。

![Catalog view cicd](catalog-view-cicd.png)

`PULL REQUESTSタブ` ではその時点でのPull Requestの一覧が表示されます。  
Pull Request一覧の画面で、「ALL」を選択すると過去にマージ／クローズしたPull Request一覧が表示されます。

![Catalog view pull requests](catalog-view-pr.png)

`DOCSタブ`ではこのリポジトリ内に登録されているドキュメントを閲覧することができます。

![Catalog view docs](catalog-view-docs.png)

## 2. catalog-info.yamlをカスタマイズする

前のセクションで紹介した最低限の設定でもカタログの登録と基本的な表示は動作しますが、`catalog-info.yaml` にはさらに多くの設定項目が用意されています。  
これらを追加することで、カタログページに表示される情報をより豊かにすることができます。

ご興味のある方はぜひ、下記を参考に[先ほど追加したcatalog-info.yaml](https://github.com/ap-communications/chocott-backstage/blob/main/chocott-contents/catalog-info.yaml)に変更を加え、どのように変化するかを試してみてください。  
（mainブランチに変更を加えた後に、再度 [1. 既存のカタログのインポート](#1-既存のカタログのインポート)の作業を行いカタログを再インポートする必要がありますのでご注意ください）

### description（説明文）

`metadata.description` にコンポーネントの説明文を記述することで、カタログの一覧ページや詳細ページにその内容が表示されます。

```yaml
metadata:
  name: my-service
  description: ユーザー認証を担当するAPIサービスです。
```

### tags（タグ）

`metadata.tags` にタグの一覧を設定することで、カタログの検索やフィルタリングに活用できます。

```yaml
metadata:
  name: my-service
  tags:
    - typescript
    - api
    - backend
```

### links（外部リンク）

`metadata.links` に外部リンクを設定することで、カタログの詳細ページにリンクを表示できます。ドキュメントサイトや監視ダッシュボードなど、そのサービスに関連するURLをまとめて登録しておくと便利です。

```yaml
metadata:
  name: my-service
  links:
    - url: https://example.com/docs
      title: ドキュメント
      icon: docs
    - url: https://example.com/dashboard
      title: 監視ダッシュボード
      icon: dashboard
```

### Relations（依存関係）

`spec.dependsOn` に依存するコンポーネントやリソースを記述することで、コンポーネント間の依存関係を定義できます。カタログの **RELATIONS** タブでこれらの関係を視覚的に確認できます。

また、`spec.system`（所属するシステム）や `spec.subcomponentOf`（親コンポーネント）なども設定することで、より詳細な関係性を表現できます。  
組織内に存在する各システムの関係性はどうなっているか？というのを把握するために便利です。

```yaml
spec:
  type: service
  owner: guests
  lifecycle: experimental
  dependsOn:
    - component:default/auth-service
    - resource:default/main-database
  system: my-platform
```

---

設定項目の詳細は[Backstage公式ドキュメント（Descriptor Format）](https://backstage.io/docs/features/software-catalog/descriptor-format)をご参照ください。

なお、ここで紹介した設定項目はBackstageが標準で提供しているものに限られます。  
別途プラグインを導入している場合は、そのプラグインが `catalog-info.yaml` 向けに用意している設定を追加することで、カタログページに表示される情報をさらに充実させることができます。

## 3. 新規カタログの作成（既存のリポジトリがある方向け）

用意したBackstageが監視可能な範囲に既存のGitHubリポジトリをお持ちの方は、そのGitHubリポジトリ用のカタログを作成し、Backstageに取り込んでみましょう。  
（Organization単位でBackstageを用意した方は同じOrganization内のリポジトリが、個人単位で用意した方は同じアカウントで管理しているGitHubリポジトリ専用のカタログを新規作成することが可能です）

### catalog-info.yamlの作成

カタログ情報は、通常それぞれのリポジトリのリポジトリルートにcatalog-info.yamlというファイルを作成し、それを上記の既存カタログのインポートによって取り込みます。  
※chocott-backstageでは、独自で追加したものはできるだけchocott-contentsフォルダ以下に保存するようにしたため、意図的にchocott-contentsフォルダ直下に配置しています

一番簡単なカタログ情報の内容は以下の通りです。  
なお、カタログ情報の種別や詳細は[Backstage公式ドキュメント](https://backstage.io/docs/features/software-catalog/descriptor-format) をご確認ください。

```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: <サービス名称 半角英数や-_といった記号で指定> # Backstage上のカタログ内で一意であれば問題ない
  annotations:
    github.com/project-slug: <GitHubユーザー名>/<リポジトリ名> 
    # github.com/project-slug: <GitHub Organization名>/<リポジトリ名> # Organization利用の場合は1行上をコメントアウトし、こちらを有効化
spec:
  type: service
  owner: guests
  lifecycle: experimental
```

Backstage上のカタログで表示させたいGitHubリポジトリのリポジトリルートにcatalog-info.yamlという名前で作成し、上記のyamlファイルをコピーしてそのまま貼り付けてください。  
そのうえでご自身の環境に合わせて `metadata.name` や `metadata.annotations` の内容を書き換えてmainブランチにコミットしましょう。

その後、[既存のカタログのインポート](#1-既存のカタログのインポート)手順と同じように作成したcatalog-info.yamlのURLで登録してください。  
カタログインポートが完了後、`github.com/project-slug` パラメータに記載されたリポジトリからPull RequestsやCI/CDのタブに表示する情報を取得します。

## ソフトウェアカタログを利用する利点

１つのリポジトリだけですと、「GitHubの画面をみればいいのでは？」と思うかもしれません。

では、3つ以上のリポジトリで開発をしている場合はどうでしょうか？
GitHubの画面で確認する場合、あちこちの画面をいったりきたりしなければなりません。  
ソフトウェアカタログという形にまとめれば、比較的容易にGitHubのPull Requestの状況やGitHub Actionsの実行結果を確認することができます。

また、Backstageで用意されているPluginはそれだけではありません。すでに様々な外部サービスと連携する [Plugin](https://backstage.io/plugins) が提供されています。そうしたPluginを利用することで、複数のサービスの状況をBackstage上で簡単に確認することができるようになります。

さらにPluginは独自で追加することもできます。OSSで用意されていないならば独自にPluginを開発して、Backstageをより使いやすい環境に拡張することができます。

## 次のステップ：ソフトウェアテンプレートの利用

Backstage上でソフトウェアカタログが登録出来たら、続いてソフトウェアテンプレートを利用してみましょう。
サンプルのソフトウェアテンプレートも用意しています。

- **[ソフトウェアテンプレートを利用する](../software-templates/index.md)**