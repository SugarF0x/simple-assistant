# simple-assistant

This plugin aims to improve quality of life on multiple aspects of Simple MMO
while breaking no Terms of Service. As such, this plugin has no automation
and never will have, however it does have a bunch of features you might fancy

All the features are optional and are disabled by default. Tailor your own experience

## Features

Features are divided into modules by page (for the most part). Current list may not be up to date
all the time. For more detailed changes, see [CHANGELOG](/CHANGELOG.md)

Many modules have autofocus features that aim to improve QoL by streamlining the most common action
performed on the corresponding page. You still have to press enter or space bar to confirm action though

Along with autofocus features sometimes you may see verification autofocus. This only focuses the capcha navigation
button and opens the verification screen in the same tab instead of opening a new one. The verification itself
has to be done manually

### Arena

* Battle arena Generate Enemy button autofocus

### Battle

* Autofocus
  * attack button
  * verification button
  * consumables
* Disable special attack button
* Kill task tracking assistance

### Carriage

* Location drop chance details display
  * Highlight best/worst chances for a location
* Kill task location tracking assistance

### Materials gathering

* Gather button autofocus

### General

* Replace popup modal background with blur

### Home

* Travel button autofoucs

### Jobs

* Go to job area button autofocus
* Perform job autofocus & job time slider autofocus

### Mahol

* Daily reward reminder notification
* Monthly reward reminder notification

### Navigation

* Navigation keyboard shortcuts

### Quests

* Last incomplete task elevation & autofocus
* Task quest elevation & autofocus
* Task quest completion tracking assistance
* Perform quest button autofocus
* Verification autofocus

### Settings

* Safe mode expiration reminder notification

### Tasks

* Daily tasks tracking assistance
* Tasks completion reward available notification
* New tasks ready reminder notification

### Travel

* Autofocus
  * step button
  * attack NPC button
  * gather materials button
  * verification button
* Preserve step cooldown on page refresh
* Step task progression tracking assistance

## Installation

### Chrome Store (recommended)

Head over to [Chrome Store](https://chrome.google.com/webstore/detail/simple-assistant/dpljccfbkelkodmmbnahgimhombjemll?hl=en&authuser=0)
and install a stable extension version there

### Manual artifact

Head over to [Releases](https://github.com/SugarF0x/simple-assistant/releases) and download any artifact version.
Then, head over to [Chrome Extensions](chrome://extensions/) or [Browser Extensions](browser://extensions/) page,
enable **Developer** Mode and click **Load Unpacked**. Select unpacked artifact you downloaded earlier

### Manual build

Clone this repo and follow **Project Setup** instructions to build your own distributive of
any version with any amendments of your own. Installation itself is the same as mentioned above

## Project setup
```
# Install dependencies
$ yarn install

# Compile and hot-reload for development
$ yarn serve

# Compile and minify for production
$ yarn build

# Lint and fix files
$ yarn lint
```
