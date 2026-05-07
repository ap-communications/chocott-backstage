# GitHub Appの登録（パーソナルアカウント）

chocott-backstageはGitHubを利用してユーザーの認証を行います。GitHubで認証を行うにはGitHub Appの登録が必要になります。GitHub Appの登録にはそのアカウントのオーナー権限が必要です。

以下の手順にそってGitHub Appを作成してください。
GitHub App作成の詳細については[GitHub Docs](https://docs.github.com/ja/apps/creating-github-apps/registering-a-github-app/registering-a-github-app) をご参照願います。

## 1. SettingsからGitHub App作成画面に遷移

GitHubにアクセスし右上のユーザーアイコンをクリックします。

![Overview](./personal-overview.png)

設定ダイアログが開きますので、「Settings」を選択します。

![Settings](./personal-settings.png)

「Settings」画面が開きましたら、左側サイドメニューの一番下にある「Developer settings」を選択します。

![Choose developer settings](./personal-choose-developer-setting.png)

アプリケーション一覧が表示されます。左側サイドメニューで「GitHub Apps」を選択してGitHub Apps一覧画面を表示し、右上の「New GitHub App」ボタンをクリックします。

![personal developer setting](./personal-new-github-app.png)

## 2. GitHub Appの作成

GitHub Appの登録画面が表示されますので必要な情報を入力します。以下はBackstageをローカルPC上で動かすことを想定した内容となっています。

| 項目名 | 内容 |
|-------|------|
|GitHub App name|GitHub Appとして登録するアプリケーション名を指定します。ここでは`chocott-backstage-local` とします。なお、GitHub App名はGitHub全体でグローバルに一意である必要があります。すでに使用されている場合は `chocott-backstage-local-<your-username>` のようにご自身のユーザー名などを付加して一意な名前にしてください。 |

![GitHub App 1](./github-app-1.png)

| 項目名 | 内容 |
|-------|------|
|Homepage URL| `http://localhost:3000` と指定します。 |
|Callback URL| `http://localhost:7007/api/auth/github/handler/frame` と指定します。|
|Expire user authentication tokens|チェックしたままとします。|
|Request user authorization (OAuth) during installation| チェックします。 |

![GitHub App 2](./github-app-2.png)

**【Webhook】**

Webhookは現在使用していませんので、「Active」のチェックを外してください。

**【Permission】**

以下の項目のパーミッションを設定します。パーソナルアカウントでの利用では、GitHub AppはOAuthによるユーザー認証のみに使用します。バックエンドのGitHub連携はPATが担うため、リポジトリ操作の権限は不要です。

| 項目名 | 指定内容 | 備考 |
|-------|---------|-----|
| Metadata | Read-only | GitHub App動作に必要な最小権限 |

最後に `only on this account` を選択します。

![GitHub App 3](./github-app-3.png)

入力が完了したら `Create GitHub App` ボタンをクリックします。

## 3. Client secretの作成

アプリケーションが作成されたら、まずApp IDおよびClient IDを確認し、メモしておきましょう。  
その後、`Generate a new client secret` をクリックします。

![App general](./github-app-general.png)

シークレットが作成されますので、表示されているClient secretをメモします。  
（Client secretはこの画面でのみ表示されるため、ご注意ください）

![Generate client secret](./github-app-generate-client-secret.png)

## 4. App Install

シークレットキーの作成まで完了したら、GitHub Appをインストールします。  
`https://github.com/settings/profile`にアクセスし、「Developer settings」をクリックします。

![Choose developer settings](./personal-choose-developer-setting.png)

作成したGitHub App名横の「Install」ボタンを実行してください。

![Install App](personal-github-app-install.png)

### GitHub Appインストール時のリポジトリの範囲について

インストール時に「All repositories」または「Only select repositories」を選択できます。

![Install App Target](personal-github-app-install-target.png)

ここでは、 **「All repositories」を選択することを推奨します。**

理由：Backstageのソフトウェアテンプレート機能を使用してリポジトリを新規作成する場合、作成先のリポジトリに対してGitHub Appのアクセス権が必要になります。「Only select repositories」を選択した場合、新規作成したリポジトリは自動的にアクセス対象に含まれないため、テンプレートからのリポジトリ作成時にエラーが発生します。

「Only select repositories」を選択する場合は、Backstageで管理するすべてのリポジトリを手動で追加する必要があります。また、テンプレートで新規リポジトリを作成した後は、GitHub Appの設定画面から手動でそのリポジトリを追加してください。

## 5. まとめ（取得した情報の確認）

以下の値をそれぞれ取得できているかどうか確認してください。  

- App IDの文字列
- Client IDの文字列
- Client Secretの文字列

## 作業完了後の手順

- 「**パーソナルアカウントでchocott-backstageを立ち上げる**」で作業をされていた方は、[2. GitHub PATの取得](../../../quick-start/personal.md#2-github-patの取得)の手順から作業を続けてください。

