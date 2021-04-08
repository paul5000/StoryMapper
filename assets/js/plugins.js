(function (window, document, undefined) {

    const addEvent = function (eventName, element, cb) {
        if (element.addEventListener)  // W3C DOM
            element.addEventListener(eventName, cb, false);
        else if (element.attachEvent) { // IE DOM
            element.attachEvent("on" + eventName, cb);
        } else { // No much to do
            element[eventName] = cb;
        }
    }

    const inViewport = function (element) {
        const rect = element.getBoundingClientRect();
        // DOMRect { x: 8, y: 8, width: 100, height: 100, top: 8, right: 108, bottom: 108, left: 8 }
        const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
        const windowWidth = (window.innerWidth || document.documentElement.clientWidth);
        // http://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap
        const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
        const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);
        return (vertInView && horInView);
    }

    var toggleElements = document.querySelectorAll('[data-toggle-class]');
    for (var eI = 0; eI < toggleElements.length; eI++) {
        var toggleElement = toggleElements[eI];
        var className = (typeof toggleElement.dataset.toggleClass !== 'undefined' && toggleElement.dataset.toggleClass !== '') ? toggleElement.dataset.toggleClass : 'active';
        var triggers = document.querySelectorAll('[data-toggle-trigger="' + toggleElement.id + '"]');
        for (var tI = 0; tI < triggers.length; tI++) {
            var trigger = triggers[tI];
            addEvent('click', trigger, function (event) {
                if (toggleElement.classList.contains(className)) {
                    toggleElement.classList.remove(className);
                    trigger.classList.remove('active');
                } else {
                    toggleElement.classList.add(className);
                    trigger.classList.add('active');
                }
            });
        }
        var closeTriggers = toggleElement.querySelectorAll('[data-toggle-close]');
        for (var ctI = 0; ctI < closeTriggers.length; ctI++) {
            var closeTrigger = closeTriggers[ctI];
            addEvent('click', closeTrigger, function () {
                toggleElement.classList.remove(className);
                closeTrigger.classList.remove('active');
            });
        }
    }

    var eventNames = ['scroll', 'resize'];
    for (var i = 0; i < eventNames.length; i++) {
        var eventName = eventNames[i];
        addEvent(eventName, window, function () {
            var elements = document.querySelectorAll('[data-toggle-inview]');
            for (var e = 0; e < elements.length; e++) {
                var element = elements[e];
                var className = (typeof element.dataset.toggleInview !== 'undefined' && element.dataset.toggleInview !== '') ? element.dataset.toggleInview : 'inview';
                if (inViewport(element)) {
                    element.classList.add(className);
                } else {
                    element.classList.remove(className);
                }
            };
        });
    }

    var modals = document.querySelectorAll('.modal');
    for (var mI = 0; mI < modals.length; mI++) {
        var modal = modals[mI];
        var triggers = document.querySelectorAll('[href="#' + modal.id + '"]');
        for (var tI = 0; tI < triggers.length; tI++) {
            var trigger = triggers[tI];
            addEvent('click', trigger, function () {
                modal.style.display = "block";
            });
        }
        var closeTriggers = modal.querySelectorAll('.modal__close');
        for (var ct = 0; ct < closeTriggers.length; ct++) {
            var closeTrigger = closeTriggers[ct];
            addEvent('click', closeTrigger, function () {
                modal.style.display = "none";
            });
        }
        addEvent('click', window, function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });
    }

    addEvent("mousemove", document.documentElement, function (event) {
        document.documentElement.style.setProperty('--mouse-x', event.clientX + "px");
        document.documentElement.style.setProperty('--mouse-y', event.clientY + "px");
    });

    var event = document.createEvent("Event");
    event.initEvent("scroll", false, true);
    window.dispatchEvent(event);

})(window, document);
