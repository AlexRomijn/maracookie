(function (e) {
    e.fn.maraCookie = function (t, n) {
        // Extend the default settings with any user-provided options
        var r = e.extend({
            cookieimgurl: "/core/template/icons/cookie.png",
            cookiemessage: "Door toestemming te geven aan cookies kan je de site optimaal gebruiken.",
            buttonSettings: "Privacy Instellingen",
            buttonNoCookies: "Weiger alle cookies",
            titleSettings: "Privacy Instellingen",
            descriptionSettings: "Geef hieronder aan welke instellingen je wilt gebruiken op deze site",
            socialmediaCookie: "Geef voor deze cookies toestemming om de social media buttons te zien of te kunnen reageren.",
            analyticsCookie: "We gebruiken google analytics op deze website om bezoekersaantallen te meten en de website te verbeteren.",
            saveButton: "Opslaan",
            removeButton: "Verwijder alle cookies",
            cookie: {
                path: "/",
                secure: true,
                expires: 365,
                domain: "domain.nl",
            },
        }, n);

        // Show the settings modal if the 'showSettings' action is triggered
        if (t === "showSettings") {
            // Check if cookies exist; default to not accepted (0) if undefined
            var i = typeof e.cookie("maraCookie_social") === "undefined" ? 0 : 1;
            var s = typeof e.cookie("maraCookie_analytics") === "undefined" ? 0 : 1;

            // Build the modal overlay and content
            var o = '<div style="position: fixed; top: 0; z-index: 999991; background-color: #333; opacity: 0.6; width: 100%; height: 100%;"></div>';
            var u = '<div id="maraboxsettings" style="display: none; padding: 15px; background-color: #fff; box-shadow: 1px 1px 20px 4px #444; width: 70%; margin: 0 auto; position: relative;">';
            u += "<h1>" + r.titleSettings + "</h1>";
            u += "<p>" + r.descriptionSettings + "</p>";
            u += "<p><label>Social Media</label>";
            u += "<em>" + r.socialmediaCookie + "</em><br /><br />";
            u += '<select id="accept_maraCookie_social"><option value="1"' + (i === 1 ? 'selected="selected"' : "") + '>Ik accepteer deze cookies</option><option value="0"' + (i === 0 ? 'selected="selected"' : "") + ">Ik weiger deze cookies</option></select></p>";
            u += "<p><label>Analytics</label>";
            u += "<em>" + r.analyticsCookie + "</em><br /><br />";
            u += '<select id="maraCookie_analytics"><option value="1"' + (s === 1 ? 'selected="selected"' : "") + '>Ik accepteer deze cookies</option><option value="0"' + (s === 0 ? 'selected="selected"' : "") + ">Ik weiger deze cookies</option></select></p>";
            u += '<br /><button class="btn btnSmall btnSaveCookieSettings">' + r.saveButton + "</button>";
            u += ' <button class="btn btnSmall btnRemoveCookieSettings">' + r.removeButton + "</button>";
            u += "</div>";
            var a = '<div style="position: absolute; top: 0; z-index: 999992; width: 100%; height: 100%;">' + u + "</div>";

            // Append modal to the DOM and display it
            e("body").append(o);
            e("body").append(a);
            e("#maraboxsettings").slideDown(400);
            e("html, body").animate({ scrollTop: 0 }, 400);

            // Save settings event
            e(".btnSaveCookieSettings").click(function () {
                e(this).maraCookie("saveSettings");
            });

            // Remove all cookies event
            e(".btnRemoveCookieSettings").click(function () {
                e(this).maraCookie("removeSettings");
            });
        }

        // Save selected cookie settings
        if (t === "saveSettings") {
            var i = e("#accept_maraCookie_social").val();
            var s = e("#maraCookie_analytics").val();
            if (i == 0) e.removeCookie("maraCookie_social", r.cookie);
            if (s == 0) e.removeCookie("maraCookie_analytics", r.cookie);
            if (i == 1) e.cookie("maraCookie_social", "1", r.cookie);
            if (s == 1) e.cookie("maraCookie_analytics", "1", r.cookie);
            location.reload();
        }

        // Remove all cookie settings
        if (t === "removeSettings") {
            e.removeCookie("maraCookie_social", r.cookie);
            e.removeCookie("maraCookie_analytics", r.cookie);
            e.removeCookie("maraCookie_nocookies", r.cookie);
            location.reload();
        }

        // Accept no cookies and set the relevant cookie
        if (t === "accept_maraCookie_None") {
            e.removeCookie("maraCookie_social", r.cookie);
            e.removeCookie("maraCookie_analytics", r.cookie);
            e.cookie("maraCookie_nocookies", "1", r.cookie);
            location.reload();
        }

        // Accept all cookies
        if (t === "accept_maraCookie_All") {
            e.cookie("maraCookie_social", "1", r.cookie);
            e.cookie("maraCookie_analytics", "1", r.cookie);
            location.reload();
        }

        // Accept specific cookies if undefined
        if (typeof e.cookie("maraCookie_social") === "undefined" && t === "accept_maraCookie_social") {
            e.cookie("maraCookie_social", "1", r.cookie);
            location.reload();
        }
        if (typeof e.cookie("maraCookie_analytics") === "undefined" && t === "accept_maraCookie_analytics") {
            e.cookie("maraCookie_analytics", "1", r.cookie);
            location.reload();
        }

        // Add the cookie settings button if any cookies are set
        if (typeof e.cookie("maraCookie_social") !== "undefined" || typeof e.cookie("maraCookie_analytics") !== "undefined" || typeof e.cookie("maraCookie_nocookies") !== "undefined") {
            if (e("#maracookiesettings").length === 0) {
                var f = '<div id="maracookiesettings" style="width: 150px; -ms-transform: rotate(-90deg); -webkit-transform: rotate(-90deg); transform: rotate(-90deg); position: fixed; bottom: 80px; right: 0;">';
                f += '<button class="btn btnSmall btnCookieSettings" style="padding: 5px;">' + r.buttonSettings + "</button>";
                f += "</div>";
                e("body").append(e(f));
                e("#maracookiesettings").show(1000);
                e("#maracookiesettings").css("right", "-" + (e("#maracookiesettings").width() / 2 - e("#maracookiesettings").height() / 2) + "px");
                e(".btnCookieSettings").click(function () {
                    e(this).maraCookie("showSettings");
                });
            }
        }

        // Show cookie banner if no cookies are accepted yet
        if (typeof e.cookie("maraCookie_social") === "undefined" && typeof e.cookie("maraCookie_analytics") === "undefined" && typeof e.cookie("maraCookie_nocookies") === "undefined") {
            var l = '<div id="maracookiebox" style="display:none; padding: 0.5%; box-shadow: 1px 1px 20px 4px #ccc; border: 0; border-top: 1px solid #ccc; position: fixed; bottom: 0; width: 99%; background-color: #ccc;">';
            l += '<h4 class="left"><img src="' + r.cookieimgurl + '" style="width: 50px; height: auto; vertical-align: middle"> ' + r.cookiemessage + "</h4>";
            l += '<div class="right" style="width: 40%; text-align: right; margin: 5px;"><button class="btn btnSmall btnCookieAcceptAll">Accepteer alle cookies</button>';
            l += ' <button class="btn btnSmall btnCookieSettings">' + r.buttonSettings + "</button>";
            l += ' <button class="btn btnSmall btnCookieSettingsSaveNone">' + r.buttonNoCookies + "</button></div>";
            l += "</div>";
            e("body").append(e(l));
            e("#maracookiebox").slideDown(1000);

            // Button events for cookie actions
            e(".btnCookieAcceptAll").click(function () {
                e(this).maraCookie("accept_maraCookie_All");
                e("#maracookiebox").slideUp();
            });
            e(".btnCookieSettings").click(function () {
                e(this).maraCookie("showSettings");
            });
            e(".btnCookieSettingsSaveNone").click(function () {
                e(this).maraCookie("accept_maraCookie_None");
            });
        }

        return this;
    };
})(
