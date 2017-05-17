(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {

    const package = require('../package.json');
    window.OpenChatFramework.plugin[package.name] = require('../plugin.js');

})();

},{"../package.json":2,"../plugin.js":3}],2:[function(require,module,exports){
module.exports={
  "name": "ocf-desktop-notifications",
  "version": "0.0.1",
  "main": "./plugin.js",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92Ni43LjAvbGliL25vZGVfbW9kdWxlcy9vY2YtcGx1Z2luL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIudG1wL3dyYXAuanMiLCJwYWNrYWdlLmpzb24iLCJwbHVnaW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24oKSB7XG5cbiAgICBjb25zdCBwYWNrYWdlID0gcmVxdWlyZSgnLi4vcGFja2FnZS5qc29uJyk7XG4gICAgd2luZG93Lk9wZW5DaGF0RnJhbWV3b3JrLnBsdWdpbltwYWNrYWdlLm5hbWVdID0gcmVxdWlyZSgnLi4vcGx1Z2luLmpzJyk7XG5cbn0pKCk7XG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwibmFtZVwiOiBcIm9jZi1kZXNrdG9wLW5vdGlmaWNhdGlvbnNcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMC4wLjFcIixcbiAgXCJtYWluXCI6IFwiLi9wbHVnaW4uanNcIixcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwib2NmXCI6IFwiXjAuMC40XCJcbiAgfVxufVxuIiwiLy8gZGVmaW5lIG91ciBwbHVnaW4gdmFsdWVzIGluIHJvb3RcbmNvbnN0IGRlZmF1bHRzID0ge3RpbWVvdXQ6IDEwMDB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IChjb25maWcpID0+IHtcblxuICAgIC8vIHJlcXVlc3QgcGVybWlzc2lvbiBvbiBwYWdlIGxvYWRcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCFOb3RpZmljYXRpb24pIHtcbiAgICAgICAgYWxlcnQoJ0Rlc2t0b3Agbm90aWZpY2F0aW9ucyBub3QgYXZhaWxhYmxlIGluIHlvdXIgYnJvd3Nlci4gVHJ5IENocm9taXVtLicpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChOb3RpZmljYXRpb24ucGVybWlzc2lvbiAhPT0gXCJncmFudGVkXCIpXG4gICAgICAgIE5vdGlmaWNhdGlvbi5yZXF1ZXN0UGVybWlzc2lvbigpO1xuICAgIH0pO1xuXG4gICAgbGV0IGxhc3ROb3RpZmljYXRpb24gPSBmYWxzZTtcblxuICAgIGZ1bmN0aW9uIG5vdGlmeU1lKHRpdGxlLCBpY29uLCBib2R5LCBjYWxsYmFjaykge1xuXG4gICAgICBpZihsYXN0Tm90aWZpY2F0aW9uKSB7XG5cbiAgICAgICAgbGFzdE5vdGlmaWNhdGlvbi5jbG9zZSgpO1xuICAgICAgICBsYXN0Tm90aWZpY2F0aW9uID0gZmFsc2U7XG5cbiAgICAgIH1cblxuICAgICAgaWYgKE5vdGlmaWNhdGlvbi5wZXJtaXNzaW9uICE9PSBcImdyYW50ZWRcIikge1xuICAgICAgICBOb3RpZmljYXRpb24ucmVxdWVzdFBlcm1pc3Npb24oKTtcbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgbGFzdE5vdGlmaWNhdGlvbiA9IG5ldyBOb3RpZmljYXRpb24odGl0bGUgfHwgJ05vdGlmaWNhdGlvbiB0aXRsZScsIHtcbiAgICAgICAgICBpY29uOiBpY29uIHx8ICdodHRwOi8vY2RuLnNzdGF0aWMubmV0L3N0YWNrZXhjaGFuZ2UvaW1nL2xvZ29zL3NvL3NvLWljb24ucG5nJyxcbiAgICAgICAgICBib2R5OiBib2R5IHx8IFwiSGV5IHRoZXJlISBZb3UndmUgYmVlbiBub3RpZmllZCFcIixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGFzdE5vdGlmaWNhdGlvbi5vbmNsaWNrID0gY2FsbGJhY2s7XG5cbiAgICAgIH1cblxuICAgIH1cblxuICAgIC8vIFNldCB0aGUgbmFtZSBvZiB0aGUgaGlkZGVuIHByb3BlcnR5IGFuZCB0aGUgY2hhbmdlIGV2ZW50IGZvciB2aXNpYmlsaXR5XG4gICAgdmFyIGhpZGRlbiwgdmlzaWJpbGl0eUNoYW5nZTtcbiAgICBpZiAodHlwZW9mIGRvY3VtZW50LmhpZGRlbiAhPT0gXCJ1bmRlZmluZWRcIikgeyAvLyBPcGVyYSAxMi4xMCBhbmQgRmlyZWZveCAxOCBhbmQgbGF0ZXIgc3VwcG9ydFxuICAgICAgaGlkZGVuID0gXCJoaWRkZW5cIjtcbiAgICAgIHZpc2liaWxpdHlDaGFuZ2UgPSBcInZpc2liaWxpdHljaGFuZ2VcIjtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBkb2N1bWVudC5tc0hpZGRlbiAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgaGlkZGVuID0gXCJtc0hpZGRlblwiO1xuICAgICAgdmlzaWJpbGl0eUNoYW5nZSA9IFwibXN2aXNpYmlsaXR5Y2hhbmdlXCI7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZG9jdW1lbnQud2Via2l0SGlkZGVuICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBoaWRkZW4gPSBcIndlYmtpdEhpZGRlblwiO1xuICAgICAgdmlzaWJpbGl0eUNoYW5nZSA9IFwid2Via2l0dmlzaWJpbGl0eWNoYW5nZVwiO1xuICAgIH1cblxuICAgIGxldCBkZWZhdWx0VGl0bGUgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgcmV0dXJuICdOZXcgTWVzc2FnZSBJbiAnICsgZXZlbnQuY2hhdC5jaGFubmVsO1xuICAgIH07XG5cbiAgICBsZXQgZGVmYXVsdEljb24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfTtcblxuICAgIGxldCBkZWZhdWx0TWVzc2FnZSA9IChldmVudCkgPT4ge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZXZlbnQuZGF0YSk7XG4gICAgfTtcblxuICAgIGxldCBkZWZhdWx0Q2FsbGJhY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgIHdpbmRvdy5mb2N1cygpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICBjb25zdCBwbHVnaW4gPSAoY29uZmlnKSA9PiB7XG5cbiAgICAgICAgY29uZmlnLnRpdGxlID0gY29uZmlnLnRpdGxlIHx8IGRlZmF1bHRUaXRsZTtcbiAgICAgICAgY29uZmlnLmljb24gPSBjb25maWcuaWNvbiB8fCBkZWZhdWx0SWNvbjtcbiAgICAgICAgY29uZmlnLm1lc3NhZ2UgPSBjb25maWcubWVzc2FnZSB8fCBkZWZhdWx0TWVzc2FnZTtcbiAgICAgICAgY29uZmlnLmNhbGxiYWNrID0gY29uZmlnLmNhbGxiYWNrIHx8IGRlZmF1bHRDYWxsYmFjaztcblxuICAgICAgICBsZXQgaXNWaXNpYmxlID0gdHJ1ZTtcblxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVWaXNpYmlsaXR5Q2hhbmdlKCkge1xuICAgICAgICAgIGlmIChkb2N1bWVudFtoaWRkZW5dKSB7XG4gICAgICAgICAgICBpc1Zpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXNWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXYXJuIGlmIHRoZSBicm93c2VyIGRvZXNuJ3Qgc3VwcG9ydCBhZGRFdmVudExpc3RlbmVyIG9yIHRoZSBQYWdlIFZpc2liaWxpdHkgQVBJXG4gICAgICAgIGlmICh0eXBlb2YgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2YgZG9jdW1lbnRbaGlkZGVuXSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhpcyBkZW1vIHJlcXVpcmVzIGEgYnJvd3Nlciwgc3VjaCBhcyBHb29nbGUgQ2hyb21lIG9yIEZpcmVmb3gsIHRoYXQgc3VwcG9ydHMgdGhlIFBhZ2UgVmlzaWJpbGl0eSBBUEkuXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIEhhbmRsZSBwYWdlIHZpc2liaWxpdHkgY2hhbmdlXG4gICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih2aXNpYmlsaXR5Q2hhbmdlLCBoYW5kbGVWaXNpYmlsaXR5Q2hhbmdlLCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICBjbGFzcyBleHRlbnNpb24ge1xuXG4gICAgICAgICAgICBjb25zdHJ1Y3QoKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudC5vbignbWVzc2FnZScsIChldmVudCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKCFpc1Zpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vdGlmeU1lKGNvbmZpZy50aXRsZShldmVudCksIGNvbmZpZy5pY29uKGV2ZW50KSwgY29uZmlnLm1lc3NhZ2UoZXZlbnQpLCBjb25maWcuY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gYXR0YWNoIG1ldGhvZHMgdG8gQ2hhdFxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmFtZXNwYWNlOiAnZGVza3RvcC1ub3RpZmljYXRpb25zJyxcbiAgICAgICAgICAgIGV4dGVuZHM6IHtcbiAgICAgICAgICAgICAgICBDaGF0OiBleHRlbnNpb25cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG4iXX0=
