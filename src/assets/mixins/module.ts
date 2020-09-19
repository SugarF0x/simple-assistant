export default {
  watch: {
    options: {
      handler() {
        this.set();
      },
      deep: true
    }
  },

  methods: {
    get() {
      let storage = JSON.parse(localStorage.getItem(`SA_${ this.$options.name }`));
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
      localStorage.setItem(`SA_${ this.$options.name }`, JSON.stringify(data));
    },
  },

  created() {
    this.get();
  },
};
