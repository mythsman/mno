(function (window, document) {

    // next link element
    let nextElement = document.querySelector('link[rel=next]');
    if (!nextElement) {
        return;
    }

    // post feed element
    let feedElement = document.querySelector('.post-list');
    if (!feedElement) {
        return;
    }

    let buffer = 300;

    let ticking = false;
    let loading = false;

    let lastScrollY = window.scrollY;
    let lastWindowHeight = window.innerHeight;
    let lastDocumentHeight = document.documentElement.scrollHeight;

    function onPageLoad() {
        if (this.status === 404) {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
            return;
        }

        // append contents
        let postElements = this.response.querySelectorAll('.infinite-post-feed');
        postElements.forEach(function (item) {
            // document.importNode is important, without it the item's owner
            // document will be different which can break resizing of
            // `object-fit: cover` images in Safari
            feedElement.appendChild(document.importNode(item, true));
        });

        // set next link
        let resNextElement = this.response.querySelector('link[rel=next]');
        if (resNextElement) {
            nextElement.href = resNextElement.href;
        } else {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
        }

        // sync status
        lastDocumentHeight = document.documentElement.scrollHeight;
        ticking = false;
        loading = false;
    }

    function onUpdate() {
        // return if already loading
        if (loading) {
            return;
        }

        // return if not scroll to the bottom
        if (lastScrollY + lastWindowHeight <= lastDocumentHeight - buffer) {
            ticking = false;
            return;
        }

        loading = true;

        let xhr = new window.XMLHttpRequest();
        xhr.responseType = 'document';

        xhr.addEventListener('load', onPageLoad);

        xhr.open('GET', nextElement.href);
        xhr.send(null);
    }

    function requestTick() {
        ticking || window.requestAnimationFrame(onUpdate);
        ticking = true;
    }

    function onScroll() {
        lastScrollY = window.scrollY;
        requestTick();
    }

    function onResize() {
        lastWindowHeight = window.innerHeight;
        lastDocumentHeight = document.documentElement.scrollHeight;
        requestTick();
    }

    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', onResize);

    requestTick();

})(window, document);
