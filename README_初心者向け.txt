更新方法

■ 週間スケジュールを変えたい時
data/schedule.json を開いて編集します。

例：
{
  "day": "TUE",
  "date": "06/25",
  "time": "22:00",
  "title": "ゲーム配信",
  "type": "game"
}

typeに入れられる文字：
off   = おやすみ
game  = ゲーム配信
talk  = 雑談配信
event = 企画枠
main  = メイン配信

■ グッズの文章を変えたい時
index.html の GOODS の中にある
「キーホルダー・マグカップ・アクスタ・ステッカー・缶バッジ」
の部分だけ変えればOKです。

■ 商品画像を変えたい時
assets/goods/suzuri-products.png を同じ名前で差し替えます。

編集したら Commit changes を押すだけです。
