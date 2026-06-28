V37 初心者向け説明書

■ 保存OK / 保存NG
data内のJSONで download を見ます。

download: true
→ Download PNGボタンが出ます。保存OK。

download: false
→ Downloadボタンは出ません。右クリック・ドラッグ・長押しをしにくくします。

■ アイコンリングやフレーム追加
1. 画像を assets/fankit/frames/ にアップロード
2. data/rings.json を開く
3. 似ている行をコピー
4. title と image を変更
5. download は true
6. Commit changes

■ 限定コレクション追加
1. 画像を assets/special/ にアップロード
2. data/special_collection.json に追加
3. download は false

■ ゼト×ルカギャラリー追加
1. 画像を assets/gallery/zetoluka/ にアップロード
2. data/zetoluka_gallery.json に追加
3. download は false

■ スライド演出の確率変更
data/effects.json を編集。
weight が大きいほど出やすいです。0でオフ。

■ 注意
画像保存を100%完全に防ぐことはできません。
普通の右クリック保存・ドラッグ保存・スマホ長押し保存はかなりしにくくしています。
