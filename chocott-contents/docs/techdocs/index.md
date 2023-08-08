# TechDocs

TechDocsはGitHubリポジトリ上で記載されたMarkdownファイルをHTMLに変換し、Backstage上で表示する機能です。
TechDocsは内部で [mkdocs](https://www.mkdocs.org/) というツールを利用しています。このため、ローカルPC上でbackstageを実行する場合には mkdocs ツールをあらかじめインストールしておかなければなりません。

## mkdocsとmkdocs pluginのインストール

### 事前準備

mkdocsはpythonで実装したプログラムです。このため事前に以下のものをインストールする必要があります。

- [Python](https://www.python.org/)
- [pip (Python pakcage manager)](https://pip.readthedocs.io/en/stable/installing/)

[mkdocs installation](https://www.mkdocs.org/user-guide/installation/) などに沿ってこれらのツールをインストールしてください。

### mkdocsとmkdocs pluginのインストール

pipコマンド（または brewコマンドなどを使っても構いません）でmkdocsをインストールしてください。

```bash
pip install mkdocs

```

インストールが完了したらbackstage用の [techdocs-core package](https://backstage.io/docs/features/techdocs/faqs/#what-is-the-mkdocs-techdocs-core-plugin)もインストールしてください。

```bash
pip3 install mkdocs-techdocs-core

```

以上で準備は終了です。
