(function ($, root, undefined) {
    $(function () {
        'use strict';

        const ids = [
            "copyrightWindow",
            "subscribeWindow",
            "musicWindow",
            "videosWindow",
            "screensaverWindow",
            "dinoGameWindow"
        ];

        ids.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                dragElement(el);
            }
        });

        function dragElement(elmnt) {
            let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            let initialX = 0, initialY = 0;
            let isDragging = false;
            const threshold = 5; // مقاومة خفيفة – العتبة بالبكسل

            const dragHandle = elmnt.getElementsByClassName("drag-handle")[0];

            const getEventCoords = (e) => {
                if (e.type.startsWith('touch')) {
                    let evt = e.originalEvent || e;
                    let touch = evt.touches[0] || evt.changedTouches[0];
                    return { x: touch.pageX, y: touch.pageY };
                } else {
                    return { x: e.clientX, y: e.clientY };
                }
            };

            const dragMouseDown = (e) => {
                e = e || window.event;
                e.preventDefault();

                const coords = getEventCoords(e);
                pos3 = initialX = coords.x;
                pos4 = initialY = coords.y;
                isDragging = false;

                document.onmouseup = closeDragElement;
                document.onmousemove = elementDrag;
                document.ontouchend = closeDragElement;
                document.ontouchcancel = closeDragElement;
                document.ontouchmove = elementDrag;
            };

            const elementDrag = (e) => {
                e = e || window.event;
                e.preventDefault();

                const coords = getEventCoords(e);
                const dx = coords.x - initialX;
                const dy = coords.y - initialY;

                if (!isDragging) {
                    if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) return;
                    isDragging = true;
                }

                pos1 = pos3 - coords.x;
                pos2 = pos4 - coords.y;
                pos3 = coords.x;
                pos4 = coords.y;

                elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            };

            const closeDragElement = () => {
                document.onmouseup = null;
                document.onmousemove = null;
                document.ontouchend = null;
                document.ontouchcancel = null;
                document.ontouchmove = null;
            };

            if (dragHandle) {
                dragHandle.onmousedown = dragMouseDown;
                dragHandle.ontouchstart = dragMouseDown;
            } else {
                elmnt.onmousedown = dragMouseDown;
                elmnt.ontouchstart = dragMouseDown;
            }
        }
    });
})(jQuery, this);