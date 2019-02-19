<template>
  <div class="table-cell">
    <!-- checkbox mode -->
    <template v-if=" 'type' in col && col.type === 'selection' ">
      <Checkbox
        :value="checked"
        @click.native.stop="handleClick" 
        @on-change="toggleSelect" />
    </template>

    <!-- checkbox mode -->
    <template v-else-if=" 'type' in col && col.type === 'expand' ">
      <div 
        class="xone-expand" 
        @click.stop="handleExpanding">
          <i class="expand-icon" :class="{'isExpand': expand}"></i>
      </div>
    </template>

    <!-- render mode -->
    <template v-else-if=" 'render' in col">
      <Render
        :row="row"
        :column="col"
        :index="rowIndex"
        :render="col.render" />
    </template>

    <!-- slot mode -->
    <template v-else-if="'slot' in col">
      <slot-scope
        :row="row"
        :column="col"
        :index="rowIndex" />
    </template>

    <!-- normal mode -->
    <template v-else>
      <span>{{ row[col.key] }}</span>
    </template>
  </div>
</template>

<script>
  import Render from './render.js'
  import SlotScope from './slot.js'

  export default {
    components: {
      Render,
      SlotScope,
    },
    data() {
      return {

      }
    },
    watch: {

    },
    computed: {
      
    },
    props: {
      tableData: {
        type: Array,
        default: function() {
          return []
        }
      },
      col: {
        type: Object,
        default: function() {
          return {}
        }
      },
      row: {
        type: Object,
        default: function() {
          return {}
        }
      },
      rowIndex: {
        type: Number | String,
        default: function() {
          return 0
        }
      },
      checked: {
        type: Boolean,
        default: function() {
          return false
        }
      },
      expand: {
        type: Boolean,
        default: function() {
          return false
        }
      }
    },
    methods: {
      handleClick() {

      },
      toggleSelect() {
        this.$parent.toggleSelect(this.rowIndex)
      },
      handleExpanding() {
        this.$parent.expanding(this.rowIndex)
      }
    },
    mounted() {

    }
  }
</script>

<style lang="less">
  .xone-expand{
    width: 50px;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    .expand-icon{
      width: 12px;
      height: 7px;
      display: inline-block;
      transition: all .2s ease-in 0s;
      background-image: url('./img/arrow.png');
      background-size: 100% 100%;
      transform: rotate(-90deg);
    }
    .isExpand{
      transform: rotate(0deg);
    }
  }
</style>