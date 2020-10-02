<template>
  <div class="kt-portlet" v-if="module">
    <div class="row">
      <div class="col sad">
        <Header :module="module"/>
        <div :style="{height: options.collapse ? 0 : 'inherit'}" class="router-wrapper">
          <router-view/>
        </div>
      </div>
    </div>
    <div @click="options.collapse = !options.collapse"
         class="collapseButton"
    >
      <div style="display: inline-block" :style="{transform: options.collapse ? 'rotate(270deg)' : 'rotate(90deg)'}"><</div>
    </div>
  </div>
</template>

<script lang="ts">
import Header from './components/Header.vue';
import module from './mixins/module';

export default {
  name: "App",
  mixins: [module],

  components: {
    Header
  },

  data() {
    return {
      version: 1,
      options: {
        collapse: false
      }
    }
  },

  computed: {
    module() {
      if (this.$route.matched.length) {
        return this.$route.matched[0].components.default.name
      } else {
        return undefined
      }
    }
  },

  mounted() {

  }
}
</script>

<style lang="less" scoped>
  .col {
    padding: 1rem 1rem 0 1rem;
  }
  .router-wrapper {
    transition: height .5s;
    overflow: hidden;
  }
  .collapseButton {
    cursor: pointer;
    text-align: center;
    font-size: 2em;
    font-weight: bold;
  }
  .collapseButton:hover {
    background-color: gainsboro;
  }
</style>

<style lang="less">
  .sad {
    > * > * > * {
      margin: .3rem 0;
    }
    label {
      padding: 0;
      margin: 0 .5rem 0 0;
    }
    .display {
      font-size: 1.2em;
      font-weight: bold;
    }
    .checkbox, label {
      display: flex;
      align-items: center;
    }
    .center {
      > * {
        margin: .2rem;
      }
      display: flex;
      align-items: center;
    }
    .radio {
      label {
        display: inline;
      }
    }
    div {
      button + span {
        font-size: 1.5em;
      }
    }
    textarea {
      margin: .2rem;
      padding: .2rem;
    }
  }
</style>
