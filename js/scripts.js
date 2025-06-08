var phraseCarouselInterval;
let topZIndex = 100; // لرفع كل نافذة جديدة للأعلى

(function($, root, undefined) {
    $(function() {
        'use strict';
        startTime();
        
        $(document).on('click', '.btn-close', function() {
            const win = $(this).closest('.window');
            win.toggleClass('hidden');
            win.css({ top: '', left: '', transform: '', zIndex: '' });
            if ($(".subscribe-window").hasClass("hidden")) {
                clearInterval(phraseCarouselInterval);
                phraseCarouselInterval = null;
                $(".scrolling-phrase-items").css("top", "-35px");
            }
        });
        
        $(document).on('touchend', '.btn-close', function() {
            const win = $(this).closest('.window');
            win.toggleClass('hidden');
            win.css({ top: '', left: '', transform: '', zIndex: '' });
            if ($(".subscribe-window").hasClass("hidden")) {
                clearInterval(phraseCarouselInterval);
                phraseCarouselInterval = null;
                $(".scrolling-phrase-items").css("top", "-35px");
            }
        });
        
        $(document).on('touchend', '.btn-toggle-mobile-menu', function() {
            $(this).closest('.window').toggleClass('menu-active');
        });
        
        $(document).on('click', '.nav-copyright', function() {
            openWindow('copyright-window');
        });
        
        $(document).on('click', '.time-toggle', function() {
            const win = $('.world-time-container');
            if (win.hasClass('hidden')) {
                openWindow('world-time-container');
            } else {
                win.addClass('hidden');
                win.css({ top: '', left: '', transform: '', zIndex: '' });
            }
        });
        
        $(document).on('click', '.like-this-page', function() {
            $('.mirror-ball').removeClass('hidden');
            setTimeout(function() {
                $('.mirror-ball').addClass('hidden');
            }, 4000);
        });
        
        $(document).on('click', '.win-trigger', function() {
            const target = $(this).attr('data-trigger');
            openWindow(target);
            if (target == "subscribe-window" && !phraseCarouselInterval) {
                subscribePhraseCarousel(
                    document.querySelector(".signup-for-answers-answers"),
                    document.querySelector(".scrolling-phrase-items")
                );
            }
        });
        
        $(document).on('touchend', '.win-trigger', function() {
            const target = $(this).attr('data-trigger');
            openWindow(target);
            if (target == "subscribe-window" && !phraseCarouselInterval) {
                subscribePhraseCarousel(
                    document.querySelector(".signup-for-answers-answers"),
                    document.querySelector(".scrolling-phrase-items")
                );
            }
        });
        
        // إذا تم النقر على نافذة غير أمامية، اجعلها في الأمام
        $(document).on('click', '.window:not(.front)', function() {
            $('.window').removeClass('front');
            $(this).addClass('front');
            topZIndex++;
            $(this).css('z-index', topZIndex);
        });
        
        // Clock
        let nowIQ = moment().tz("Asia/Baghdad").format('hh:mm A');
        let nowUS = moment().tz("America/Los_Angeles").format('hh:mm A');
        let nowUK = moment().tz("Europe/London").format('hh:mm A');
        let nowJP = moment().tz("Asia/Tokyo").format('hh:mm A');
        $('#current-iq').html(nowIQ);
        $('#current-us').html(nowUS);
        $('#current-uk').html(nowUK);
        $('#current-jp').html(nowJP);
    });
})(jQuery, this);

// Fonts animation
const text = document.getElementById("changing-text");
const fonts2 = [
    'DOSANK24', 'TimesNewCustom', 'DOSANK16', 'Screenstar',
    'Tiny5', 'SixtyfourConvergence', 'PressStart2P',
    'PixelifySans', 'VariableFont_ROND', 'CoralPixels', 'DOSANK24'
];
let isPlaying2 = false;

async function loadFonts() {
    await Promise.all(fonts2.map(f => document.fonts.load(`16px "${f}"`)));
}

async function playLoop2() {
    if (isPlaying2) return;
    isPlaying2 = true;
    await loadFonts();
    const text = document.getElementById("changing-text");
    let i = 0;
    const interval = setInterval(() => {
        text.style.fontFamily = fonts2[i % fonts2.length];
        i++;
        if (i >= fonts2.length) {
            clearInterval(interval);
            isPlaying2 = false;
        }
    }, 150);
}

function enterSite() {
    $('#loading_overlay').addClass('hidden');
    playLoop2();
}

// ✅ فتح نافذة مع رفعها للأمام
function openWindow(windowAttr) {
    const win = $('.' + windowAttr);
    $('.window').removeClass('front');
    win.removeClass('hidden').addClass('front');
    topZIndex++;
    win.css('z-index', topZIndex);
}

// السنة الحالية
const year = new Date().getFullYear();
for (const el of document.getElementsByClassName("current-year")) {
    el.innerHTML = year;
}

// الوقت الحالي
function startTime() {
    var timer = document.getElementById('current-time');
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    if (timer != null) {
        m = checkTime(m);
        timer.innerHTML = h + ":" + m;
        setTimeout(startTime, 1000);
    }
}

function checkTime(i) {
    if (i < 10) { i = "0" + i };
    return i;
}

// الاشتراك وتحريك العبارات
function subscribePhraseCarousel(wrapper, items) {
    var posInitial,
        slides = items.getElementsByClassName('scrolling-phrase-slide'),
        slidesLength = 6,
        slideSize = 35,
        firstSlide = slides[0],
        lastSlide = slides[slidesLength - 1],
        cloneFirst = firstSlide.cloneNode(true),
        cloneLast = lastSlide.cloneNode(true),
        index = 0,
        allowShift = true;
    
    items.appendChild(cloneFirst);
    items.insertBefore(cloneLast, firstSlide);
    items.addEventListener('transitionend', checkIndex);
    
    function shiftSlide(dir, action) {
        items.classList.add('shifting');
        if (allowShift) {
            if (!action) { posInitial = items.offsetTop; }
            if (dir == 1) {
                items.style.top = (posInitial - slideSize) + "px";
                index++;
            } else if (dir == -1) {
                items.style.top = (posInitial + slideSize) + "px";
                index--;
            }
        };
        allowShift = false;
    }
    
    function checkIndex() {
        items.classList.remove('shifting');
        if (index == -1) {
            items.style.top = -(slidesLength * slideSize) + "px";
            index = slidesLength - 1;
        }
        if (index == slidesLength) {
            items.style.top = -(1 * slideSize) + "px";
            index = 0;
        }
        allowShift = true;
    }
    
    phraseCarouselInterval = setInterval(() => { shiftSlide(1) }, 2000);
}