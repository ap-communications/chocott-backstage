# 【補足】テンプレートを作りたい方へ

## ソフトウェアテンプレートの書き方の基礎を学ぶ

ソフトウェアテンプレートのyamlファイルを書きたい方は、まずは公式のページを参照するのがおすすめです。

- [Writing Templates](https://backstage.io/docs/features/software-templates/writing-templates/)

## chocott-backstageで利用できるテンプレートアクションの確認方法

chocott-backstageでどのようなテンプレートアクションが利用できるかを確認する手順を紹介します。

サイドメニューから「Create...」をクリックします。

![Initial Create... page](images/backstage-first-create.png)

「...」をクリックし、「Installed Actions」をクリックします。

![Click installed actions](images/backstage-click-installed-actions.png)

こちらで、ソフトウェアテンプレートで利用可能なアクションのチェックができます。

![Check installed actions list](images/backstage-check-installed-actions-list.png)

例として、GitHubリポジトリを作成する`publish:github`アクションを見てみましょう。  

**Input**

![publish:github input](images/backstage-templateaction-publishgithub-input.png)

**Output**

![publish:github output](images/backstage-templateaction-publishgithub-output.png)

**Examples**

![publish:github examples](images/backstage-templateaction-publishgithub-examples.png)

このように、利用できるInput、Output、Examplesを見て、テンプレート作成に生かすことができます。

chocott-backstageに登録されているものだけでも様々なアクションが用意されていますので、どんなアクションがあるかぜひチェックしてみてください。
