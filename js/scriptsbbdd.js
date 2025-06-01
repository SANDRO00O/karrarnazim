var phraseCarouselInterval;

(function($, root, undefined) {
    
    $(function() {
        'use strict';
        startTime();
        $(document).on('click', '.btn-close', function() {
            $(this).closest('.window').toggleClass('hidden');
            if ($(".subscribe-window").hasClass("hidden")) {
                clearInterval(phraseCarouselInterval);
                phraseCarouselInterval = null;
                $(".scrolling-phrase-items").css("top", "-35px");
            }
        })
        $(document).on('touchend', '.btn-close', function() {
            $('.window').removeClass('menu-active');
            $(this).closest('.window').toggleClass('hidden');
            if ($(".subscribe-window").hasClass("hidden")) {
                clearInterval(phraseCarouselInterval);
                phraseCarouselInterval = null;
                $(".scrolling-phrase-items").css("top", "-35px");
            }
        })
        $(document).on('touchend', '.btn-toggle-mobile-menu', function() {
            $(this).closest('.window').toggleClass('menu-active');
        })
        $(document).on('click', '.nav-copyright', function() {
            $('.window').addClass('hidden');
            $('.copyright-window').toggleClass('hidden');
        })
        $(document).on('click', '.time-toggle', function() {
            $('.world-time-container').toggleClass('hidden');
        })
        $(document).on('click', '.like-this-page', function() {
            $('.mirror-ball').removeClass('hidden');
            setTimeout(function() {
                $('.mirror-ball').addClass('hidden');
            }, 4000);
        })
        $(document).on('click', '.win-trigger', function() {
            openWindow($(this).attr('data-trigger'));
            if ($(this).attr('data-trigger') == "subscribe-window" && !phraseCarouselInterval) {
                subscribePhraseCarousel(document.querySelector(".signup-for-answers-answers"), document.querySelector(".scrolling-phrase-items"));
            }
        })
        $(document).on('touchend', '.win-trigger', function() {
            $('.window').addClass('hidden');
            $('.window').removeClass('menu-active');
            openWindow($(this).attr('data-trigger'));
            if ($(this).attr('data-trigger') == "subscribe-window" && !phraseCarouselInterval) {
                subscribePhraseCarousel(document.querySelector(".signup-for-answers-answers"), document.querySelector(".scrolling-phrase-items"));
            }
        })
        $(document).on('click', '.window:not(.front)', function() {
            $('.window').removeClass('front');
            $(this).addClass('front');
        })
        
        /*-- Clock --*/
        let nowIQ = moment().tz("Asia/Baghdad").format('hh:mm A');
        let nowUS = moment().tz("America/Los_Angeles").format('hh:mm A');
        let nowUK = moment().tz("Europe/London").format('hh:mm A');
        let nowJP = moment().tz("Asia/Tokyo").format('hh:mm A');
        $('#current-iq').html(nowIQ);
        $('#current-us').html(nowUS);
        $('#current-uk').html(nowUK);
        $('#current-jp').html(nowJP);
        /*-- Clock End --*/
        
    });
})(jQuery, this);

// function unixLoading() {

//     // create an array with the lines of text
//     const lines = [  
//         "RGLINUX 2.3.15 2018-10-01 ETCD Copyright",  
//         "(C) 1986-2020 RG Inc. & Zeis Industries",  
//         "boot:",
//         "[??1.6148569] 18042: No controller found",
//         "?OpenBarager 0.15.1.88bc7e0 is",
//         "starting up RG Linux 2.3.15-1-grsec (x86 64)",
//         "CPU: LCARv7 Processor (412fc09a] revision 10 (LCARv7),",
//         "er=10c53c7d",
//         "CPU: PIPT / VIPT nonaliasing data cache,",
//         "VIP aliasing instruction cache",
//         "Machine: Redscale i.MX12 Octo/Heptabite",
//         "Device Tree)",
//         "model: QuantumRun 2-Box-i Dd",
//         "Truncating RAM at 10000000-8fffffff to",
//         "-Terriff (unalloc region overlap)",
//         "cma: CMA: reserved 512 Miß at 6e000000",
//         "Memory policy: ECC disabled, Data cache writealloc",
//         "PERCPU: Embedded 8 pages/cpu 081701000 s8576 r8192 dl6000 u32768",
//         "Built 1 zonelists in Zone order, mobility grouping",
//         "Total pages: 453136",
//         "Kernel command line: console=ttymxc0,115200 root=/dev/mmoblk0p2 rootfstype=ext43",
//         "PID hash table entries: 8096 (order:8, 16384 bytes)",
//         "devtmpfs: mounted",
//         "Freeing unused kernel memory: 264K (807£2000 - 80834000)",
//         "* /proc is already mounted",
//         "Mounting",
//         "/run?????",
//         "/run/openbarager: creating directory",
//         "* /run/lock: creating directory",
//         "* /run/lock: correcting owner",
//         "* Caching service dependencies???.",
//         "* Remounting devtmpfs on/dev???",
//         "* Mounting /dev/maucue????",
//         "* Updating nominal transmission???...??????3333 [ ok ]",
//         "* Caching active DM quads???.??22?2222?/ [ ok ]",
//         "* Starting tandem buffers???...??????????/ [ ok ]",
//         "* Compiling target paths???...??2?22?222/ [ ok ]",
//         "* Calibrating delay loop???..??2223???1/ [ ok ]",
//         "* Created slice System Slice???, 832?323?23/ [ ok ]",
//         "* Mounting Debug File System??? 23293939997 [ ok ]",
//         "* Checking local filesystems??? 3222222?22 / [ ok ]",
//         "* Mounting filesystems???? .?2?2222?322 / [ ok ]",
//         "Configuring kernel parameters??? ???2733227[ ok ]",
//         "Creating user login records???..?????",
//         "",
//         "",
//         "",
//         "* Mounting Debug Pile System?????????2??? [ ok ]",
//         "Checking local filesystems???..?????22??? [ ok ]",
//         "* Mounting filesystems????.",
//         ".??????????3[ ok ]",
//         "* Configuring kernel parameters???...??????????[ ok ]",
//         "* Creating user login records???...?????2?2?[ ok ]",
//         "Starting busybox syslog???",
//         "222333328 I ok 1",
//         "Welcome to RG Linux 2.3",
//         "Kernel 3.18.20-1-grsec on an x86 64 (/dev/ttyl)",
//         "localhost login: E E",

