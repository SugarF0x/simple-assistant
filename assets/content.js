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

/* TODO: add full options page
     add button to top-right cornet of display that would lead to
     lets say https://web.simple-mmo.com/simpleassistant
     where the page would get fully replaced by one large card
     with all the available settings for all modules
     so that one could edit thwn without accessing said pages
     in the first place
       that would be good for them pages with isAuto: true
 */

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
  gamble5050: {
    data: {
      isAuto: {
        type:    'checkbox',
        value:   null,
        default: false,
        desc:    'Automatically place bets'
      },
      baseline: {
        type:    'input',
        value:   null,
        default: 100,
        name:    'Baseline',
        desc:    'A base bet to go off of',
        action:  (newValue) => {
          if (!isNaN(newValue)) {
            engine.gamble5050.data.baseline.value = parseInt(newValue);
            engine.gamble5050.data.current.value  = parseInt(newValue);
            engine.$set('gamble5050');
            createPanel('gamble5050');
          }
        }
      },
      current: {
        type:    'display',
        value:   null,
        default: 100,
        name:    'Current',
        desc:    'A bet to be placed this bout'
      },
      profitRuntime: {
        type:    'display',
        value:   null,
        default: 0,
        name:    'Runtime profit',
        desc:    'The amount of gold made/lost this runtime'
      },
      profitTotal: {
        type:    'display',
        value:   null,
        default: 0,
        name:    'Total profit',
        desc:    'The amount of gold made/lost overall'
      },
      streak: {
        type:    'display',
        value:   null,
        default: 0,
        name:    'Streak',
        desc:    'Current win/lose streak'
      }
    },
    init:() => {
      engine.$get('gamble5050');
      let data = engine.gamble5050.data;

      let isSuccess = $('.notice-success').length > 0;
      let isFailure = $('.notice-danger').length  > 0;
      let input     = $('#sample1');
      let form      = $('#submit');

      // TODO: add gold/min display
      // TODO: add lose-streak display and fail-safe for when lose-streak goes too bad
      // TODO: add longest win/lose streaks this runtime

      if (isFailure) {
        data.profitRuntime.value -= data.current.value;
        data.profitTotal.value   -= data.current.value;
        data.current.value       *= 2;
        if (data.streak.value < 0)  data.streak.value--;
        else data.streak.value    = -1;
      } else if (isSuccess) {
        data.profitRuntime.value += data.current.value;
        data.profitTotal.value   += data.current.value;
        data.current.value        = data.baseline.value;
        if (data.streak.value > 0)  data.streak.value++;
        else data.streak.value    = 1;
      } else {
        data.profitRuntime.value = 0;
        data.streak.value        = 0;
      }
      engine.$set('gamble5050');

      if (data.isAuto.value) {
        setTimeout(() => {
          input.val(data.current.value);

          setTimeout(() => {
            form.submit();
          },250)
        }, Math.floor(Math.random()*1000)+250)
      }
    }
  },
  travel: {
    data: {
      isAuto: {
        type:    'checkbox',
        value:   null,
        default: true,
        desc:    'Take steps on cooldown'
      },
      attackEncounters: {
        type:    'checkbox',
        value:   null,
        default: true,
        desc:    'Attack encountered NPCs'
      },
      stopOnEncounters: {
        type:    'checkbox',
        value:   null,
        default: false,
        desc:    'Pause auto-step on enemy encounter'
      },
      slowMode: {
        type:    'checkbox',
        value:   null,
        default: false,
        desc:    'Continue walking when out of steps'
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
              if (data.stopOnEncounters.value) clearInterval(interval);
              if (data.attackEncounters.value) entry.click();
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
        type:    'checkbox',
        value:   null,
        default: true,
        desc:    'Attack enemy on cooldown'
      },
      goBack: {
        type:    'checkbox',
        value:   null,
        default: true,
        desc:    'Go back when enemy is defeated'
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
  },
  quests: {
    data: {
      isAuto: {
        type:    'checkbox',
        value:   null,
        default: true,
        desc:    'Auto-repeat selected quest'
      },
      doLast: {
        type: 'button',
        name: 'Select',
        desc: 'Find last incomplete quest',
        action: () => {
          try {
            [].forEach.call([].reverse.call($('.kt-widget5__title')), entry => {
              if (!entry.children.length) {
                entry.parentElement.parentElement.parentElement.children[1].children[0].children[0].click();
                throw 'Break forEach'
              }
            });
          } catch {}
        }
      }
    },
    init: () => {
      engine.$get('quests');
      let data = engine.quests.data;

      $('.btn-info').click(() => {
        if (data.isAuto.value) {
          setTimeout(() => {
            let interval = setInterval(() => {
              let button = $('.swal2-confirm')[0];
              if ($('.swal2-validation-message')[0].attributeStyleMap.size === 3) {
                clearInterval(interval);
                window.location.reload();
              } else
                if (button.innerText.indexOf('Repeat') !== -1 || button.innerText.indexOf('Perform') !== -1)
                  button.click()
            }, Math.floor(Math.random()*1000)+250)
          },500)
        }
      });
    }
  }
};

function createPanel(page) {
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
    .text(`Simple Assistant ${chrome.runtime.getManifest().version} ${chrome.runtime.getManifest().version_name}`)
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

      // TODO: refactor label element into a universal one? question mark?

      let data = engine[page].data[key];
      switch(data.type) {
        case 'checkbox':
          let cLabel = $('<label>')
            .text(data.desc)
            .css('display', 'flex')
            .css('flex-direction', 'row-reverse')
            .css('justify-content','flex-end')
            .css('align-items','center')
            .click(() => {
              engine[page].data[key].value = !data.value;
              engine.$set(page);
            })
            .appendTo(col);

          let checkbox = $('<input>')
            .attr('type','checkbox')
            .css('margin-right','.5rem')
            .appendTo(cLabel);

          if (data.value) checkbox.attr('checked', 'checked');

          break;
        case 'input':
          let iLabel = $('<label>')
            .text(data.name)
            .css('display', 'flex')
            .css('flex-direction', 'row-reverse')
            .css('justify-content','flex-end')
            .css('align-items','center')
            .attr('title',data.desc)
            .appendTo(col);

          let input = $('<input>')
            .val(data.value)
            .css('margin-right','.5rem')
            .css('color','black')
            .on("keyup", e => {
              if (e.which === 13)
                data.action(input.val());
            })
            .appendTo(iLabel);

          break;
        case 'display':
          let dLabel = $('<label>')
            .text(data.value.toLocaleString().split(' ').join(','))
            .css('display', 'flex')
            .css('flex-direction', 'row-reverse')
            .css('justify-content','flex-end')
            .css('align-items','center')
            .attr('title',data.desc)
            .appendTo(col);

          let display = $('<span>')
            .text(data.name + ':')
            .css('margin-right','.5rem')
            .appendTo(dLabel);

          break;
        case 'button':
          let bLabel = $('<label>')
            .text(data.desc)
            .css('display', 'flex')
            .css('flex-direction', 'row-reverse')
            .css('justify-content','flex-end')
            .css('align-items','center')
            .appendTo(col);

          let button = $('<button>')
            .text(data.name)
            .css('margin-right','.5rem')
            .css('color','black')
            .click(() => data.action())
            .appendTo(bLabel);

          break;
      }
    }

    $('<small>')
      .text('*Some changes may require a page refresh to take effect')
      .css('opacity','0.7')
      .appendTo(col);
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
    engine.gamble5050.init();
    createPanel('gamble5050');
    break;
  case '/travel':
    engine.travel.init();
    createPanel('travel');
    break;
  case '/quests/viewall':
    engine.quests.init();
    createPanel('quests');
    break;
  default:
    figureOut();
}