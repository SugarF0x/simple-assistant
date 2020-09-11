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
// TODO: add arena skip if insufficient funds
// TODO: add settings reset when update hits
// TODO: force default settings for cycle and then set them back? question mark?
// TODO: refactor deprecated click()

import * as $ from 'jquery';

//    TYPES

/**
 * Simple Assistant Data Type
 */
type SADT = 'checkbox' | 'input' | 'display' | 'button' | 'list' | 'description';

//    INTERFACES

/**
 * Engine module instance interface
 */
interface Module {
  sad: SADC;
  data: {
    [property: string]: Checkbox | Input | Display | Button | List | Description;
  };
  init: Function;
}

interface Engine {
  $get: Function,
  $set: Function,
  [property: string]: any
}

//    CLASSES

/**
 * Simple Assistant Display Configuration
 */
class SADC {
  path: string | string[];
  type: 'match' | 'contain';

  constructor(type: 'match' | 'contain', path: string | string[]) {
    this.type = type;
    this.path = path;
  }
}

// TODO: depricate object.type property and move over to object.constructor.name instead? Question mark?

/**
 * Engine Data
 */
class ED {
  type: SADT;

  constructor(type: SADT) {
    this.type = type;
  }
}

/**
 * Engine Data Checkbox
 */
class Checkbox extends ED {
  value: boolean;
  def:   boolean;
  desc:  string;

  constructor(def: boolean, desc: string) {
    super('checkbox');

    this.value = false;
    this.def   = def;
    this.desc  = desc;
  }
}

/**
 * Engine Data Input
 */
class Input extends ED {
  value:  string;
  name:   string;
  def:    string | number;
  desc:   string;
  action: Function;

  constructor(name: string, def: string | number, desc: string, action: Function) {
    super('input');

    this.value  = '';
    this.name   = name;
    this.def    = def.toString();
    this.desc   = desc;
    this.action = action;
  }
}

// TODO: perhaps make Display a parent class and extend Input to it? Question mark?

/**
 * Engine Data Display
 */
class Display extends ED {
  name:  string;
  def:   any;
  desc:  string;
  value: any;

  constructor(name: string, def: any, desc: string) {
    super('display');

    this.name  = name;
    this.def   = def;
    this.desc  = desc;
    this.value = '';
  }
}

/**
 * Engine Data Button
 */
class Button extends ED {
  name:   string;
  desc:   string;
  action: Function;

  constructor(name: string, desc: string, action: Function) {
    super('button');

    this.type   = 'button';
    this.name   = name;
    this.desc   = desc;
    this.action = action;
  }
}

/**
 * Engine Data List
 */
class List extends ED {
  text: string[];

  constructor(text: string[]) {
    super('list')

    this.text = text;
  }
}

/**
 * Engine Data Description
 */
class Description extends ED {
  text: string;

  constructor(text: string) {
    super('description')
    this.text = text;
  }
}

//      FUNCTIONS

/**
 * Searches text for part in it or a number for a digit combination
 *
 * @param {string | number} text - Text to parse for part
 * @param {string | number} part - Part to search for in text
 *
 * @returns {boolean} - Does this text contain this part?
 */
function contains(text: string | number, part: string | number): boolean {
  return text.toString().indexOf(part.toString()) !== -1;
}

/**
 * Get engine module to activate
 *
 * @returns {string | null} - Name of module required or null if none found
 */
function getModule(): string | null {
  let tab = window.location.pathname;
  let module = null as null | string;
  for (let key in engine) {
    if (key[0] !== '$') {
      if (engine[key].sad.type === 'match') {
        engine[key].sad.path.forEach((entry: string) => {
          if (entry === tab)
            module = key;
        })
      } else
      if (engine[key].sad.type === 'contain') {
        if (contains(tab, engine[key].sad.path))
          module = key;
      }
    }
  }
  return module;
}

/**
 * Renders Simple Assistant Display (SAD)
 *
 * @param {string} page - Determines which module to be rendered
 *
 * @returns {void}
 */