//     ];

//     // create a <pre> or <code> element to display the text
//     const output = document.getElementById("loading_unix_content");

//     // iterate over the lines of text
//     for (let i = 0; i < lines.length; i++) {
//         // get the current line of text
//         const line = lines[i];

//         // iterate over the characters in the current line of text
//         for (let j = 0; j < line.length; j++) {
//             // use the setTimeout function to delay the output of each character by 50 milliseconds
//             setTimeout(() => {
//                 // append the current character to the output element
//                 output.innerHTML += line[j];

//                 // scroll the output element to the bottom to show the latest character
//                 output.scrollTop = output.scrollHeight;
//                 if (j == lines.length - 1) {
//                     $('#loading_unix').addClass('hidden');
//                 }
//             }, 80 * j);
//         }

//         // add a newline character after each line of text
//         setTimeout(() => {
//             output.innerHTML += "\n";
//         }, 80 * line.length);
//     }
// }

// unixLoading();


/*-- Enter Site --*/

const text = document.getElementById("changing-text");
const fonts2 = [
    'DOSANK24', 'TimesNewCustom', 'DOSANK16', 'Screenstar',
    'Tiny5', 'SixtyfourConvergence', 'PressStart2P',
    'PixelifySans', 'VariableFont_ROND', 'CoralPixels', 'DOSANK24'
];

let isPlaying2 = false; // فلاغ للتأكد من عدم التكرار

async function loadFonts() {
    await Promise.all(fonts2.map(f => document.fonts.load(`16px "${f}"`)));
}

async function playLoop2() {
    // تجاهل التشغيل إن كان قيد العمل
    if (isPlaying2) return;
    
    isPlaying2 = true; // ابدأ التشغيل
    await loadFonts();
    const text = document.getElementById("changing-text");
    
    let i = 0;
    const interval = setInterval(() => {
        text.style.fontFamily = fonts2[i % fonts2.length];
        i++;
        if (i >= fonts2.length) {
            clearInterval(interval);
            isPlaying2 = false; // أعد السماح بالتشغيل بعد الانتهاء
        }
    }, 150);
}

function enterSite() {
    $('#loading_overlay').addClass('hidden');
    playLoop2();
}

/*-- End Enter Site --*/

/*-- Windows --*/
function openWindow(windowAttr) {
    $('.window').removeClass('front');
    $('.world-time-container').addClass('hidden');
    $('.' + windowAttr).removeClass('hidden').addClass('front');
}
/*-- End Windows --*/

/*-- Year --*/
const y = new Date();
let year = y.getFullYear();
document.getElementsByClassName("current-year").innerHTML = year;
/*-- End Year --*/

/*-- Current time --*/
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
    if (i < 10) { i = "0" + i }; // add zero in front of numbers < 10
    return i;
}
/*-- End Current time --*/

function subscribePhraseCarousel(wrapper, items) {
    var posInitial,
        slides = items.getElementsByClassName('scrolling-phrase-slide'),
        slidesLength = 6; //slides.length,
    slideSize = 35; //items.getElementsByClassName('scrolling-phrase-slide')[0].offsetTop,
    firstSlide = slides[0],
        lastSlide = slides[slidesLength - 1],
        cloneFirst = firstSlide.cloneNode(true),
        cloneLast = lastSlide.cloneNode(true),
        index = 0,
        allowShift = true;
    
    // Clone first and last slide
    items.appendChild(cloneFirst);
    items.insertBefore(cloneLast, firstSlide);
    wrapper;
    
    // Transition events
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
    phraseCarouselInterval = setInterval(() => { shiftSlide(1) }, 2.0 * 1000);
}

document.addEventListener("DOMContentLoaded", function() {
    stopLogoAnim();
})