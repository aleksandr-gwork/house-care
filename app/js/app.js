
$(document).ready(function () {
    $(window).scroll(() => {
        $(window).scrollTop() > 0 ?
            $('.header').css('background', '#25252d') :
            $('.header').css('background', 'none');
    });

    function wow() {
        // WOW + Animate.cc animations

        const stepsItems = $('.steps-item');
        stepsItems.addClass('wow animate__flipInX');

        // Подключение WOW.js библиотеки
        new WOW({
            animateClass: 'animate__animated'
        }).init();
    }
    wow();


    function burger() {
        $('.burger').click(function () {
            $(this).toggleClass('active');
            $('.aside').toggleClass('aside-active');
        });
        $('.aside-list-item').click(function () {
            if ($('.burger').hasClass('active')) {
                $('.burger').click();
            }
        });
    }
    burger();


    function modal() {
        const images = document.querySelectorAll(".gallery-image img");
        let imgSrc;
        // get images src onclick
        images.forEach((img) => {
            img.addEventListener("click", (e) => {
                imgSrc = e.target.src;
                //run modal function
                imgModal(imgSrc);
            });
        });
        //creating the modal
        let imgModal = (src) => {
            const modal = document.createElement("div");
            modal.setAttribute("class", "modal");
            //add the modal to the main section or the parent element
            document.querySelector(".projects").append(modal);
            //adding image to modal
            const newImage = document.createElement("img");
            newImage.setAttribute("src", src);
            //creating the close button
            const closeBtn = document.createElement("i");
            closeBtn.setAttribute("class", "fas fa-times closeBtn");
            //close function
            closeBtn.onclick = () => {
                modal.remove();
            };
            modal.append(newImage, closeBtn);
        };
    }
    modal();


    function loadMore() {
        let thumb = $("#production_photos_more .thumb");
        let loadBtn = $("#loadMore");
        var size_li = thumb.length;
        var x = 2;
        thumb.css("display", "none");
        thumb.slice(0, x).fadeIn();
        loadBtn.click(function () {
            x = (x + 9 <= size_li) ? x + 9 : size_li;
            thumb.slice(0, x).fadeIn();
            if (size_li == x) {
                $("#loadMore").remove();
            };
        });
        if ($("a").is('#loadMore')) {
            if (size_li <= x) {
                $("#loadMore").remove();
            };
        };
    }
    loadMore();


    function slider() {
        const swiper = new Swiper(".swiper", {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            grabCursor: true,
            slideActiveClass: "active",
            initialSlide: 1,

            pagination: {
                el: ".pagination",
                clickable: true
            },

            // Media
            breakpoints: {

                1200: {
                    slidesPerView: 3,
                    centeredSlides: true,
                    navigation: {
                        nextEl: ".next",
                        prevEl: ".prev"
                    },
                },
            }
        });
    }
    slider();


    let loader = $('.loader-box');
    var inputsTel = document.querySelectorAll('input[type="tel"]');

    Inputmask({
        "mask": "+7(999) 999-99-99",
        showMaskOnHover: false
    }).mask(inputsTel);

    $('.consultation-form-btn').click(function () {
        let hasError = false;

        let nameInputPopup = $('#namePopup');
        let phoneInputPopup = $('#phonePopup');

        let form = $('.form');
        let checkbox = $('input[name="agreed"]:checked').length > 0;
        let nameInput = $('input[name="name"]');
        let nameInputForm = $('.block-name');
        let phoneInput = $('input[name="phone"]');
        let phoneInputForm = $('.block-phone');
        let customCheckbox = $('.checkbox-view');
        let checkboxPopup = $('#checkboxPopup');

        $('.error-input').hide();
        $('.consultation-form-input').removeClass('error');
        $('.checkbox-view').removeClass('error');

        if (!nameInput.val() && !nameInputPopup.val()) {
            nameInputForm.next().show();
            nameInputForm.addClass('error');
            hasError = true;
        }

        if ((!phoneInput.val() || !phoneInput.val().match(/^\+7\(\d{3}\)\s\d{3}[-]\d{2}[-]\d{2}$/)) && (!phoneInputPopup.val() || !phoneInputPopup.val().match(/^\+7\(\d{3}\)\s\d{3}[-]\d{2}[-]\d{2}$/))) {
            phoneInputForm.next().show();
            phoneInputForm.addClass('error');
            hasError = true;
        }

        if (!checkbox || !checkboxPopup) {
            customCheckbox.addClass('error');
            hasError = true;
        }

        if (nameInputPopup.val()) {
            nameInput = nameInputPopup;
        }

        if (!hasError) {
            loader.css('display', 'flex');
            $.ajax({
                method: "POST",
                url: "https://testologia.ru/checkout",
                data: { name: nameInput.val(), phone: phoneInput.val() }
            })
                .done(function (msg) {
                    loader.hide();
                    if (msg.success) {
                        form[0].reset();
                        form[1].reset();
                        form.hide();
                        $('.consultation-success').css('display', 'flex');
                        setTimeout(function () {
                            $('.consultation-success').hide();
                            form.css('display', 'flex');
                        }, 3000);
                    } else {
                        form[0].reset();
                        form[1].reset();
                        alert("Возникла ошибка, позвоните нам по телефону");
                    }
                });
        }
    })

    $('.show_popup').click(function () { // Вызываем функцию по нажатию на кнопку
        var popup_id = $('#' + $(this).attr("rel")); // Связываем rel и popup_id
        $(popup_id).fadeIn(); // Открываем окно
        $('.overlay_popup').fadeIn(); // Открываем блок заднего фона
    })
    $('.overlay_popup').click(function () { // Обрабатываем клик по заднему фону
        $('.overlay_popup, .popup').hide(); // Скрываем затемнённый задний фон и основное всплывающее окно
    })

    $('#closeBtnForm').click(function () { // Обрабатываем клик по кнопке закрытия
        $('.overlay_popup, .popup').fadeOut(); // Скрываем затемнённый задний фон и основное всплывающее окно
        $('.show_popup').removeClass('active'); // Скрываем кнопку
    })


    // START tippy
    tippy('#popItem1', {
        content: '<div class="techPop"><h5>Неразрывний каркас</h5><div>Монтаж стен этажей внутри дома и по всему периметру выполняется единым массивом.</div></div>',
        allowHTML: true,
        placement: 'bottom',
        theme: 'pop',
    });
    tippy('#popItem2', {
        content: '<div class="techPop"><h5>5 камерные окна</h5><div>Обеспечивает исключительную сохранность тепла в доме</div></div>',
        allowHTML: true,
        placement: 'bottom',
        theme: 'pop',
    });
    tippy('#popItem3', {
        content: '<div class="techPop"><h5>Диагональный раскос</h5><div>Система диагональных раскосов позволяет создать оптимальный вентиляционный зазор для капитальных стен и наружной отделки</div></div>',
        allowHTML: true,
        placement: 'bottom',
        theme: 'pop',
    });
    tippy('#popItem4', {
        content: '<div class="techPop"><h5>Плитная ветрозащита</h5><div>Используемая влагостойкая ветрозащитная плита обеспечивает дополнительную шумоизоляцию стен</div></div>',
        allowHTML: true,
        placement: 'bottom',
        theme: 'pop',
    });
    tippy('#popItem5', {
        content: '<div class="techPop"><h5>Сборка силовых узлов</h5><div>Основные силовые узлы наших домов оцинкованы, что позволяет быть уверенными в исключительной прочности и долговечности конструкции</div></div>',
        allowHTML: true,
        placement: 'bottom',
        theme: 'pop',
    });
    // END tippy
});
