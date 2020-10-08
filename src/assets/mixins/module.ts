export default {
  watch: {
    options: {
      handler() {
        this.set();
      },
      deep: true
    }
  },

  // TODO: add a workaround the new anti-cheat mechanism
  // by adding a hash to the user

  methods: {
    get() {
      let storage = JSON.parse(localStorage.getItem(`SA_${ this.$options.name }_but-a-band-aid`));
      if (!storage || storage.version !== this.version) {
        this.set();
      } else {
        this.options = storage.options;
      }
    },

    set() {
      let data = {
        version: this.version,
        options: this.options,
      };
      localStorage.setItem(`SA_${ this.$options.name }_but-a-band-aid`, JSON.stringify(data));
    },
  },

  created() {
    let message = localStorage.getItem('A_MESSAGE_FOR_THE_DEVS');
    if (!message) {
      localStorage.setItem('A_MESSAGE_FOR_THE_DEVS',
        `
        Hi. My name is Sugar_F0x a.k.a. Hoof Lover (player id 345303).
        I've been developing this plugin for a couple of months now.
        Funny enough how it grew from being a mere 50/50 gamble assistant to an all-out afk grinder.
        I never meant any harm to this game or to the community.
        Neither did I have any intention to ruin the experience for honest players.
        This was more of a passion project, something I would get to after a day at studies and evening at work.
        Talk about work, this very project actually helped me land an interview in a big company.
        So, thanks, i guess?
        I am flattered for you have noticed my work and cared enough to take actions against it.
        Patch 2.2.0 will be my last one.
        And this is my goodbye message.
        I am thankful for the joyride you provided me with via your game.
        It was fun while it lasted.
        Feel free to ban my account.
        I do not intend to continue playing.
        Once again, thanks for all, and goodbye.
        Yours sincerely,
        Sugar_F0x a.k.a. Hoof Lover
        `
      )
    }

    if (this.options && this.version) this.get();
  },
};
