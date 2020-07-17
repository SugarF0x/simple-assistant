/* TODO: add market assistant
     that would buy set amount of cheapest items
     for daily tasks
*/

/* TODO: add inventory assistant
     that would sell all inventory items to NPC
     and save a lot of time on clicking
       not like anyone is gonna be buying that trash
       (equip, not collectibles)
 */

/* TODO: add quest assist
     that being a button to spend all available quest points
     on the last incomplete quest
       (without COMPLETE tag)
 */

/* TODO: add battle assist
     that being a button to spend all energy on generating
     and fighting an enemy
 */

/* TODO: add travel statistics
     gather travel data of gold collected,
     items found, steps taken, enemies encountered
        Have it also take timestamp and if the last stamp
        was more than 5 minutes ago - dump stats
            Make stats dump an optional thing
            Or perhaps make total stats and latest session stats
            so that there is no need in optionizing that
*/

// TODO: add auto dismiss level up popup

/* TODO: !just a shower thought!
    the engine object is beginning to look quite bulky if you ask me
    and i begin to worry about it performance-wise
    I have an idea of how to make it better but not yet sure if it's necessary
    but I could make a function like startEngnie() that would fill engine
    object with only required data (e.g. only travel or only battle)
    thus freeing up quite some portion of space
      Given the scale of this extension, i'd argues its not necessary but still
      if i ever encounter some performance related problems,
      I should probably give it a second thought
 */

let engine = {
  $get: (page) => {
    if (engine.hasOwnProperty(page)) {
      let storage = JSON.parse(localStorage.getItem('SA_' + page));
      if (!storage) {
        for (let key in engine[page].data)
          engine[page].data[key].value = engine[page].data[key].default;
        engine.$set(page);
      }
      else for (let key in storage) {
        engine[page].data[key].value = storage[key];
      }
    } else throw "engine.$get() error: property <" + page + "> was not found";
  },
  $set: (page) => {
    let data = {};
    for (let key in engine[page].data)
      data[key] = engine[page].data[key].value;
    localStorage.setItem('SA_' + page, JSON.stringify(data));
  },
  gamble: {
    oneInTwo: {
      data: {
        isActive: null,
        current:  null,
        baseline: null,
        profit:   null
      },
      roll:() => {
        let data = engine.gamble.oneInTwo.data;
        
        let isSuccess = $('.notice-success').length > 0;
        let isFailure = $('.notice-danger').length > 0;
        let input     = $('#sample1');
        let form      = $('#submit');

        // TODO: add gold/min display
        // TODO: add lose-streak display and fail-safe for when lose-streak goes too bad
        // TODO: add longest win/lose streaks this runtime
        // TODO: add input for baseline value inside DOM
        // TODO: fix bug with storage overflow after long term use
        // TODO: add documentation
        // TODO: use async await? question mark?

        chrome.storage.sync.get("profit", state => {
          data.profit = state.profit || 0;
          chrome.storage.sync.get("isActive", state => {
            data.isActive = state.isActive;
            chrome.storage.sync.get("baseline", bet => {
              data.baseline = bet.baseline || 1;
              chrome.storage.sync.get("current", bet => {
                data.current = parseInt(bet.current) || parseInt(data.baseline);
                if (isFailure) {
                  data.profit -= data.current;
                  data.current = bet.current*2;
                } else if (isSuccess) {
                  data.profit += data.current;
                  data.current = data.baseline;
                } else {
                  data.profit = 0;
                  data.isActive = 0;
                }
                chrome.storage.sync.set({current: data.current});
                chrome.storage.sync.set({profit: data.profit});
                chrome.storage.sync.set({isActive: data.isActive});

                function timeout() {
                  setTimeout(() => {
                    input.val(data.current);

                    setTimeout(() => {
                      form.submit();
                    },250)
                  }, Math.floor(Math.random()*1000)+250)
                }

                let header = $('.kt-subheader__title');
                let newHeader = ` | Gambler: [ ${data.isActive} | ${data.baseline} | ${data.current} ]`;
                header.append(newHeader);

                let profitDisplay = $('<span></span>');
                if (data.profit > 0) {
                  profitDisplay.text(`+${data.profit}`);
                  profitDisplay.css({"color": "green"})
                } else if (data.profit < 0) {
                  profitDisplay.text(`${data.profit}`);
                  profitDisplay.css({"color": "red"})
                } else {
                  profitDisplay.text(data.profit);
                }
                profitDisplay.css({"margin-left": '1rem'});
                header.append(profitDisplay);

                let initButton = $('<button></button>')
                  .text(data.isActive ? 'Stop' : 'Begin')
                  .css({"margin-left": '1rem', "border-radius": "1rem"})
                  .click(() => {
                    if (data.isActive) {
                      chrome.storage.sync.set({isActive: 0})
                    } else {
                      chrome.storage.sync.set({isActive: 1});
                      timeout()
                    }
                  });
                header.append(initButton);

                if (data.isActive) {
                  timeout();
                }
              });
            });
          });
        });
      }
    }
  },
  travel: {
    data: {
      isAuto: {
        type:  Boolean,
        value: null,
        default: true,
        desc: 'Take steps on cooldown'
      },
      attackEncounters: {
        type:  Boolean,
        value: null,
        default: true,
        desc: 'Attack encountered NPCs'
      },
      stopOnEncounters: {
        type:  Boolean,
        value: null,
        default: false,
        desc: 'Pause on enemy encounter'
      },
      slowMode: {
        type:  Boolean,
        value: null,
        default: true,
        desc: 'Continue walking when out of steps'
      }
    },
    init: () => {
      engine.$get('travel');
      let data = engine.travel.data;

      let step = $('.stepbuttonnew')[0];
      let slow = $('#slow-mode')[0];

      let interval = setInterval(() => {
        if (data.isAuto.value) {
          let attack = $('.cta');
          [].forEach.call(attack, entry => {
            if (entry.textContent.indexOf('Attack') !== -1) {
              if (data.stopOnEncounters.value) clearInterval(interval); else if (data.attackEncounters.value) entry.click();
            }
          });
          if (slow.style.display !== 'none' && !data.slowMode.value) clearInterval(interval);
          if (step.textContent.indexOf('step') !== -1) step.click();
        } else clearInterval(interval);
      }, 1000);
    }
  },
  battle: {
    data: {
      isAuto: {
        type:  Boolean,
        value: null,
        default: true,
        desc: 'Attack enemy on cooldown'
      },
      goBack: {
        type:  Boolean,
        value: null,
        default: true,
        desc: 'Go back when enemy is defeated'
      }
    },
    init: () => {
      engine.$get('battle');
      let data = engine.battle.data;

      let attack = $('#attackButton')[0];
      let back   = $('.btn-info')[0];
      let enemy  = $('#enemyBox')[0];

      let interval = setInterval(() => {
        if (data.isAuto.value) {
          if (enemy.style.cssText === 'opacity: 0.1;') {
            clearInterval(interval);
            if (data.goBack.value) back.click();
          } else if (attack.innerText === 'Attack') attack.click();
        } else clearInterval(interval)
      },Math.floor(Math.random()*400)+1200)
    }
  }
};

