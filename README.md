# DISCONTINUED

This was a fun project of mine, but like every good thing, it has come to an end.
Thanks to every one who has been providing feedback.
Special thanks to the devs who **must have** figured out my player account
and yet haven't banned me for some reason.
Hope they do now, specially after an easter egg I planted in the latest patch.

Either way, feel free to use this source code at will. Cheers!

# Assistant plugin for SimpleMMO

This plugin assists you in many aspects of SimpleMMO:
* Travel assist
* Resource assist
* Battle assist
* Arena assist
* Questing assist
* Job assist
* Gambling assist (50/50)
* ~~AFK loop grind~~

AFK Grind Loop is suspended until further notice due to there being no failsafe as of yet.
Once failsafe mechanisms are set, the Cycle will see the light of day again.
Until then, if you are feeling brave, you can use Cycle by installing older versions (1.5.2 and older).

You have been warned.

## Installation

```bash
# install dependencies
$ npm install

# compile dev build
$ npm run dev

# compile production build
$ npm run prod
```

Head over to **tags** and download `.zip` under the latest version.
Then, _install dependencies_ and run a _production build compilation_.
A `dist` directory containing working build will be created.

Navigate over to `browser://extensions/` or `chrome://extensions/`,
depending on the browser you are using. There, enable **Developer Mode**
and click **Load Unpacked**. Select the compiled `dist` directory.

#### Alternatively

Head over to [Chrome Store](https://chrome.google.com/webstore/detail/simple-assistant/dpljccfbkelkodmmbnahgimhombjemll?hl=en&authuser=0)
and install a stable extension version there

## Commit syntax

* :blue_book:         Documentation - General documentation changes, in both .md and JsDoc
* :white_check_mark:  Feature       - A new functional feature for end-user
* :hammer_and_wrench: Fix           - A bugfix of any kind
* :corn:              Miscellaneous - Uncategorized changes
* :recycle:           Refactor      - Under the hood code changes - nothing new for end-user
* :milky_way:         Release       - End of dev cycle
* :art:               Style         - Style changes, no new functionality
* :pill:              Testing       - Completion and maintenance of test units
* :construction:      WIP           - A stepping stone for a Work in Progress change
