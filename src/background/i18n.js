var validity = (function(validity) {
    const DEFAULT_LANG = 'en-GB',
        SUPPORTED_LANGS = [
            'en-GB',
            'en-AR'
        ];

    var i18n = {},
        strings;

    i18n._init = function() {
        var re = /^([a-z]+)(\-?([a-z]+))/,
            iso = window.navigator.language,
            locale = validity.opts.option('lang'),
            lang,
            region;

        if (!locale) {
            locale = i18n._detectLocale();
        }

        // Parse locale into lang and region.
    };

    /**
     * @name _detectLocale
     * @description Detects preferred locale from browser settings.
     */
    i18n._detectLocale = function(accepted, supported) {
        accepted = accepted || window.navigator.languages;
        supported = supported || SUPPORTED_LANGS;

        for (var i in accepted) {
            if (supported.some((l) => accepted[i] === l)) {
                return accepted[i];
            }
        }

        // Fallback to a default.
        return DEFAULT_LANG;
    };

    i18n._getTranslations = function() {
        var xhr = new XMLHttpRequest();

        // Load translations.
        xhr.open('GET', '/_locales/' + lang + '/messages.json', false);
        xhr.send();
    };

    i18n.get = function(id) {
    };

    validity.i18n = i18n;
    return validity;
})(validity || {});
