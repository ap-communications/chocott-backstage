# データベース

Backstageアプリケーション生成時はオンメモリデータベース（sqlite3）を使うように設定されています。
開発環境用でも無い限りこのまま利用することはないと思います。Backstageでは一般的なRDBMSとしてPostgresQLをサポートしています。

ここでは指定方法を見ていきます。（公式ドキュメントは [こちら](https://backstage.io/docs/tutorials/switching-sqlite-postgres/) をご覧ください。

## コンフィグレーションの修正

PostgreSQL Databaseを利用する場合、backend.databaseに指定を追加します。clientに `pg` を指定し connectionにはホスト名やポート、PostgreSQL Serverに接続する際のユーザー名やパスワードを指定します。また、connection poolの指定をする場合は knexConfig.poolにその内容を指定します。

```yaml
backend:
  database:
    # client: better-sqlite3
    # connection: ':memory:'
    # config options: https://node-postgres.com/apis/client
    client: pg
    connection:
      host: ${POSTGRES_HOST}
      port: ${POSTGRES_PORT}
      user: ${POSTGRES_USER}
      password: ${POSTGRES_PASSWORD}
      # https://node-postgres.com/features/ssl
      # you can set the sslmode configuration option via the `PGSSLMODE` environment variable
      # see https://www.postgresql.org/docs/current/libpq-ssl.html Table 33.1. SSL Mode Descriptions (e.g. require)
      # ssl:
      #   ca: # if you have a CA file and want to verify it you can uncomment this section
      #     $file: <file-path>/ca/server.crt
    # Refer to Tarn docs for default values on PostgreSQL pool configuration - https://github.com/Vincit/tarn.js
    # knexConfig:
    #   pool:
    #     min: 3
    #     max: 12
    #     acquireTimeoutMillis: 60000
    #     idleTimeoutMillis: 60000      
```

以下の項目はPostgreSQLの接続先情報です。

- POSTGRES_HOST
- POSTGRES_PORT
- POSTGRES_USER
- POSTGRES_PASSWORD

実行時に環境変数で定義いただくか、直接コンフィグレーションファイルの該当部分を実際の接続先情報に書き換えてください。
