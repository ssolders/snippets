//Initially devloped to detect missing react-intl translations
//Each missing translation would be logged in the browser console following the syntax:
//[React Intl] Missing message: "my.missing.translation" for locale: "lang"
//When you run this script in the browser console each missing translation will be stored in the variable "missingTranslations"

var missingTranslations = {};
var oldLogError = console.error;

console.error = function(message) {
    if (message.startsWith("[React Intl]") && message.indexOf("Missing message") > -1) {
        var contentKey = message.substring(message.indexOf('"') + 1, message.lastIndexOf('" for locale'));
        missingTranslations[contentKey] = "";
    }
    oldLogError.apply(console, arguments);
};

window.getMissingTranslations = function() {
    return missingTranslations;
};
