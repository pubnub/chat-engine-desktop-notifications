(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {

    const namespace = require('../package.json')['open-chat-framework']['namespace'];
    window.OpenChatFramework.plugin[namespace] = require('../plugin.js');

})();

},{"../package.json":2,"../plugin.js":3}],2:[function(require,module,exports){
module.exports={
  "name": "ocf-desktop-notifications",
  "version": "0.0.1",
  "main": "./plugin.js",
  "open-chat-framework": {
    "namespace": "desktop-notifications"
  },
  "devDependencies": {
    "chai": "^3.5.0",
    "mocha": "^3.3.0"
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
            namespace,
            extends: {
                Chat: extension
            }
        }

    }
    
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92Ni43LjAvbGliL25vZGVfbW9kdWxlcy9vY2YtcGx1Z2luL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIudG1wL3dyYXAuanMiLCJwYWNrYWdlLmpzb24iLCJwbHVnaW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbigpIHtcblxuICAgIGNvbnN0IG5hbWVzcGFjZSA9IHJlcXVpcmUoJy4uL3BhY2thZ2UuanNvbicpWydvcGVuLWNoYXQtZnJhbWV3b3JrJ11bJ25hbWVzcGFjZSddO1xuICAgIHdpbmRvdy5PcGVuQ2hhdEZyYW1ld29yay5wbHVnaW5bbmFtZXNwYWNlXSA9IHJlcXVpcmUoJy4uL3BsdWdpbi5qcycpO1xuXG59KSgpO1xuIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIm5hbWVcIjogXCJvY2YtZGVza3RvcC1ub3RpZmljYXRpb25zXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuMC4xXCIsXG4gIFwibWFpblwiOiBcIi4vcGx1Z2luLmpzXCIsXG4gIFwib3Blbi1jaGF0LWZyYW1ld29ya1wiOiB7XG4gICAgXCJuYW1lc3BhY2VcIjogXCJkZXNrdG9wLW5vdGlmaWNhdGlvbnNcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJjaGFpXCI6IFwiXjMuNS4wXCIsXG4gICAgXCJtb2NoYVwiOiBcIl4zLjMuMFwiXG4gIH1cbn1cbiIsIi8vIGRlZmluZSBvdXIgcGx1Z2luIHZhbHVlcyBpbiByb290XG5jb25zdCBkZWZhdWx0cyA9IHt0aW1lb3V0OiAxMDAwfTtcblxubW9kdWxlLmV4cG9ydHMgPSAoY29uZmlnKSA9PiB7XG5cbiAgICAvLyByZXF1ZXN0IHBlcm1pc3Npb24gb24gcGFnZSBsb2FkXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghTm90aWZpY2F0aW9uKSB7XG4gICAgICAgIGFsZXJ0KCdEZXNrdG9wIG5vdGlmaWNhdGlvbnMgbm90IGF2YWlsYWJsZSBpbiB5b3VyIGJyb3dzZXIuIFRyeSBDaHJvbWl1bS4nKTsgXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKE5vdGlmaWNhdGlvbi5wZXJtaXNzaW9uICE9PSBcImdyYW50ZWRcIilcbiAgICAgICAgTm90aWZpY2F0aW9uLnJlcXVlc3RQZXJtaXNzaW9uKCk7XG4gICAgfSk7XG5cbiAgICBsZXQgbGFzdE5vdGlmaWNhdGlvbiA9IGZhbHNlO1xuXG4gICAgZnVuY3Rpb24gbm90aWZ5TWUodGl0bGUsIGljb24sIGJvZHksIGNhbGxiYWNrKSB7XG5cbiAgICAgIGlmKGxhc3ROb3RpZmljYXRpb24pIHtcbiAgICAgICAgXG4gICAgICAgIGxhc3ROb3RpZmljYXRpb24uY2xvc2UoKTtcbiAgICAgICAgbGFzdE5vdGlmaWNhdGlvbiA9IGZhbHNlO1xuXG4gICAgICB9IFxuXG4gICAgICBpZiAoTm90aWZpY2F0aW9uLnBlcm1pc3Npb24gIT09IFwiZ3JhbnRlZFwiKSB7XG4gICAgICAgIE5vdGlmaWNhdGlvbi5yZXF1ZXN0UGVybWlzc2lvbigpO1xuICAgICAgfSBlbHNlIHtcblxuICAgICAgICBsYXN0Tm90aWZpY2F0aW9uID0gbmV3IE5vdGlmaWNhdGlvbih0aXRsZSB8fCAnTm90aWZpY2F0aW9uIHRpdGxlJywge1xuICAgICAgICAgIGljb246IGljb24gfHwgJ2h0dHA6Ly9jZG4uc3N0YXRpYy5uZXQvc3RhY2tleGNoYW5nZS9pbWcvbG9nb3Mvc28vc28taWNvbi5wbmcnLFxuICAgICAgICAgIGJvZHk6IGJvZHkgfHwgXCJIZXkgdGhlcmUhIFlvdSd2ZSBiZWVuIG5vdGlmaWVkIVwiLFxuICAgICAgICB9KTtcblxuICAgICAgICBsYXN0Tm90aWZpY2F0aW9uLm9uY2xpY2sgPSBjYWxsYmFjaztcblxuICAgICAgfVxuXG4gICAgfVxuXG4gICAgLy8gU2V0IHRoZSBuYW1lIG9mIHRoZSBoaWRkZW4gcHJvcGVydHkgYW5kIHRoZSBjaGFuZ2UgZXZlbnQgZm9yIHZpc2liaWxpdHlcbiAgICB2YXIgaGlkZGVuLCB2aXNpYmlsaXR5Q2hhbmdlOyBcbiAgICBpZiAodHlwZW9mIGRvY3VtZW50LmhpZGRlbiAhPT0gXCJ1bmRlZmluZWRcIikgeyAvLyBPcGVyYSAxMi4xMCBhbmQgRmlyZWZveCAxOCBhbmQgbGF0ZXIgc3VwcG9ydCBcbiAgICAgIGhpZGRlbiA9IFwiaGlkZGVuXCI7XG4gICAgICB2aXNpYmlsaXR5Q2hhbmdlID0gXCJ2aXNpYmlsaXR5Y2hhbmdlXCI7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZG9jdW1lbnQubXNIaWRkZW4gIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIGhpZGRlbiA9IFwibXNIaWRkZW5cIjtcbiAgICAgIHZpc2liaWxpdHlDaGFuZ2UgPSBcIm1zdmlzaWJpbGl0eWNoYW5nZVwiO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGRvY3VtZW50LndlYmtpdEhpZGRlbiAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgaGlkZGVuID0gXCJ3ZWJraXRIaWRkZW5cIjtcbiAgICAgIHZpc2liaWxpdHlDaGFuZ2UgPSBcIndlYmtpdHZpc2liaWxpdHljaGFuZ2VcIjtcbiAgICB9XG5cbiAgICBsZXQgZGVmYXVsdFRpdGxlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHJldHVybiAnTmV3IE1lc3NhZ2UgSW4gJyArIGV2ZW50LmNoYXQuY2hhbm5lbDtcbiAgICB9O1xuICAgIFxuICAgIGxldCBkZWZhdWx0SWNvbiA9IChldmVudCkgPT4ge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9O1xuXG4gICAgbGV0IGRlZmF1bHRNZXNzYWdlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShldmVudC5kYXRhKTtcbiAgICB9O1xuXG4gICAgbGV0IGRlZmF1bHRDYWxsYmFjayA9IChldmVudCkgPT4ge1xuICAgICAgd2luZG93LmZvY3VzKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIGNvbnN0IHBsdWdpbiA9IChjb25maWcpID0+IHtcblxuICAgICAgICBjb25maWcudGl0bGUgPSBjb25maWcudGl0bGUgfHwgZGVmYXVsdFRpdGxlO1xuICAgICAgICBjb25maWcuaWNvbiA9IGNvbmZpZy5pY29uIHx8IGRlZmF1bHRJY29uO1xuICAgICAgICBjb25maWcubWVzc2FnZSA9IGNvbmZpZy5tZXNzYWdlIHx8IGRlZmF1bHRNZXNzYWdlO1xuICAgICAgICBjb25maWcuY2FsbGJhY2sgPSBjb25maWcuY2FsbGJhY2sgfHwgZGVmYXVsdENhbGxiYWNrO1xuXG4gICAgICAgIGxldCBpc1Zpc2libGUgPSB0cnVlO1xuXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZVZpc2liaWxpdHlDaGFuZ2UoKSB7XG4gICAgICAgICAgaWYgKGRvY3VtZW50W2hpZGRlbl0pIHtcbiAgICAgICAgICAgIGlzVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpc1Zpc2libGUgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdhcm4gaWYgdGhlIGJyb3dzZXIgZG9lc24ndCBzdXBwb3J0IGFkZEV2ZW50TGlzdGVuZXIgb3IgdGhlIFBhZ2UgVmlzaWJpbGl0eSBBUElcbiAgICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyID09PSBcInVuZGVmaW5lZFwiIHx8IHR5cGVvZiBkb2N1bWVudFtoaWRkZW5dID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJUaGlzIGRlbW8gcmVxdWlyZXMgYSBicm93c2VyLCBzdWNoIGFzIEdvb2dsZSBDaHJvbWUgb3IgRmlyZWZveCwgdGhhdCBzdXBwb3J0cyB0aGUgUGFnZSBWaXNpYmlsaXR5IEFQSS5cIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gSGFuZGxlIHBhZ2UgdmlzaWJpbGl0eSBjaGFuZ2UgICBcbiAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKHZpc2liaWxpdHlDaGFuZ2UsIGhhbmRsZVZpc2liaWxpdHlDaGFuZ2UsIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNsYXNzIGV4dGVuc2lvbiB7XG5cbiAgICAgICAgICAgIGNvbnN0cnVjdCgpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50Lm9uKCdtZXNzYWdlJywgKGV2ZW50KSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoIWlzVmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm90aWZ5TWUoY29uZmlnLnRpdGxlKGV2ZW50KSwgY29uZmlnLmljb24oZXZlbnQpLCBjb25maWcubWVzc2FnZShldmVudCksIGNvbmZpZy5jYWxsYmFjayk7ICAgXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfTtcblxuICAgICAgICAvLyBhdHRhY2ggbWV0aG9kcyB0byBDaGF0XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgICAgICBleHRlbmRzOiB7XG4gICAgICAgICAgICAgICAgQ2hhdDogZXh0ZW5zaW9uXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cbiAgICBcbn1cbiJdfQ==
