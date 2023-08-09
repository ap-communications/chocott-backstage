# Chocott-Backstageの使い方

## ユーザー認証

Chocott-backstageはGitHubを利用してユーザーの認証を行います。GitHubで認証を行うにはGitHub Appの登録が必要になります。GitHub Appの登録にはそのアカウントのオーナー権限が必要です。
[authentication](./authentication/index.md) のページにそって、個人アカウントまたは組織アカウントにGitHub Appを登録してください。

## アクセス承認

アクセスの承認はBackstage内で管理するユーザー情報・グループ情報を用いて行います。このユーザー・グループ情報はGitHubのユーザー・チームの情報と同期することができます。
[authorizatoin](./authorization/index.md) に沿って、同期機能を有効にしてください。

## Integration

BackstageのBackend Serverが各外部サービスに連携するための設定が Integration です。
Chocott-backstageはGitHubの連携がありますので、[Integration](./integration/index.md) に沿って登録を進めてください。

## TechDocs

TechDocsはGitHubリポジトリ上で記載されたMarkdownファイルをHTMLに変換し、Backstage上で表示する機能です。
本機能はHTML作成に mkdocs というツールを利用しています。ローカルPC上でBackstageを実行する場合、あらかじめ [TechDocs](./techdocs/index.md) に沿ってツール等をインストールする必要があります。

# サインイン

## パーミッションの確認

GitHubアカウントで最初にサインインする際、以下のようなダイアログが表示されます。表示されましたら「Authorize ... 」のボタンをクリックしてください。2回目のサインイン時には表示されません。

![signin approve permission](./signin-approve-permission.png)