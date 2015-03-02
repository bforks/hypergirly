// # Content Helper
// Usage: `{{content}}`, `{{content words="20"}}`, `{{content characters="256"}}`
//
// Turns content html into a safestring so that the user doesn't have to
// escape it or tell handlebars to leave it alone with a triple-brace.
//
// Enables tag-safe truncation of content by characters or words.

var hbs             = require('express-hbs'),
    _               = require('lodash'),
    downsize        = require('downsize'),
    downzero        = require('../utils/downzero'),
    content;

content = function (options) {
    var truncateOptions = (options || {}).hash || {};
    truncateOptions = _.pick(truncateOptions, ['words', 'characters', 'preview', 'url']);

    truncateOptions['words'] = parseInt(truncateOptions['words'], 10);
    truncateOptions['characters'] = parseInt(truncateOptions['characters'], 10);

    if (truncateOptions.hasOwnProperty('words') || truncateOptions.hasOwnProperty('characters')) {
        // Legacy function: {{content words="0"}} should return leading tags.
        if (truncateOptions.hasOwnProperty('words') && truncateOptions.words === 0) {
            return new hbs.handlebars.SafeString(
                downzero(this.html)
            );
        }

        return new hbs.handlebars.SafeString(
            downsize(this.html, truncateOptions)
        );
    } else if (truncateOptions.hasOwnProperty('preview')) {
        var url = truncateOptions['url'];
        var split = this.html.split('<!--preview-->', 2)
        var output = split[0]
        if (split[1]) {
            output += '<div class="continue"><a href="' + url + '">● ● ●</a></div>'
        }
        return new hbs.handlebars.SafeString(output)
    }

    return new hbs.handlebars.SafeString(this.html);
};

module.exports = content;
