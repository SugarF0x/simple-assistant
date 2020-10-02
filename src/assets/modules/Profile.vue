<template>
  <div>
    <div v-if="isOwn">
      <h2>This is your own profile</h2>
    </div>
    <div v-else>
      <div class="center">
        <button class="btn btn-primary"
                @click="gift"
        >
          Gift items
        </button>
        <span>of {{ level-5 }}-{{ level+5 }} level margin</span>
      </div>
      <div>
        <div class="center">
          <button class="btn btn-primary"
                  @click="comment"
          >
            Paste comment
          </button>
          <span>from a template:</span>
        </div>
        <label for="comment"></label>
        <textarea name="comment"
                  id="comment"
                  cols="46"
                  rows="4"
                  v-model="options.comment"
                  @keydown.enter="comment"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import module from '../mixins/module';

export default {
  name:   "Profile",
  mixins: [module],

  data() {
    return {
      isOwn: true,
      name:  '',
      level: '',
      id: '',

      version: 1,
      options: {
        comment: ''
      }
    };
  },

  created() {
    let namespace = document.querySelectorAll('.kt-user-card__name') as NodeListOf<HTMLElement>;
    if (namespace.length) {
      this.isOwn = namespace[1].innerText.replace(/\s/g, '').indexOf(namespace[0].innerText.replace(/\s/g, '')) !== -1;
      this.name  = namespace[1].innerText.slice(0, namespace[1].innerText.indexOf('\n') - 1);
      this.level = parseInt(namespace[1].innerText
                                        .slice(namespace[1].innerText.indexOf('\n') + 6)
                                        .replace(',', ''));

      this.id = window.location.pathname.split('/')[window.location.pathname.split('/').length-1]
    }
  },

  methods: {
    gift() {
      window.location.href=`https://web.simple-mmo.com/inventory/items?minlevel=${this.level-5}&maxlevel=${this.level+5}&sendid=${this.id}`
    },
    comment() {
      let area = document.getElementById('exampleTextarea') as HTMLTextAreaElement;
      area.value = this.options.comment;

      let button = area.nextElementSibling.children[0] as HTMLButtonElement;
      setTimeout(() => {
        button.click();
      }, 250)
    }
  },

  mounted() {

  },
};
</script>

<style lang="less" scoped>

</style>