function createPanel(page: string): void {
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
    .text(`Simple Assistant v${chrome.runtime.getManifest().version_name}`)
    .css('display', 'flex')
    .css('justify-content', 'space-between')
    .appendTo(col);

  $('<span>')
    .text(page)
    .css('opacity','0.5')
    .css('margin-left', 'auto')
    .css('text-transform','uppercase')
    .appendTo(header);

  if (page === null) {
    $('<p>')
      .text('This page is not supported by Simple Assistant')
      .appendTo(col);
  } else if (!contains(Object.keys(engine).join(' '), page)) {
    $('<p>')
      .text('Invalid page request')
      .appendTo(col);
  } else  {
    for (let key in engine[page].data) {
      let data = engine[page].data[key];

      let label = $('<label>')
        .css('display', 'flex')
        .css('flex-direction', 'row-reverse')
        .css('justify-content','flex-end')
        .css('align-items','center')
        .appendTo(col);

      switch(data.type) {
        case 'checkbox':
          label
            .text(data.desc)
            .click(() => {
              engine[page].data[key].value = !data.value;
              engine.$set(page);
            });

          let checkbox = $('<input>')
            .attr('type','checkbox')
            .css('margin-right','.5rem')
            .appendTo(label);

          if (data.value)
            checkbox.attr('checked', 'checked');

          break;
        case 'input':
          label
            .text(data.name)
            .attr('title',data.desc);

          // TODO: refactor deprecated e.which

          let input = $('<input>')
            .val(data.value)
            .css('margin-right','.5rem')
            .css('color','black')
            .on("keyup", e => {
              if (e.which === 13)
                data.action(input.val());
            })
            .appendTo(label);

          break;
        case 'display':
          label
            .text(data.value.toLocaleString().split(' ').join(','))
            .attr('title',data.desc);

          $('<span>')
            .text(data.name + ':')
            .css('margin-right','.5rem')
            .appendTo(label);

          break;
        case 'button':
          label
            .text(data.desc);

          $('<button>')
            .text(data.name)
            .css('margin-right','.5rem')
            .addClass('btn btn-primary')
            .click(() => data.action())
            .appendTo(label);

          break;
        case 'description':
          $('<div>')
            .text(data.text)
            .css('font-size','1.5em')
            .css('margin-bottom','1rem')
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

//    ENGINE

let engine = {
  $get(page: string): void {
    if (engine.hasOwnProperty(page)) {
      let storage = JSON.parse(localStorage.getItem('SA_' + page));
      if (!storage) {
        for (let key in engine[page].data)
          if (engine[page].data[key].hasOwnProperty('value'))
            engine[page].data[key].value = engine[page].data[key].def;
        engine.$set(page);
      }
      else for (let key in storage) {
        engine[page].data[key].value = storage[key];
      }
    } else throw "engine.$get() error: property <" + page + "> was not found";
  },
  $set(page: string): void {
    let data = {} as any;
    for (let key in engine[page].data)
      if (engine[page].data[key].hasOwnProperty('value'))
        data[key] = engine[page].data[key].value;
      console.log('data: ', data);
    localStorage.setItem('SA_' + page, JSON.stringify(data));
  },
  gamble5050: {
    sad: new SADC ('match', ['/gamecentre/5050']),
    data: {
      isAuto:        new Checkbox (false, 'Automatically place bets'),
      baseline:      new Input    ('Baseline', 100, 'A base bet to go off of', (newValue: any) => {
        if (!isNaN(newValue)) {
          engine.gamble5050.data.baseline.value = newValue;
          engine.gamble5050.data.current.value  = newValue;
          engine.$set('gamble5050');
          createPanel('gamble5050');
        }
      }),
      current:       new Display  ('Current',        100, 'A bet to be placed this bout'),
      profitRuntime: new Display  ('Runtime profit', 0,   'The amount of gold made/lost this runtime'),
      profitTotal:   new Display  ('Total profit',   0,   'The amount of gold made/lost overall'),
      streak:        new Display  ('Streak',         0,   'Current win/lose streak')
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

          // TODO: refactor deprecated submit()

          setTimeout(() => {
            form.submit();
          },250)
        }, Math.floor(Math.random()*1000)+250)
      }
    }
  } as Module,
  travel: {
    sad: new SADC ('match',['/travel']),
    data: {
      isAuto:           new Checkbox (true,  'Take steps on cooldown'),
      attackEncounters: new Checkbox (true,  'Attack encountered NPCs'),
      stopOnEncounters: new Checkbox (false, 'Pause auto-step on enemy encounter'),
      slowMode:         new Checkbox (false, 'Continue walking when out of steps')
    },
    init() {
      engine.home.init();
      engine.$get('travel');
      let data = engine.travel.data;

      let step = $('.stepbuttonnew')[0];
      let slow = $('#slow-mode')[0];

      let interval = setInterval(() => {
        try {
          if (data.isAuto.value) {
            let attack = $('.cta');
            [].forEach.call(attack, (entry: HTMLElement) => {
              if (contains(entry.textContent, 'Attack')) {
                if (data.stopOnEncounters.value) clearInterval(interval);
                if (data.attackEncounters.value) entry.click();
              }
            });
            if (slow.style.display !== 'none' && !data.slowMode.value) clearInterval(interval);
            if (contains(step.textContent, 'step')) step.click();
          } else clearInterval(interval);

          if (engine.home.data.state.value === 'standby' && engine.home.data.stage.value === 3) {
            if (parseInt($('#current_steps').text()) <= 0) {
              engine.home.data.state.value = 'pending';
              engine.$set('home');
            }
          }
        } catch (err) {
          clearInterval(interval);
        }
      }, 1000);
    }
  } as Module,
  battle: {
    sad: new SADC ('contain','npcs/attack'),
    data: {
      isAuto: new Checkbox (true, 'Attack enemy on cooldown'),
      goBack: new Checkbox (true, 'Go back when enemy is defeated')
    },
    init() {
      engine.$get('battle');
      let data = engine.battle.data;

      let attack = $('#attackButton')[0];
      let back   = $('.btn-info')[0];
      let enemy  = $('#enemyBox')[0];

      let interval = setInterval(() => {
        try {
          if (data.isAuto.value) {
            if (enemy.style.cssText === 'opacity: 0.1;') {
              clearInterval(interval);
              if (data.goBack.value) back.click();
            } else if (attack.innerText === 'Attack') attack.click();
          } else clearInterval(interval)
        } catch (err) {
          clearInterval(interval);
        }
      },Math.floor(Math.random()*400)+1200)
    }
  },
  quests: {
    sad: new SADC ('match',['/quests/viewall']),
    data: {
      isAuto: new Checkbox (true, 'Auto-repeat selected quest'),
      doLast: new Button   ('Select','Find last incomplete quest', () => {
        try {
          [].forEach.call([].reverse.call($('.kt-widget5__title')), (entry: any) => {
            if (!entry.children.length) {
              entry.parentElement.parentElement.parentElement.children[1].children[0].children[0].click();
              throw 'Break forEach'
            }
          });
        } catch {}
      })
    },
    init() {
      engine.home.init();
      engine.$get('quests');
      let data = engine.quests.data;

      $('.btn-info').click(() => {
        if (data.isAuto.value) {
          setTimeout(() => {
            let interval = setInterval(() => {
              try {
                let button = $('.swal2-confirm')[0];
                let plug = $('.swal2-validation-message')[0] as any; // its here only to suppress TS type check where attributeStyleMap does not exist on HTMLElement (tho it does)
                if (plug.attributeStyleMap.size === 3) {
                  clearInterval(interval);
                  window.location.reload();
                } else
                if (contains(button.innerText, 'Repeat') || contains(button.innerText, 'Perform'))
                  button.click()
              } catch (err) {
                clearInterval(interval)
              }
            }, Math.floor(Math.random()*500)+250)
          },500)
        }
      });

      if (engine.home.data.state.value === 'standby' && engine.home.data.stage.value === 1) {
        if (parseInt($('#current_quest_points').text()) > 0)
          setTimeout(() => {
            data.doLast.action();
          }, 1000);
        else {
          engine.home.data.state.value = 'pending';
          engine.$set('home');
        }
      }
    }
  } as Module,
  arena: {
    sad: new SADC ('match', ['/battlearena']),
    data: {
      isAuto:   new Checkbox (true, 'Auto-accept enemy generation prompts'),
      fightAll: new Button   ('Fight', 'Spend all available energy on arena', () => {
        localStorage.setItem('SA_arena_tmp', JSON.stringify({fightAll:true}));
        $('.btn-custom')[0].click();
      })
    },
    init() {
      engine.home.init();
      engine.$get('arena');
      let data = engine.arena.data;

      let generate = $('.btn-custom').first();

      let storage = JSON.parse(localStorage.getItem('SA_arena_tmp'));
      if (storage && storage.fightAll)
        if (parseInt($('#current_energy').text()) > 0)
          setTimeout(() => {generate.click()}, 250);
        else
          localStorage.removeItem('SA_arena_tmp');

      generate.click(() => {
        if (data.isAuto.value) {
          let interval = setInterval(() => {
            try {
              let button = $('.swal2-confirm')[0];
              if (contains(button.innerText, 'generate') || contains(button.innerText, 'Attack'))
                button.click()
            } catch (err) {
              clearInterval(interval)
            }
          }, Math.floor(Math.random() * 500) + 750)
        }
      });

      if (engine.home.data.state.value === 'standby' && engine.home.data.stage.value === 2) {
        if (parseInt($('#current_energy').text()) > 0)
          setTimeout(() => {
            generate.click();
          }, 1000);
        else {
          engine.home.data.state.value = 'pending';
          engine.$set('home');
        }
      }
    }
  } as Module,
  home: {
    sad: new SADC ('match', ['/home','/']),
    data: {
      desc: new Description('A cycle is a completion of all available tasks in succession, that being'),
      list: new List([
        'Spend all quest points on latest incomplete quest',
        'Spend all energy on arena',
        'Take all steps',
        'Go to work for 50 minutes'
      ]),
      warning: new Description('!WARNING! AFK CYCLE LOOP MAY CAUSE SUSPICION AND LEAD TO YOUR ACCOUNT BEING LOCKED'),
      isAuto: new Checkbox(false, 'Auto-repeat cycle after job is finished'),
      performCycle: new Button('Start', 'Cycle through all aforementioned tasks', () => {
        engine.home.data.state.value = 'pending';
        engine.$set('home');
        engine.home.init();
      }),
      breakCycle: new Button('Stop', 'Stop current cycle', () => {
        engine.home.data.state.value = 'disabled';
        engine.home.data.stage.value = 0;
        engine.$set('home');
        window.location.reload();
      }),
      stage: new Display('Stage', 0, 'Current cycle stage'),
      state: new Display('State', 'disabled', 'State of current stage')
    },
    init() {
      engine.$get('home');
      let data = engine.home.data;

      let modules = [
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
          ];

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
      function switcher(): void {
        switch (data.state.value) {

          // TODO: fix this bit here as even when disabled it still proceedes given isAuto is true
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
            window.location.href=modules[data.stage.value].href;
            break;
          case 'standby':
            let interval = setInterval(() => {
              try {
                if (data.state.value !== 'standby') {
                  window.location.reload();
                }
              } catch (err) {
                clearInterval(interval)
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
  } as Module,
  job: {
    sad: new SADC ('contain', 'jobs'),
    data: {
      work: new Button ('Work', 'Go to work for 50 minutes', () => {
        localStorage.setItem('SA_work_tmp', JSON.stringify({work:'pending'}));
        if (contains(window.location.href, 'viewall'))
          $('a.btn-success')[0].click();
        else if (engine.home.data.state.value === 'disabled')
          engine.job.init();
      })
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
          [].filter.call($('a.btn-success'), (entry: any) => contains(entry.text, 'Start'))[0].click();
          localStorage.setItem('SA_work_tmp', JSON.stringify({work:'working'}));
          setTimeout(() => {
            $('input[type=range]').val(5);
            $('.swal2-confirm').click()
          },500)
        }, 500)
      } else if (temp.work === 'working') {
        localStorage.removeItem('SA_work_tmp');
        let mins = 50;
        $('.btn-pill').first().text('Simple Assistant is currently working for you');
        setInterval(() => {
          $('.kt-portlet__foot').children('strong').text(--mins)
        }, 1000 * 60);
        setTimeout(() => {
          engine.home.data.state.value = 'finished';
          engine.$set('home');
        }, 1000 * 60 * 51)
      }
    }
  } as Module
} as Engine;

//    CONTENT INIT

if (getModule())
  engine[getModule()].init();
createPanel(getModule());
