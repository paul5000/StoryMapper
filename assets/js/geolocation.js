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





  // run startup script if DOM loaded
  // window.addEventListener("DOMContentLoaded", startUp, false)

  geoFindMe = () => {
    var output = document.getElementById("out");

    if (!navigator.geolocation) {
      output.innerHTML = "<p>Geolokation wird von ihrem Browser nicht unterstützt</p>";
      return;
    }

    success = (position) => {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;

      output.innerHTML = '<p>Die Latitude ist ' + latitude + '° <br>Die Longitude ist ' + longitude + '°</p>';

      var img = new Image();
      img.src = "http://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

      output.appendChild(img);
    };

    error = () => {
      output.innerHTML = "Es war nicht möglich Sie zu lokalisieren";
    };

    output.innerHTML = "<p>Lokalisieren…</p>";

    navigator.geolocation.getCurrentPosition(success, error);
  }
