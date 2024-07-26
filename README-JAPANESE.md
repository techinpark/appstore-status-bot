<p align="center"><img src="./.github/images/og.png" width="70%"></p>

![Fetch Appstore Info](https://github.com/techinpark/appstore-status-bot/workflows/Fetch%20Appstore%20Info/badge.svg)
![stars](https://img.shields.io/github/stars/techinpark/appstore-status-bot?color=yellow&style=social)
![forks](https://img.shields.io/github/forks/techinpark/appstore-status-bot?style=social)

[English Document](./README.md)  

# 初めに 🤷🏻‍♂️
App Store Connect status botはアプリの審査状態をSlackにメッセージを送ってあげるBotです。アプリの審査状態のチェックやチームと状態を共有したりができるよう作りました。   `github-actions` が使われて fastlaneの [Spaceship](https://github.com/fastlane/fastlane/tree/master/spaceship) ライブラリから手伝ってもらいました。ご利用なさる場合はこのリポジトリを `Fork` してください。 


# 追加された機能 🍯
- 🚀  AppStore Connect APIを使って　Appstoreの情報を読み込みします。
- 📣  アプリの審査状態がSlackに共有されます。
- 🌍  外国語のサポート (英語、韓国語、日本語)

# プレビュー 🤖
<img src="./.github/images/preview.png" width="70%">


# 使用 👨🏻‍💻

## 1. APIをコールするためにはトークンをまず作ります。 
`KEY ID` を得るために [App Store Connect](https://appstoreconnect.apple.com/)へ接続します。

1. `ユーザとアクセス`をクリック、 `キー` タブをクリックします。 
2.  新しいAPIキーを作成します。
3. `キー ID` をコピーしておきます。
4. `Issuer ID` もコピーしておきます。
5.  作られた `API Key file (.p8)` をダウンロードします。
  > ⚠️ ページを再読み込みすると二度とダウンロードが出来なるなるのでご注意を! 

## 2. 事前準備
6. SlackのWebhook URLを発行します。 
7. このリポジトリをForkします。


## 3. `Secrets`の設定

- リポジトリの設定から `Settings` - `Secrets and variables` - `New repository secret` 順番にコピーした項目を設定します。

### コピーした項目の設定

> PRIVATE_KEY: ダウンロードした `key file(.p8)`をテキストに開いて全部コピペして入れます。  
> KEY_ID : `キー ID`をここに入力します。  
> ISSUER_ID : `Issuer ID`もここに入力します。   
> BUNDLE_ID : 状態の確認したいアプリの `bundle identifier`を入力します。 (２個以上のアプリの場合は、「 」 スペースを入れずに、「,」記号を使うと動作します。)  
> ２個以上のアプリの場合は、カンマ記号を使い、スペースを入れずに入力してください
> SLACK_WEBHOOK :  SlackのWebhook URLを入力します。 
> DISCORD_WEBHOOK :  DiscordのWebhook URLを入力します。 (optional)  
> GH_TOKEN: Githubのトークンを入力します。 (`gists`と `repo` 権限が必要です。 )  
> GIST_ID: gistファイルを作成し、 URLに存在するキーをコピーして入力します。  
  - https://gist.github.com/techinpark/**9842e074b8ee46aef76fd0d493bae0ed**

## 4. 言語設定、インターバル設定

- [fetch.yml](./.github/workflows/fetch.yml) 

`workflow` ファイルに言語設定、スケジュールの設定ができます。基本 `15分`で動いてます。


# レファレンス 🙇🏻‍♂️

- https://github.com/fastlane/fastlane/tree/master/spaceship
- https://github.com/erikvillegas/itunes-connect-slack
- https://github.com/rogerluan/app-store-connect-notifier


# コントリビュート 
- オープンソースなので全てのPR大歓迎です。 🤩
