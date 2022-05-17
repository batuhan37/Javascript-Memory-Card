/**
 *  oyun amacı: 2 kart seçip eşleşip eşleşmediğini bulmak
 *  kontrol edilmesi gereken hususlar:
 *  maksimum 2 tane kart seçilmeli
 *  bunlardan 1. seçilmeden 2. seçilemez
 * 2 kart seç ve eşleşmediğini kontrol et

 */

let score = 0; // oyuncu skoru
let heart = 3; // kalp sayısı
let isFirstCardSelected = false; // 1. kart seçildi ise true olur
let holdCard = false; // 1. ve 2. kartlar seçildi ise true olur

let cards = document.querySelectorAll(".game__card");
let startGameEl = document.getElementById("startGame");
let scoreEl = document.getElementById("score");
let heartEl = document.getElementById("heart");
const heartItemElement = `<span><i class='bx bxs-heart'></i></span>`;

let card1 = null; // seçilen 1. kart
let card2 = null; // seçilen 2. kart




function openCard() {
  //  card1 ve card2 seçildiğinde card1 ve card2 değerleri kontrol edilirken yeni kartın açılmasını önlemek amacıyla kullanılıyor.
  if (holdCard) return;
  //  this değeri tıkladığım card ı verir. Tıkladığım card ile elimdeki card1 değeri aynı ise hiç birşey yapılmaz
  if (this === card1) return;

  // tıkladığım card ın class listesi içerisine style.css içindeki turn stilini de ekledik.
  this.classList.add("turn");

  // Amacı: Daha 1. card seçilmemişken tıklanan cardın değerini card1 değişkeni atama yapılır ve ilk kart seçildi mi değişkeninin değeri true. Dolayısı ile başka bir karta tıklandığında  bu adım bi daha çalışmaz
  if (!isFirstCardSelected) {
    card1 = this;
    isFirstCardSelected = true;

    return;
  }

  card2 = this;

  checkForMatch();
}
// eğer eşleşme doğru ise score arttırmak için
function incrementScore() {
  score += 10;
  scoreEl.innerHTML = score;
}

function decrementScore() {
  score -= 10;
  scoreEl.innerHTML = score;
}

function decrementHeart() {
  heart--;
  changeHeart();
}

// Seçilen kartların eşleşip eşleşmediğini kontrol eder.
function checkForMatch() {
  let isMatch = card1.dataset.animal === card2.dataset.animal;


  if (isMatch) {
    disableCards();
    incrementScore();
  } else {
    closeCard();
    decrementScore();
    decrementHeart();
  }
}


//seçili kartlara tekrar tıklama yapılmaması için  disablecard fornksiyonu oluşturduk

function disableCards() {
  card1.removeEventListener("click", openCard);
  card2.removeEventListener("click", openCard);
  resetBoard();
}

// kartlar eşleşmediğinde kapatmak için closecard fonksiyonu oluşturdum

function closeCard() {
  holdCard = true;

  setTimeout(() => {
    card1.classList.remove("turn");
    card2.classList.remove("turn");

    resetBoard();
  }, 1500);
}

// card 1 ve card 2 de tutulan değeri sıfırladım
function resetBoard() {
  isFirstCardSelected = false;
  holdCard = false;
  card1 = null;
  card2 = null;

}

function startGame() {
  // elimizdek oyun cardlarının hepsine ilk olarak turn stilini eklenir ve kullanıcının geçek cardları 2sn boyunca görmesi sağlanır.
  cards.forEach(function (card) {
    card.classList.add("turn");
    // 2sn sonunda cardların gizlenmesi için animasyonu tersine çeviren return stili eklenir ve önceden eklenmiş olan turn stili kaldırılır.
    setTimeout(() => {
      card.classList.add("return");
      card.classList.remove("turn");

      // Cardların gizlenme animasyonu tamamlandıktan sonra da 500ms sonra return stili de kaldırılır.
      setTimeout(() => {
        card.classList.remove("return");
      }, 500);

      // ve her bir card'a tıklanma eventi eklenir.
      card.addEventListener("click", openCard);
    }, 2000);
  });
}

// kalpleri yazdır.
function changeHeart() {
  heartEl.innerHTML = "";

  for (let i = 0; i < heart; i++) {
    heartEl.innerHTML += heartItemElement;
  }
}

//oyunu başlatma

startGameEl.addEventListener("click", startGame);
scoreEl.innerHTML = score;
changeHeart();


