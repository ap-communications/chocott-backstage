# chocott-backstage

このリポジトリは [Backstage](https://backstage.io) Appのテンプレートです。

## なぜchocott-backstageを作ったのか

[Backstage](https://backstage.io) はオープンソースプロジェクトです。
Backstageの利用を開始するには [公式ドキュメント(Getting Started)](https://backstage.io/docs/getting-started/) にしたがってアプリケーションを生成し、データベースを用意し、各種連携システムの設定を行い、利用するBackstage pluginを導入するなど、いくつかのステップを踏まなければなりません。もちろん開発環境なども準備する必要があります。

この作業が「試したいだけなのに面倒だな」と感じる方も多くいらっしゃると思います。こうした方に向けてこのリポジトリを作成しました。

このリポジトリのコードは以下のことを行った状態になっています。

- Backstageアプリケーションの生成
- GitHubの一部Pluginコードを組み込み
- PostgreSQL Serverを利用するためのコード修正
- Backstageのコンフィグレーション
- Backstageのコンテナイメージ作成
- ローカル環境利用のためのDocker composeファイルの用意

利用するためには GitHub Appの登録をし、環境変数にいくつかの項目を設定していただく必要はありますが、あとはdocker composeコマンドを実行するだけで
BackstageのGitHub連携機能まですぐにお試しいただくことができます。

生成したソースコードもリポジトリにありますので、コードを修正しながらお試しいただくこともできます。お好みのPluginを独自に組み込みお試しいただくなどすることも可能です。
ぜひBackstageを利用して、その価値を感じて頂きたいと思います。

## システム構成

![system-overview](./chocott-contents/docs/system-overview.drawio.png)

## ドキュメント

chocotto-backstageに関する情報は [docs](./chocott-contents/docs/index.md) を参照願います。

chocott-backstageの利用方法は [Quick start](./chocott-contents/docs/quick-start/index.md) をご確認ください。

