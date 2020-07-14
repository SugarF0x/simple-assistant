chrome.runtime.sendMessage({todo: "showPageAction"});

const engine = {
  gamble: {
    oneInTwo: {
      data: {
        $get: () => {
          // update this.data as per local storage
        },
        $set: () => {
          // update local storage as per this.data
        },
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
        // TODO: add longers win/lose streaks this runtime
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
      $get: () => {
        // update this.data as per local storage
      },
      $set: () => {
        // update local storage as per this.data
      },
      isAuto: true
    },
    step: () => {
      let data = engine.travel.data;

      let step   = $('.stepbuttonnew')[0];
      let attack = $('.cta');

      if (data.isAuto) {
        setInterval(() => {
          if (attack[0].textContent.indexOf('Attack') !== -1) attack[0].click(); else
          if (step.textContent.indexOf('step') !== -1) step.click()
        }, 1000);
      }
    }
  },
  battle: {
    data: {
      $get: () => {
        // update this.data as per local storage
      },
      $set: () => {
        // update local storage as per this.data
      },
      isAuto: true
    },
    attack: () => {
      let data = engine.battle.data;

      let attack = $('#attackButton')[0];
      let back   = $('.btn-info')[0];
      let enemy  = $('#enemyBox')[0];

      if (data.isAuto) {
        setInterval(() => {
          if (enemy.style.cssText === 'opacity: 0.1;') back.click(); else
          if (attack.innerText === 'Attack') attack.click();
        },2000)
      }
    }
  }
};

// TODO: add auto dismiss level up popup

function figureOut() {
  if (tab.indexOf('npcs/attack') !== -1) {
    engine.battle.attack();
  }
}

//

let tab = window.location.pathname;

switch (tab) {
  case '/gamecentre/5050':
    engine.gamble.oneInTwo.roll();
    break;
  case '/travel':
    engine.travel.step();
    break;
  default:
    figureOut();
}