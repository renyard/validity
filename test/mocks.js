(function() {
    var _storage = {},
        _storageChanged = function() {};

    window.chrome = {};
    chrome.tabs = {};
    chrome.extension = {
        onRequest: {
            addListener: function(){}
        },
        sendRequest: function() {},
        tabs: {
        }
    };
    chrome.pageAction = {
        onClicked: {
            addListener: function(){}
        }
    };
    chrome.storage = {
        sync: {
            set: function(obj, callback) {
                var keys = Object.keys(obj);

                for (var i = 0; i < keys.length; i++) {
                    _storage[keys[i]] = obj[keys[i]];
                }

                if (typeof callback === 'function') {
                    window.setTimeout(function() {
                        callback();
                        _storageChanged();
                    }, 0);
                }
            },
            get: function(keys, callback) {
                var result = {};

                if (keys === null) {
                    return _storage;
                }
                else if (typeof keys === 'string') {
                    keys = [keys];
                }

                for (var i = 0; i < keys.length; i++) {
                    result[keys[i]] = _storage[keys[i]];
                }

                if (typeof callback === 'function') {
                    window.setTimeout(function() {
                        callback(result);
                    }, 0);
                }
            },
            clear: function(callback) {
                _storage = {};

                if (typeof callback === 'function') {
                    window.setTimeout(function() {
                        callback(result);
                    }, 0);
                }
            },
            _getStorage: function() {
                return JSON.parse(_storage.options);
            }
        },
        onChanged: {
            addListener: function(callback) {
                if (typeof callback === 'function') {
                    _storageChanged = callback;
                }
            }
        }
    };
    chrome.runtime = {
        onInstalled: {
            addListener: function() {}
        }
    }
})();
