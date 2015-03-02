# Adding cuts

## Editing content.js

Locate ghost/core/server/helpers/content.js file.

  Add 'config          = require('../config'),' to the list of imported files at the top

  Add 'preview' to truncateOptions = _.pick(truncateOptions, ['words', 'characters', 'preview']

  Scroll down until you see the last if statement. We need an extra if statement to cover our case:

    else if (truncateOptions.hasOwnProperty('preview')) {
            var url = config.urlFor('post', {post: this}, true);
            var split = this.html.split('<!--preview-->', 2);
            var output = split[0];
            if (split[1]) {
                output += '<div class="continue"><a href="' + url + '">~read more~</div>';
            }
            return new hbs.handlebars.SafeString(output);
        }

## Edit your theme

  Then we need to modify your theme. Find index.hbs file and replace {{excerpt}} or {{content}} in it with {{content preview="true"}}.

  If there is a cut, it will produce a special tag:

    <div class="continue">● ● ●</div>

  And we can style it with CSS. Open screen.css and add:

    div.continue {
        text-align: center;
    }

After we modify all the files and restart Ghost (sudo service restart ghost), we can use it in the editor. Take one of your posts and put <!--preview--> somewhere in it. Save it and refresh your main blog page.
