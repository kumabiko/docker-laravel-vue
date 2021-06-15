# docker-laravel-vue
# 起動方法

### Dockerを起動
`docker-compose up -d`

### コンテナ内にログイン
`docker-compose exec vuesplash_web bash`

### 開発用サーバーを立ち上げる
`php artisan serve --host 0.0.0.0 --port 8081`

### ファイルの更新を監視し、更新されたら自動ビルド
`npm run watch`