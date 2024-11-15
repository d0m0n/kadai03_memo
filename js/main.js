// 「どこで」ボタンの設定
$("#where").on("click", function () {
  // 店舗名を設定
  let words = [
    "サツドラで",
    "ツルハドラッグで",
    "アークスで",
    "ラルズで",
    "マックスバリュで",
    "ラッキーで",
    "ダイイチで",
    "ジェイ・アール生鮮市場で",
    "うおはんで",
    "イオンで",
    "イオンモールで",
    "DCMで",
    "業務スーパーで",
    "トライアルで",
    "セブン-イレブンで",
    "ローソンで",
    "ファミリーマートで",
    "セイコーマートで",
    "Yショップで",
    "シティーマーケットで",
  ];
  // 1から20までを生成
  let num = Math.floor(Math.random() * 19) + 1;
  // console.log(num, "where");
  let randomWord = words[num];
  // 他のボタンの入力を上書きせず追加する
  let currentText = $("#shopping").val();
  $("#shopping").val(currentText + " " + randomWord);
  // 音を鳴らす
  $("#seSelect")[0].play();
});

// 「なにを」ボタンの設定
$("#what").on("click", function () {
  // 商品名を設定
  let words = [
    "ポテトフライを",
    "蒲焼さん太郎を",
    "おやつカルパスを",
    "ブタメンを",
    "ガブリチュウを",
    "ビッグカツを",
    "ヤンヤンつけボーを",
    "ヤングドーナツを",
    "キャベツ太郎を",
    "ねるねるねるねを",
    "ジャガイモを",
    "ニンジンを",
    "タマネギを",
    "トマトを",
    "ナスを",
    "シメジを",
    "豚バラ肉を",
    "鶏モモ肉を",
    "カレー粉を",
    "牛乳を",
  ];
  // 1から20までを生成
  let num = Math.floor(Math.random() * 19) + 1;
  // console.log(num, "what");
  let randomWord = words[num];
  // 他のボタンの入力を上書きせず追加する
  let currentText = $("#shopping").val();
  $("#shopping").val(currentText + " " + randomWord);
  // 音を鳴らす
  $("#seSelect")[0].play();
});

// 「いくつ」ボタンの設定
$("#howMany").on("click", function () {
  // 数量を設定
  let words = [
    "1つ",
    "2つ",
    "3つ",
    "4つ",
    "5つ",
    "6つ",
    "7つ",
    "8つ",
    "9つ",
    "10つ",
  ];
  // 1から10までを生成
  let num = Math.floor(Math.random() * 9) + 1;
  // console.log(num, "howMany");
  let randomWord = words[num];
  // 他のボタンの入力を上書きせず追加する
  let currentText = $("#shopping").val();
  $("#shopping").val(currentText + " " + randomWord);
  // 音を鳴らす
  $("#seSelect")[0].play();
});

// 「リストに追加」ボタンの設定
$("#add").on("click", function () {
  // 現在の時刻を取得
  let currentDate = new Date();

  // 年、月、日、時、分、秒を個別に取得
  let year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1; // 月は 0 から始まるので +1
  let day = currentDate.getDate();
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  let seconds = currentDate.getSeconds();

  // フォーマットした時間を変数にする
  let date =
    year +
    "-" +
    month +
    "-" +
    day +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;

  // 「key」として日付を設定
  const key = date;
  // 入力フォームの内容を「value」に設定
  const value = $("#shopping").val();

  // ローカルストレージに保存する
  localStorage.setItem(key, value);

  // 画面に表示するためにhtmlと入力された文字を組み合わせる
  let html = $(`
        <div id=noteList class="noteArea" data-key="${key}">
        <h6 class="index">${key}</h6>
        <div class="noteLine">
          <input type="checkbox" name="task" id="done" class="checkbox"/>
          <div class="note">${value}</div>
          <img id="delete" class="push" src="./img/x.svg" alt="バツボタン">
        </div>
      </div>
    `);
  // 音を鳴らす
  $("#seButton")[0].play();

  // jQueryのメソッド　画面に表示する（htmlを追加する）
  $("#area").append(html);
  // スライドインしてくるアニメーション
  // 予めCSS（.noteArea）で「display: none;、  position: relative;、right: -100%;」を設定している
  html.show().animate({ right: "0%", opacity: 1 }, 300, "swing");

  // 入力欄を空欄にする（クリア）
  $("#date").val("");
  $("#shopping").val("");
});

// ページ読み込み：保存データ取得表示
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  const value = localStorage.getItem(key);
  const html = `
        <div id=noteList class="noteArea2" data-key="${key}">
        <h6 class="index">${key}</h6>
        <div class="noteLine">
          <input type="checkbox" name="task" id="done" class="checkbox"/>
          <div class="note">${value}</div>
          <img id="delete" class="push" src="./img/x.svg" alt="バツボタン">
        </div>
      </div>
    `;
  $("#area").append(html);
}

// 個別消去
$("#area").on("click", ".push", function () {
  let key = $(this).closest("#noteList").data("key");
  // キーを削除する
  localStorage.removeItem(key);
  // 要素を削除する
  $(this).closest("#noteList").remove();
  // 音を鳴らす
  $("#seSwipe")[0].play();
  // console.log(key);
});

// 選択消去と全消去
// チェックボックスの状態が変わったときの処理
$(".checkbox").change(function () {
  if ($(".checkbox:checked").length > 0) {
    $("#clear").text("選択削除");
    // $("#clear").attr("id", "partClear");
    // 音を鳴らす
    $("#seCheck1")[0].play();
  } else {
    $("#clear").text("全て削除");
    // $("#partClear").attr("id", "clear");
    // 音を鳴らす
    $("#seCheck2")[0].play();
  }
});

// ボタンがクリックされたときの処理
$("#clear").click(function () {
  if ($(this).text() === "選択削除") {
    $(".checkbox:checked").each(function () {
      // キーを参照する
      let key = $(this).closest("#noteList").data("key");
      // キーを削除する
      localStorage.removeItem(key);
      $(this).closest("#noteList").remove();
      // 音を鳴らす
      $("#seSwipe")[0].play();
    });
  } else {
    localStorage.clear();
    $("#area").empty();
    // 音を鳴らす
    $("#seSwipe")[0].play();
  }
});
