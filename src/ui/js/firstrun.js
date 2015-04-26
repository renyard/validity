(function() {
    'use strict';

    var toShow,
        // Get the query string, removing the "?".
        qs = window.location.search.substr(1);

    if (qs !== '') {
        toShow = document.getElementsByClassName(qs);
        // Cast to an array.
        toShow = Array.prototype.slice.call(toShow);

        // Remove the class name to show elements.
        toShow.forEach(function(elm) {
            elm.classList.remove(qs);
        });
    }
})();
