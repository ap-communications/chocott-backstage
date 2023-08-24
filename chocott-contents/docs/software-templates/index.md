# ソフトウェアテンプレート

ソフトウェアテンプレート機能は Backstage が持つ主要機能のうちの１つです。
テンプレートとして登録された情報を元に、コードリポジトリ等に新たなリポジトリやファイルを追加することができます。

こちらが [公式ドキュメント](https://backstage.io/docs/features/software-templates/) です。

テンプレートは独自に追加することもできます。ここでは簡単な例として [ソフトウェアカタログ/catalog-info.yaml](../catalogs/index.md) を追加するテンプレートをご紹介します。

## catalog-info 作成のPull Requestを作成するテンプレート

ソフトウェアテンプレートを作成するためには以下の２つの情報が必要になります

- テンプレート用カタログ情報
- 作成するファイル内容（コンテンツ）

サンプルのソフトウェアカタログは [こちら](https://github.com/ap-communications/chocott-backstage/tree/main/chocott-contents/scaffolders/catalog-info) で公開しています。

### テンプレート用カタログ情報

テンプレート情報も通常のソフトウェアコンポーネントのカタログと同様にカタログファイルでその内容を定義します。（ [カタログファイル](https://github.com/ap-communications/chocott-backstage/tree/main/chocott-contents/scaffolders/catalog-info/create-pullreq-catalog-info.yaml)

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

なお、一部の文字列は置換処理を行うことができます。置換する文字列は上記の valuesのところで指定します。ここではname、owner、hasDocs という３つの項目を置換しようとしています。
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

このように一部の文字列を置換しながら、新しいリポジトリを作成したり、Pull Requestとして登録したりできるのが Backstageのソフトウェアテンプレートの特長になります。

なお、ここで紹介したサンプルテンプレートは実際にご利用いただくことができます。

[ソフトウェアカタログ](../catalogs/index.md) の「既存のカタログのインポート」の手順で以下のURLを指定していただければテンプレートとして取り込まれます。

```
https://github.com/ap-communications/chocott-backstage/tree/main/chocott-contents/scaffolders/catalog-info/create-pullreq-catalog-info.yaml
```

取り込まれたあとはサイドメニューから「Create...」を選択し、テンプレートが追加されていることをご確認ください。