function createPanel(page) {
  /* TODO: add content switch
      so as to only load content
      based or page select
        perhaps should make this one automatically fill out
        based on current engine.data properties
   */

  let old = $('#sa-display');
  if (old.length) old.remove();

  let stats = $('.kt-container')[1].children[0];

  let display = $('<div>')
    .addClass('kt-portlet')
    .attr('id','sa-display')
    .insertAfter(stats);

  let row = $('<div>')
    .addClass('row')
    .appendTo(display);

  let col = $('<div>')
    .addClass('col')
    .css('padding', '1rem')
    .appendTo(row);

  // actual content starts here
  // everything is to be appended to col

  $('<h2>')
    .text('Simple Assistant v1.2.3 +Dev')
    .appendTo(col);

  if (page === undefined) {
    $('<p>')
      .text('This page is not supported by Simple Assistant')
      .appendTo(col);
  } else if (Object.keys(engine).join(' ').indexOf(page) === -1) {
    $('<p>')
      .text('Invalid page request')
      .appendTo(col);
  } else  {
    for (let key in engine[page].data) {
      let tile = $('<div>')
        .appendTo(col);

      if (engine[page].data[key].type === Boolean) {
        let label = $('<label>')
          .text(engine[page].data[key].desc)
          .css('display', 'flex')
          .css('flex-direction', 'row-reverse')
          .css('justify-content','flex-end')
          .css('align-items','center')
          .click(() => {
            engine[page].data[key].value = !engine[page].data[key].value;
            engine.$set(page);
            engine[page].init();
          })
          .appendTo(col);

        let checkbox = $('<input>')
          .attr('type','checkbox')
          .css('margin-right','.5rem')
          .appendTo(label);

        if (engine[page].data[key].value) checkbox.attr('checked', 'checked');
      }
    }
  }
}

function figureOut() {
  if (tab.indexOf('npcs/attack') !== -1) {
    engine.battle.init();
    createPanel('battle');
  } else {
    createPanel();
  }
}

//

let tab = window.location.pathname;

switch (tab) {
  case '/gamecentre/5050':
    engine.gamble.oneInTwo.roll();
    createPanel('oneInTwo');
    break;
  case '/travel':
    engine.travel.init();
    createPanel('travel');
    break;
  default:
    figureOut();
}