(function ($, root, undefined) {
    $(function () {
        'use strict';

        const ids = [
            "copyrightWindow",
            "subscribeWindow",
            "musicWindow",
            "videosWindow",
            "screensaverWindow"
        ];

        ids.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                dragElement(el);
            }
        });

        var x, y;

        function dragElement(elmnt) {
            let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            let dragHandle = elmnt.getElementsByClassName("drag-handle")[0];

            if (dragHandle) {
                dragHandle.onmousedown = dragMouseDown;
                dragHandle.ontouchstart = dragMouseDown;
            } else {
                elmnt.onmousedown = dragMouseDown;
                elmnt.ontouchstart = dragMouseDown;
            }

            function dragMouseDown(e) {
                e = e || window.event;
                e.preventDefault();

                if (e.type.startsWith('touch')) {
                    let evt = e.originalEvent || e;
                    let touch = evt.touches[0] || evt.changedTouches[0];
                    x = touch.pageX;
                    y = touch.pageY;
                } else {
                    x = e.clientX;
                    y = e.clientY;
                }

                pos3 = x;
                pos4 = y;

                document.onmouseup = closeDragElement;
                document.onmousemove = elementDrag;

                document.ontouchend = closeDragElement;
                document.ontouchcancel = closeDragElement;
                document.ontouchmove = elementDrag;
            }

            function elementDrag(e) {
                e = e || window.event;
                e.preventDefault();

                if (e.type.startsWith('touch')) {
                    let evt = e.originalEvent || e;
                    let touch = evt.touches[0] || evt.changedTouches[0];
                    x = touch.pageX;
                    y = touch.pageY;
                } else {
                    x = e.clientX;
                    y = e.clientY;
                }

                pos1 = pos3 - x;
                pos2 = pos4 - y;
                pos3 = x;
                pos4 = y;

                elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            }

            function closeDragElement() {
                document.onmouseup = null;
                document.onmousemove = null;
                document.ontouchend = null;
                document.ontouchcancel = null;
                document.ontouchmove = null;
            }
        }
    });
})(jQuery, this);