;(function ($, undefined) {
    var defaults = {
        events: []
    };

    var eventDefaults = {
        event: 'click',
        preventDefault: false,
        stopPropagation: false,
        affected: undefined,
        init: undefined,
        toggle: undefined,
        initState: 'off',
        show: undefined,
        hide: undefined
    };

    $.fn.toggler = function (userParams) {
        var params;
        params = $.extend(true, defaults, userParams);
        var eventsCount = params.events.length;
        var i;

        for (i = 0; i < eventsCount; i++) {
            $.extend(true, eventDefaults, params.events[i]);
        }

        function preventDefault(prevent, e) {
            if (prevent) {
                e.preventDefault();
            }
        }

        function stopPropagation(stop, e) {
            if (stop) {
                e.stopPropagation();
            }
        }

        function getAffected(event, $object) {
            var $affected = $object;
            if (event.affected !== undefined) {
                $affected = event.affected($object);
            }
            return $affected;
        }

        var $obj = $(this);
        for (i = 0; i < eventsCount; i++) {
            var event = params.events[i];
            if (event.show !== undefined && event.hide !== undefined && event.initState !== undefined) {
                var $affected = event.affected($obj);
                event.initState ? event.show($affected) : event.show($affected);
            }
            if (event.init !== undefined) {
                event.init();
            }
            $obj.on(event.event, {event: event}, function (e) {
                var event = e.data.event;
                preventDefault(event.preventDefault, e);
                stopPropagation(event.stopPropagation, e);
                var $affected = getAffected(event, $(this));
                event.toggle($affected);
            });
        }
    }
})(jQuery);