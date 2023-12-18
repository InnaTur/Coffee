
$(document).ready(function () {
  var $video = $('.video__player');

  // Клік на кнопці "Почати відтворення"
  $('.video__btn').on('click', function () {
    var $image = $('.video__img');
    $image.hide(); // Приховати зображення
    $video.show(); // Показати відео
    $video[0].play(); // Відтворити відео
  });

  // Клік на самому відео
  $video.on('click', function () {
    if ($video[0].paused) {
      $video[0].play(); // Відтворити відео, якщо воно зупинене
    } else {
      $video[0].pause(); // Зупинити відео, якщо воно відтворюється
    }
  });

  // Зберігання та відновлення позиції відео
  $video.on('timeupdate', function () {
    sessionStorage.setItem('videoTime', $video[0].currentTime);
  });

  // Відновлення позиції відео при завантаженні сторінки
  var storedTime = sessionStorage.getItem('videoTime');
  if (storedTime) {
    $video[0].currentTime = storedTime;
  }
});

new WOW().init();

$(document).ready(function(){
  $(".slider, .slider-combo  ").slick({
    lazyLoad: "ondemand",
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 700,
  });
});

$(document).ready(function(){
  $(".giftset__switch-btn").click(function(){
      // Забираємо клас активності з усіх кнопок
      $(".giftset__switch-btn").removeClass("giftset__switch-btn--active");
      
      // Додаємо клас активності до поточної кнопки
      $(this).addClass("giftset__switch-btn--active");

      // Приховуємо усі блоки з контентом
      $(".giftset__item").hide();

      // Показуємо відповідний блок з контентом
      var contentId = $(this).attr("id").replace("button", "#item");
      $(contentId).show();
  });
});

$(document).ready(function () {
  // При кліці на іконку корзини
  $(".shopping-cart__btn").click(function () {
    $(".shopping-cart").fadeIn(); // З'являємо попап
  });

  // При кліці на хрестик у попапі
  $(".shopping-cart__exit").click(function () {
    $(".shopping-cart").fadeOut(); // Зникаємо попап
  });
});



$(document).ready(function() {
  var quantityNum = $('.quantity__num');
  var quantityUpBtn = $('.quantity__up');
  var quantityDownBtn = $('.quantity__down');
  var orderBlock = $('.order');
  var emptyCartMessage = $('.empty-cart-message');
  var shoppingCartBottom = $('.shopping-cart__bottom');
  var prices = $('.shopping-cart__price');
  var orderSumm = $('.order__summ');

  // Додайте обробники подій для кнопок "+" та "-"
  quantityUpBtn.on('click', function() {
    updateQuantity(1);
  });

  quantityDownBtn.on('click', function() {
    updateQuantity(-1);
  });

  function updateQuantity(change) {
    var currentQuantity = parseInt(quantityNum.text());
    var newQuantity = currentQuantity + change;

    if (newQuantity < 1) {
      // Приховати блок order та показати повідомлення
      orderBlock.hide();
      emptyCartMessage.show();
      shoppingCartBottom.hide();
    } else {
      // Показати блок order та приховати повідомлення
      orderBlock.show();
      emptyCartMessage.hide();
      shoppingCartBottom.show();
      quantityNum.text(newQuantity);

      // Отримати ціну одиниці товару
      var pricePerItem = parseFloat(prices.eq(0).text()) / currentQuantity;

      // Оновити ціну товару та загальну суму
      prices.each(function() {
        var newPrice = (newQuantity * pricePerItem).toFixed(3);
        $(this).text(newPrice);
      });

      updateTotalAmount();
    }
  }

  // Функція для оновлення загальної суми корзини
  function updateTotalAmount() {
    var totalAmount = 0;

    prices.each(function() {
      totalAmount += parseFloat($(this).text());
    });

    orderSumm.text(totalAmount.toFixed(3));
  }
});
