/**
 * 带索引横版下拉多选框
 * by:dashan
 */
<template>
  <div
    class="common-select"
    :class="{'open': isOpen}"
    v-clickoutside="handleClose">
    <div
      class="select-input"
      @click="isOpen = !isOpen">
      <input
        type="text"
        class="input-inner"
        :placeholder="currentPlaceholder"
        readonly
        v-if="multiple">
      <input
        type="text"
        class="input-inner"
        :placeholder="currentPlaceholder"
        readonly
        v-model="curLabel"
        v-else>
      <div class="input-icon">
        <i class="arrow-icon"/>
      </div>
    </div>
    <select-dropdown
      :width="width"
      :visible.sync="isOpen"
      :options="finalOptions"
      :selected.sync="curSelected"
      :selected-ids.sync="curSelectedIds"
      :multiple="multiple"/>
  </div>
</template>

<script>
  
import SelectDropdown from './select-dropdown';
import Clickoutside from '@/components/utils/clickoutside.js';

export default {
  name: 'CommonSelect',
  data() {
    return {
      isOpen: false,
    }
  },
  directives: { Clickoutside },
  props: {
    width: {
      type: String|Number,
      default: '470',
    },
    currentPlaceholder: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: function() {
        return []
      }
    },
    selected: {
      type: Array,
      default: function(){
        return []
      }
    },
    selectedIds: {
      type: Array,
      default: function(){
        return []
      }
    }
  },
  computed: {
    finalOptions() {
      if(this.multiple) {
        return this.options;
      }else{
        return this.options.filter(e => e.value !== 'all');
      }
    },
    curLabel() {
      return this.multiple ? '' : this.selected[0] ? this.selected[0].label : '';
    },
    curSelected: {
      get() {
        return this.selected;
      },
      set(val) {
        this.$emit('update:selected', val)
      }
    },
    curSelectedIds: {
      get() {
        return this.selectedIds;
      },
      set(val) {
        this.$emit('update:selectedIds', val)
      }
    }
  },
  components: {
    SelectDropdown
  },
  methods: {
    handleClose() {
      this.isOpen = false;
    }
  }
}
</script>

<style lang="less" scoped>
.common-select{
  position: relative;
  width: 150px;
  background: #fff;
  user-select: none;
  .select-input{
    width: 100%;
    position: relative;
    z-index: 2;
    .input-icon{
      cursor: pointer;
      position: absolute;
      right: 8px;
      top: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      .arrow-icon{
        display: block;
        transition: all .2s ease-in 0s;
        width: 12px;
        height: 7px;
        background-image: url('./img/arrow.png');
        background-size: 100% 100%;
      }
    }
    .input-inner{
      width: 100%;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      border: 1px solid #D7D7D7;
      border-radius: 4px;
      padding: 0 20px 0 8px;
      font-size: 12px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      cursor: pointer;
      &::placeholder{
        color: #75757E;
      }
    }
  }
  &.open{
    .input-inner{
      border: 1px solid #108EE9;
      border-bottom: 1px solid transparent;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
    .arrow-icon{
      transform: rotate(180deg);
    }
  }
}
</style>
