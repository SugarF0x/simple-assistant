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

/* TODO: add travel statistics
     gather travel data of gold collected,
     items found, steps taken, enemies encountered
        Have it also take timestamp and if the last stamp
        was more than 5 minutes ago - dump stats
            Make stats dump an optional thing
            Or perhaps make total stats and latest session stats
            so that there is no need in optionizing that
*/

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

// TODO: refactor data instances and engine params into separate classes
//          split engine keys into js modules? question mark?

// TODO: refactor all element [0] queries to use .first() instead

// TODO: create function for searching index of and returning boolean

// TODO: add arena skip if insufficient funds

// TODO: add settings reset when update hits

// TODO: force default settings for cycle and then set them back? question mark?

let engine = {
  $get(page) {
    if (engine.hasOwnProperty(page)) {
      let storage = JSON.parse(localStorage.getItem('SA_' + page));
      if (!storage) {
        for (let key in engine[page].data)
          if (engine[page].data[key].hasOwnProperty('value'))
            engine[page].data[key].value = engine[page].data[key].default;
        engine.$set(page);
      }
      else for (let key in storage) {
        engine[page].data[key].value = storage[key];
      }
    } else throw "engine.$get() error: property <" + page + "> was not found";
  },
  $set(page) {
    let data = {};
    for (let key in engine[page].data)
      if (engine[page].data[key].hasOwnProperty('value'))
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
    init() {
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
    init() {
      engine.home.init();
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

        if (engine.home.data.state.value === 'standby' && engine.home.data.stage.value === 3) {
          if ($('#current_steps').text() <= 0) {
            engine.home.data.state.value = 'pending';
            engine.$set('home');
          }
        }
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
    init() {
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
    init() {
      engine.home.init();
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
            }, Math.floor(Math.random()*500)+250)
          },500)
        }
      });

      if (engine.home.data.state.value === 'standby' && engine.home.data.stage.value === 1) {
        if ($('#current_quest_points').text() > 0)
          setTimeout(() => {
            data.doLast.action();
          }, 1000);
        else {
          engine.home.data.state.value = 'pending';
          engine.$set('home');
        }
      }
    }
  },
  arena: {
    data: {
      isAuto: {
        type:    'checkbox',
        value:   null,
        default: true,
        desc:    'Auto-accept enemy generation prompts'
      },
      fightAll: {
        type: 'button',
        name: 'Fight',
        desc: 'Spend all available energy on arena',
        action: () => {
          localStorage.setItem('SA_arena_tmp', JSON.stringify({fightAll:true}));
          $('.btn-custom')[0].click();
        }
      }
    },
    init() {
      engine.home.init();
      engine.$get('arena');
      let data = engine.arena.data;

      let generate = $('.btn-custom').first();

      let storage = JSON.parse(localStorage.getItem('SA_arena_tmp'));
      if (storage && storage.fightAll)
        if ($('#current_energy').text() > 0)
          setTimeout(() => {generate.click()}, 250);
        else
          localStorage.removeItem('SA_arena_tmp');

      generate.click(() => {
        if (data.isAuto.value) {
          let interval = setInterval(() => {
            let button = $('.swal2-confirm')[0];
            if (button.innerText.indexOf('generate') !== -1 || button.innerText.indexOf('Attack') !== -1)
              button.click()
          }, Math.floor(Math.random() * 500) + 750)
        }
      });

      if (engine.home.data.state.value === 'standby' && engine.home.data.stage.value === 2) {
        if ($('#current_energy').text() > 0)
          setTimeout(() => {
            generate.click();
          }, 1000);
        else {
          engine.home.data.state.value = 'pending';
          engine.$set('home');
        }
      }
    }
  },
  home: {
    data: {
      desc: {
        type: 'description',
        text: 'A cycle is a completion of all available tasks in succession, that being'
      },
      list: {
        type: 'list',
        text: [
          'Spend all quest points on latest incomplete quest',
          'Spend all energy on arena',
          'Take all steps',
          'Go to work for 50 minutes'
        ]
      },
      modules: [
        {
          page: 'home',
          href: '/'
        },
        {
          page: 'quests',
          href: '/quests/viewall'
        },
        {
          page: 'arena',
          href: '/battlearena'
        },
        {
          page: 'travel',
          href: '/travel'
        },
        {
          page: 'job',
          href: '/jobs/viewall'
        }
      ],
      isAuto: {
        type:    'checkbox',
        value:   null,
        default: false,
        desc:    'Auto-repeat cycle after job is finished'
      },
      performCycle: {
        type: 'button',
        name: 'Start',
        desc: 'Cycle through all aforementioned tasks',
        action: () => {
          engine.home.data.state.value = 'pending';
          engine.$set('home');
          engine.home.init();
        }
      },
      breakCycle: {
        type: 'button',
        name: 'Stop',
        desc: 'Stop current cycle',
        action: () => {
          engine.home.data.state.value = 'disabled';
          engine.home.data.stage.value = 0;
          engine.$set('home');
          window.location.reload();
        }
      },
      stage: {
        type:    'display',
        value:   null,
        default: 0,
        name:    'Stage',
        desc:    'Current cycle stage'
      },
      state: {
        type:    'display',
        value:   null,
        default: 'disabled',
        name:    'State',
        desc:    'State of current stage'
      }
    },
    init() {
      engine.$get('home');
      let data = engine.home.data;

      if (data.isAuto.value) {
        console.log('Proceeding with step in 3 seconds...');
        setTimeout(() => {
          switcher()
        }, 3000)
      } else {
        switcher()
      }

      /**
       * disabled - cycle not initiated
       * pending  - awaiting page change
       * standby  - on needed page, awaiting state change
       * finished - break cycle or repeat if isAuto
       */
      function switcher() {
        switch (data.state.value) {
          case 'disabled':
            if (data.isAuto.value) {
              data.state.value = 'pending';
              engine.$set('home');
              window.location.reload();
            }
            break;
          case 'pending':
            data.stage.value < 5 ? data.stage.value++ : data.stage.value = 1;
            data.state.value = 'standby';
            engine.$set('home');
            window.location.href=data.modules[data.stage.value].href;
            break;
          case 'standby':
            setInterval(() => {
              if (data.state.value !== 'standby') {
                window.location.reload();
              }
            },1000);
            break;
          case 'finished':
            data.stage.value = 0;
            if (data.isAuto.value)
              data.state.value = 'pending';
            else
              data.state.value = 'disabled';
            engine.$set('home');
            window.location.href = '/';
            break;
        }
      }
    },
  },
  job: {
    data: {
      work: {
        type: 'button',
        name: 'Work',
        desc: 'Go to work for 50 minutes',
        action: () => {
          localStorage.setItem('SA_work_tmp', JSON.stringify({work:'pending'}));
          if (window.location.href.indexOf('viewall') !== -1)
            $('a.btn-success')[0].click();
          else if (engine.home.data.state.value === 'disabled')
            engine.job.init();
        }
      }
    },
    init() {
      engine.home.init();
      let temp = JSON.parse(localStorage.getItem('SA_work_tmp')) || {work: false};
      if (engine.home.data.stage.value === 4
       && engine.home.data.state.value === 'standby'
       && !temp.work) {
        engine.job.data.work.action();
      }

      if (temp.work === 'pending') {
        setTimeout(() => {
          [].filter.call($('a.btn-success'), entry => entry.text.indexOf('Start') !== -1)[0].click();
          localStorage.setItem('SA_work_tmp', JSON.stringify({work:'working'}));
          setTimeout(() => {
            $('input[type=range]').val(5);
            $('.swal2-confirm').click()
          },500)
        }, 500)
      } else if (temp.work === 'working') {
        localStorage.removeItem('SA_work_tmp');
        let mins = 51;
        setInterval(() => {
          console.log('Working. Time remaining: ' + --mins);
        }, 1000 * 60);
        setTimeout(() => {
          engine.home.data.state.value = 'finished';
          engine.$set('home');
        }, 1000 * 60 * 51)
      }
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

  let header = $('<h2>')
    .text(`Simple Assistant ${chrome.runtime.getManifest().version} ${chrome.runtime.getManifest().version_name}`)
    .css('display', 'flex')
    .css('justify-content', 'space-between')
    .appendTo(col);

  $('<span>')
    .text(page)
    .css('opacity','0.5')
    .css('margin-left', 'auto')
    .css('text-transform','uppercase')
    .appendTo(header);

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
        case 'description':
          $('<div>')
            .text(data.text)
            .css('font-size','1.5em')
            .appendTo(col);

          break;
        case 'list':
          let ul = $('<ul>')
            .text(data.value ? data.value.toLocaleString().split(' ').join(',') : '')
            .appendTo(col);

          for (let i of data.text) {
            $('<li>')
              .text(i)
              .appendTo(ul);
          }

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
  } else if (tab.indexOf('jobs') !== -1) {
    engine.job.init();
    createPanel('job')
  } else {
    createPanel();
  }
}

//

// TODO: move createPanel() functions to appropriate init()s
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
  case '/battlearena':
    engine.arena.init();
    createPanel('arena');
    break;
  case '/':
    engine.home.init();
    createPanel('home');
    break;
  default:
    figureOut();
}