(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {

    const package = require('../package.json');
    window.OpenChatFramework.plugin[package.name] = require('../src/plugin.js');

})();

},{"../package.json":2,"../src/plugin.js":3}],2:[function(require,module,exports){
module.exports={
  "name": "ocf-desktop-notifications",
  "version": "0.0.1",
  "main": "src/plugin.js",
  "dependencies": {
    "ocf": "^0.0.4"
  }
}

},{}],3:[function(require,module,exports){
// define our plugin values in root
const defaults = {timeout: 1000};

module.exports = (config) => {

    // request permission on page load
    document.addEventListener('DOMContentLoaded', function () {
      if (!Notification) {
        alert('Desktop notifications not available in your browser. Try Chromium.');
        return;
      }

      if (Notification.permission !== "granted")
        Notification.requestPermission();
    });

    let lastNotification = false;

    function notifyMe(title, icon, body, callback) {

      if(lastNotification) {

        lastNotification.close();
        lastNotification = false;

      }

      if (Notification.permission !== "granted") {
        Notification.requestPermission();
      } else {

        lastNotification = new Notification(title || 'Notification title', {
          icon: icon || 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
          body: body || "Hey there! You've been notified!",
        });

        lastNotification.onclick = callback;

      }

    }

    // Set the name of the hidden property and the change event for visibility
    var hidden, visibilityChange;
    if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
      hidden = "hidden";
      visibilityChange = "visibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
      hidden = "msHidden";
      visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
      hidden = "webkitHidden";
      visibilityChange = "webkitvisibilitychange";
    }

    let defaultTitle = (event) => {
        return 'New Message In ' + event.chat.channel;
    };

    let defaultIcon = (event) => {
        return false
    };

    let defaultMessage = (event) => {
        return JSON.stringify(event.data);
    };

    let defaultCallback = (event) => {
      window.focus();
      return false;
    };

    const plugin = (config) => {

        config.title = config.title || defaultTitle;
        config.icon = config.icon || defaultIcon;
        config.message = config.message || defaultMessage;
        config.callback = config.callback || defaultCallback;

        let isVisible = true;

        function handleVisibilityChange() {
          if (document[hidden]) {
            isVisible = false;
          } else {
            isVisible = true;
          }
        }

        // Warn if the browser doesn't support addEventListener or the Page Visibility API
        if (typeof document.addEventListener === "undefined" || typeof document[hidden] === "undefined") {
          console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
        } else {
          // Handle page visibility change
          document.addEventListener(visibilityChange, handleVisibilityChange, false);
        }

        class extension {

            construct() {

                this.parent.on('message', (event) => {

                    if(!isVisible) {
                        notifyMe(config.title(event), config.icon(event), config.message(event), config.callback);
                    }

                });

            }

        };

        // attach methods to Chat
        return {
            namespace: 'desktop-notifications',
            extends: {
                Chat: extension
            }
        }

    }

}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92Ni43LjAvbGliL25vZGVfbW9kdWxlcy9vY2YtcGx1Z2luL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIudG1wL3dyYXAuanMiLCJwYWNrYWdlLmpzb24iLCJzcmMvcGx1Z2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uKCkge1xuXG4gICAgY29uc3QgcGFja2FnZSA9IHJlcXVpcmUoJy4uL3BhY2thZ2UuanNvbicpO1xuICAgIHdpbmRvdy5PcGVuQ2hhdEZyYW1ld29yay5wbHVnaW5bcGFja2FnZS5uYW1lXSA9IHJlcXVpcmUoJy4uL3NyYy9wbHVnaW4uanMnKTtcblxufSkoKTtcbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJuYW1lXCI6IFwib2NmLWRlc2t0b3Atbm90aWZpY2F0aW9uc1wiLFxuICBcInZlcnNpb25cIjogXCIwLjAuMVwiLFxuICBcIm1haW5cIjogXCJzcmMvcGx1Z2luLmpzXCIsXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIm9jZlwiOiBcIl4wLjAuNFwiXG4gIH1cbn1cbiIsIi8vIGRlZmluZSBvdXIgcGx1Z2luIHZhbHVlcyBpbiByb290XG5jb25zdCBkZWZhdWx0cyA9IHt0aW1lb3V0OiAxMDAwfTtcblxubW9kdWxlLmV4cG9ydHMgPSAoY29uZmlnKSA9PiB7XG5cbiAgICAvLyByZXF1ZXN0IHBlcm1pc3Npb24gb24gcGFnZSBsb2FkXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghTm90aWZpY2F0aW9uKSB7XG4gICAgICAgIGFsZXJ0KCdEZXNrdG9wIG5vdGlmaWNhdGlvbnMgbm90IGF2YWlsYWJsZSBpbiB5b3VyIGJyb3dzZXIuIFRyeSBDaHJvbWl1bS4nKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoTm90aWZpY2F0aW9uLnBlcm1pc3Npb24gIT09IFwiZ3JhbnRlZFwiKVxuICAgICAgICBOb3RpZmljYXRpb24ucmVxdWVzdFBlcm1pc3Npb24oKTtcbiAgICB9KTtcblxuICAgIGxldCBsYXN0Tm90aWZpY2F0aW9uID0gZmFsc2U7XG5cbiAgICBmdW5jdGlvbiBub3RpZnlNZSh0aXRsZSwgaWNvbiwgYm9keSwgY2FsbGJhY2spIHtcblxuICAgICAgaWYobGFzdE5vdGlmaWNhdGlvbikge1xuXG4gICAgICAgIGxhc3ROb3RpZmljYXRpb24uY2xvc2UoKTtcbiAgICAgICAgbGFzdE5vdGlmaWNhdGlvbiA9IGZhbHNlO1xuXG4gICAgICB9XG5cbiAgICAgIGlmIChOb3RpZmljYXRpb24ucGVybWlzc2lvbiAhPT0gXCJncmFudGVkXCIpIHtcbiAgICAgICAgTm90aWZpY2F0aW9uLnJlcXVlc3RQZXJtaXNzaW9uKCk7XG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIGxhc3ROb3RpZmljYXRpb24gPSBuZXcgTm90aWZpY2F0aW9uKHRpdGxlIHx8ICdOb3RpZmljYXRpb24gdGl0bGUnLCB7XG4gICAgICAgICAgaWNvbjogaWNvbiB8fCAnaHR0cDovL2Nkbi5zc3RhdGljLm5ldC9zdGFja2V4Y2hhbmdlL2ltZy9sb2dvcy9zby9zby1pY29uLnBuZycsXG4gICAgICAgICAgYm9keTogYm9keSB8fCBcIkhleSB0aGVyZSEgWW91J3ZlIGJlZW4gbm90aWZpZWQhXCIsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxhc3ROb3RpZmljYXRpb24ub25jbGljayA9IGNhbGxiYWNrO1xuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgICAvLyBTZXQgdGhlIG5hbWUgb2YgdGhlIGhpZGRlbiBwcm9wZXJ0eSBhbmQgdGhlIGNoYW5nZSBldmVudCBmb3IgdmlzaWJpbGl0eVxuICAgIHZhciBoaWRkZW4sIHZpc2liaWxpdHlDaGFuZ2U7XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudC5oaWRkZW4gIT09IFwidW5kZWZpbmVkXCIpIHsgLy8gT3BlcmEgMTIuMTAgYW5kIEZpcmVmb3ggMTggYW5kIGxhdGVyIHN1cHBvcnRcbiAgICAgIGhpZGRlbiA9IFwiaGlkZGVuXCI7XG4gICAgICB2aXNpYmlsaXR5Q2hhbmdlID0gXCJ2aXNpYmlsaXR5Y2hhbmdlXCI7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZG9jdW1lbnQubXNIaWRkZW4gIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIGhpZGRlbiA9IFwibXNIaWRkZW5cIjtcbiAgICAgIHZpc2liaWxpdHlDaGFuZ2UgPSBcIm1zdmlzaWJpbGl0eWNoYW5nZVwiO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGRvY3VtZW50LndlYmtpdEhpZGRlbiAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgaGlkZGVuID0gXCJ3ZWJraXRIaWRkZW5cIjtcbiAgICAgIHZpc2liaWxpdHlDaGFuZ2UgPSBcIndlYmtpdHZpc2liaWxpdHljaGFuZ2VcIjtcbiAgICB9XG5cbiAgICBsZXQgZGVmYXVsdFRpdGxlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHJldHVybiAnTmV3IE1lc3NhZ2UgSW4gJyArIGV2ZW50LmNoYXQuY2hhbm5lbDtcbiAgICB9O1xuXG4gICAgbGV0IGRlZmF1bHRJY29uID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH07XG5cbiAgICBsZXQgZGVmYXVsdE1lc3NhZ2UgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGV2ZW50LmRhdGEpO1xuICAgIH07XG5cbiAgICBsZXQgZGVmYXVsdENhbGxiYWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICB3aW5kb3cuZm9jdXMoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgY29uc3QgcGx1Z2luID0gKGNvbmZpZykgPT4ge1xuXG4gICAgICAgIGNvbmZpZy50aXRsZSA9IGNvbmZpZy50aXRsZSB8fCBkZWZhdWx0VGl0bGU7XG4gICAgICAgIGNvbmZpZy5pY29uID0gY29uZmlnLmljb24gfHwgZGVmYXVsdEljb247XG4gICAgICAgIGNvbmZpZy5tZXNzYWdlID0gY29uZmlnLm1lc3NhZ2UgfHwgZGVmYXVsdE1lc3NhZ2U7XG4gICAgICAgIGNvbmZpZy5jYWxsYmFjayA9IGNvbmZpZy5jYWxsYmFjayB8fCBkZWZhdWx0Q2FsbGJhY2s7XG5cbiAgICAgICAgbGV0IGlzVmlzaWJsZSA9IHRydWU7XG5cbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlVmlzaWJpbGl0eUNoYW5nZSgpIHtcbiAgICAgICAgICBpZiAoZG9jdW1lbnRbaGlkZGVuXSkge1xuICAgICAgICAgICAgaXNWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlzVmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2FybiBpZiB0aGUgYnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgYWRkRXZlbnRMaXN0ZW5lciBvciB0aGUgUGFnZSBWaXNpYmlsaXR5IEFQSVxuICAgICAgICBpZiAodHlwZW9mIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIgPT09IFwidW5kZWZpbmVkXCIgfHwgdHlwZW9mIGRvY3VtZW50W2hpZGRlbl0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoaXMgZGVtbyByZXF1aXJlcyBhIGJyb3dzZXIsIHN1Y2ggYXMgR29vZ2xlIENocm9tZSBvciBGaXJlZm94LCB0aGF0IHN1cHBvcnRzIHRoZSBQYWdlIFZpc2liaWxpdHkgQVBJLlwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBIYW5kbGUgcGFnZSB2aXNpYmlsaXR5IGNoYW5nZVxuICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIodmlzaWJpbGl0eUNoYW5nZSwgaGFuZGxlVmlzaWJpbGl0eUNoYW5nZSwgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2xhc3MgZXh0ZW5zaW9uIHtcblxuICAgICAgICAgICAgY29uc3RydWN0KCkge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnQub24oJ21lc3NhZ2UnLCAoZXZlbnQpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBpZighaXNWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub3RpZnlNZShjb25maWcudGl0bGUoZXZlbnQpLCBjb25maWcuaWNvbihldmVudCksIGNvbmZpZy5tZXNzYWdlKGV2ZW50KSwgY29uZmlnLmNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIGF0dGFjaCBtZXRob2RzIHRvIENoYXRcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5hbWVzcGFjZTogJ2Rlc2t0b3Atbm90aWZpY2F0aW9ucycsXG4gICAgICAgICAgICBleHRlbmRzOiB7XG4gICAgICAgICAgICAgICAgQ2hhdDogZXh0ZW5zaW9uXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxufVxuIl19
