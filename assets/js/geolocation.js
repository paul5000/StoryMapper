;(function (window, document, undefined) {

  prompt = (window, pref, message, callback) => {
    let branch = Components.classes[
      "@mozilla.org/preferences-service;1"
    ].getService(Components.interfaces.nsIPrefBranch);

    if (branch.getPrefType(pref) === branch.PREF_STRING) {
      switch (branch.getCharPref(pref)) {
        case "always":
          return callback(true);
        case "never":
          return callback(false);
      }
    }

    let done = false;

    remember = (value, result) => {
      return () => {
        done = true;
        branch.setCharPref(pref, value);
        callback(result);
      };
    }

    let self = window.PopupNotifications.show(
      window.gBrowser.selectedBrowser,
      "geolocation",
      message,
      "geo-notification-icon",
      {
        label: "Ort teilen",
        accessKey: "S",
        callback: function (notification) {
          done = true
          callback(true);
        },
      },
      [
        {
          label: "Immer teilen",
          accessKey: "A",
          callback: remember("always", true),
        },
        {
          label: "Niemals teilen",
          accessKey: "N",
          callback: remember("never", false),
        },
      ],
      {
        eventCallback: function (event) {
          if (event === "dismissed") {
            if (!done) callback(false);
            done = true;
            window.PopupNotifications.remove(self);
          }
        },
        persistWhileVisible: true,
      }
    );
  }

  prompt(
    window,
    "extensions.foo-addon.allowGeolocation",
    "Foo Add-on möchte deinen Ort abrufen.",
    function callback(allowed) {
      alert(allowed);
    }
  );

})(window, document);
