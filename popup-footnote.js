(function () {
    'use strict';

    if (/ibooks|图书|圖書|図書/i.test(navigator.userAgent)) return;

    let popup = null;
    let currentLink = null;
    const footnoteCache = new Map();
    let resizeTimer = null;
    let initialized = false;

    function getPopup() {
        if (popup) return popup;

        popup = document.createElement('p');
        popup.className = 'popup';

        const container = document.querySelector('.wrap') || document.body;
        container.appendChild(popup);

        return popup;
    }
    function getFootnoteContent(link) {
        const href = link.getAttribute('href') || '';
        const id = href.charAt(0) === '#' ? href.slice(1) : href;
        if (!id) return '';

        if (!footnoteCache.has(id)) {
            const el = document.getElementById(id);
            footnoteCache.set(id, el ? el.textContent : '');
        }
        return footnoteCache.get(id);
    }

    function positionPopup(link, popupEl) {
        const linkRect = link.getBoundingClientRect();
        const popupRect = popupEl.getBoundingClientRect();

        let pRect = linkRect;
        const parent = link.parentElement;

        if (parent) {
            const pRects = parent.getClientRects();
            if (pRects.length) {
                const linkCenterX = linkRect.left + linkRect.width / 2;
                const linkCenterY = linkRect.top + linkRect.height / 2;

                let closest = pRects[0];
                let minDist = Infinity;

                for (let i = 0; i < pRects.length; i++) {
                    const rect = pRects[i];
                    const dist = Math.hypot(
                        linkCenterX - (rect.left + rect.width / 2),
                        linkCenterY - (rect.top + rect.height / 2)
                    );
                    if (dist < minDist) {
                        minDist = dist;
                        closest = rect;
                    }
                }
                pRect = closest;
            }
        }

        const gap = 8;
        const padding = 15;

        let top = linkRect.top - popupRect.height - gap;
        let left = linkRect.left;

        if (top < 0) top = linkRect.bottom + gap;

        if (left + popupRect.width > pRect.right - padding) {
            left = pRect.right - popupRect.width - padding;
        }
        if (left < padding) left = padding;

        popupEl.style.top = top + 'px';
        popupEl.style.left = left + 'px';
    }

    function showPopup(link) {
        if (currentLink === link && popup && popup.classList.contains('is-shown')) return;
        currentLink = link;

        const popupEl = getPopup();
        popupEl.textContent = getFootnoteContent(link);

        popupEl.classList.remove('is-hiding', 'is-visible');
        popupEl.classList.add('is-shown');

        requestAnimationFrame(function () {
            if (currentLink !== link) return;

            positionPopup(link, popupEl);

            void popupEl.offsetWidth;
            popupEl.classList.add('is-visible');
        });
    }
    function hidePopup() {
        if (!popup || !popup.classList.contains('is-shown') || popup.classList.contains('is-hiding')) {
            return;
        }

        const popupEl = popup;
        currentLink = null;

        popupEl.classList.remove('is-visible');
        popupEl.classList.add('is-hiding');

        const finishHiding = function () {
            popupEl.removeEventListener('animationend', finishHiding);
            popupEl.removeEventListener('webkitAnimationEnd', finishHiding);

            if (!popupEl.classList.contains('is-hiding')) return;

            popupEl.classList.remove('is-hiding', 'is-shown');
        };

        popupEl.addEventListener('animationend', finishHiding);
        popupEl.addEventListener('webkitAnimationEnd', finishHiding);
    }

    function getLinkFromEvent(e) {
        const target = e.target;
        if (!target || target.nodeType !== 1) return null;
        return target.closest ? target.closest('.footnote-link') : null;
    }

    function onPointerOver(e) {

        if (e.pointerType !== 'mouse') return;

        const link = getLinkFromEvent(e);
        if (!link) return;

        if (e.relatedTarget && link.contains(e.relatedTarget)) return;
        showPopup(link);
    }

    function onPointerOut(e) {
        if (e.pointerType !== 'mouse') return;

        const link = getLinkFromEvent(e);
        if (!link) return;

        if (e.relatedTarget && link.contains(e.relatedTarget)) return;
        hidePopup();
    }

    function onPointerDown(e) {

        if (e.pointerType === 'mouse') return;

        const link = getLinkFromEvent(e);
        if (link) {
            showPopup(link);
        } else if (popup && popup.style.display !== 'none' && !popup.contains(e.target)) {
            hidePopup();
        }
    }

    function onResize() {
        if (popup && popup.style.display !== 'none' && currentLink) {
            positionPopup(currentLink, popup);
        }
    }

    function onResizeDebounced() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(onResize, 100);
    }

    function init() {
        if (initialized) return;
        initialized = true;

        document.addEventListener('pointerover', onPointerOver, true);
        document.addEventListener('pointerout', onPointerOut, true);
        document.addEventListener('pointerdown', onPointerDown, true);
        window.addEventListener('resize', onResizeDebounced, { passive: true });

        const isDesktop = /windows|x11|mac/i.test(navigator.userAgent);
        if (isDesktop) {
            const bodyElement = document.body;
            if (bodyElement && bodyElement.bgColor) {
                bodyElement.parentNode.style.backgroundColor = bodyElement.bgColor;
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
})();
