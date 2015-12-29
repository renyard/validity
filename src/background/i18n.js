var validity = (function(validity) {
    const DEFAULT_LANG = 'en-GB',
        SUPPORTED_LANGS = [
            'en-GB',
            'en-AR'
        ];

    var i18n = {},
        loaded = [false, false],
        initCalled = false,
        reqQueue = [],
        strings,
        defaultStrings;

    /**
     * @name _init
     * @private
     * @description Initialises the module, fetching translations and emptying the request queue.
     */
    function _init() {
        var locale = validity.opts.option('lang') || undefined,
            lang,
            region;

        initCalled = true;

        [lang, region] = i18n._parseLocale(locale);

        i18n._getTranslations(lang, region).then(
            data => {
                strings = data;
                loaded[0] = true;

                if (loaded.every(v => v === true)) {
                    purgeQueue();
                }
            },
            status => {});

        i18n._getTranslations(...i18n._parseLocale(DEFAULT_LANG)).then(
            data => {
                defaultStrings = data;
                loaded[1] = true;

                if (loaded.every(v => v === true)) {
                    purgeQueue();
                }
            },
            status => {});
    }

    function purgeQueue() {
        while (reqQueue.length > 0) {
            let func = reqQueue.pop();

            if (typeof func === 'function') {
                func();
            }
        }
    }

    /**
     * @name _parseLocale
     * @description Parse locale into language and region.
     * @param locale string Locale string to parse.
     */
    i18n._parseLocale = function(locale) {
        var re = /^(\w*)\-?(\w*)/,
            lang,
            region;

        if (locale === undefined) {
            locale = i18n._detectLocale();
        }

        // Parse locale into lang and region.
        [, lang, region] = re.exec(locale);

        return [
            lang.toLowerCase(),
            region.toLowerCase()
        ];
    };

    /**
     * @name _detectLocale
     * @description Detects preferred locale from browser settings.
     * @param [accepted] array Array of locale strings accepted by the user agent.
     * @param [supported] array Array of local strings supported by the application.
     */
    i18n._detectLocale = function(
            accepted=window.navigator.languages,
            supported=SUPPORTED_LANGS
        ) {

        for (var i in accepted) {
            if (supported.some(l => accepted[i] === l)) {
                return accepted[i];
            }
        }

        // Fallback to a default.
        return DEFAULT_LANG;
    };

    /**
     * @name _getTranslations
     * @description Loads the translations file for the given locale.
     * @param lang string The language for which to source strings.
     * @param [region] string The region for which to source strings.
     */
    i18n._getTranslations = function(lang, region) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest(),
                locale = lang;

            if (region !== undefined) {
                locale += '_' + region.toUpperCase();
            }

            // Load translations.
            xhr.responseType = 'json';
            xhr.open('GET', `/_locales/${locale}/messages.json`);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    resolve(xhr.response);
                }
                else if (xhr.readyState === 4 && xhr.status !== 200) {
                    reject(xhr.status);
                }
            };
            xhr.send();
        });
    };

    function resolveString(id, resolve, reject) {
        var string;

        if (strings[id]) {
            string = strings[id].message;
        }
        else if (defaultStrings[id]) {
            // No translation, fallback to default.
            string = defaultStrings[id].message;
        }
        else {
            console.warn(`No translation found for ${id}.`);
            reject();
            return;
        }

        if (typeof string === 'string') {
            resolve(string);
        }
        else {
            reject();
        }
    }

    /**
     * @name get
     * @description Get the translation for a given string ID.
     * @param id string The ID of the required string.
     * @returns Promise Passes in the requested string to the resolve function.
     */
    i18n.get = function(id) {
        // Initialise module, if it's not already been done.
        if (initCalled !== true) {
            _init();
        }

        return new Promise((resolve, reject) => {
            var string,
                stringResolver = resolveString.bind(
                    this, id, resolve, reject
                );

            if (loaded.every(v => v === true)) {
                stringResolver();
            }
            else {
                // Strings have not been loaded. Add to queue.
                reqQueue.push(stringResolver);
            }
        });
    };

    /**
     * @name populateDom
     * @description Populates all translations in the DOM.
     */
    i18n.populateDom = function(root=document) {
        var elms;
        
        elms = root.querySelectorAll('[data-i18n]');
        // Convert nodelist to array.
        elms = [].slice.call(elms);

        elms.forEach((v, i, a) => {
            var elm = v,
                id = elm.getAttribute('data-i18n');

            i18n.get(id).then(string => {
                elm.innerHTML = string;
            });
        });
    };

    // Populate static pages on load.
    document.addEventListener('DOMContentLoaded', e => i18n.populateDom());

    validity.i18n = i18n;
    return validity;
})(validity || {});
