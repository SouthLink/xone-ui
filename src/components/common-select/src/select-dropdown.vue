<template>
  <div
    class="common-select-dropdown"
    :style="'width: ' + width + 'px;'"
    v-show="visible">
    <div class="dropdown-inner">
      <ul class="header-wrapper">
        <li
          v-for="index in indexes"
          :key="index"
          class="index-item"
          @click="curIndex = index"
          :class="{'active': curIndex === index}">
          {{ index }}</li>
      </ul>
      <ul class="content-wrapper">
        <li
          v-for="item in finalOptions"
          :key="item.value"
          :title="item.label"
          class="content-item"
          :class="{'active': curSelectedValue.includes(item.value)}"
          @click="selectItem(item)">{{ item.label }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import VUECOMPONENT from '@/components/utils/makePy.js';

export default {
  data() {
    return {
     curIndex: '全部',
    }
  },
  props: {
    width: {
      type: String|Number,
      default: '',
    },
    visible: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    curLabel: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: function() {
        return []
      }
    },
    selectedIds: {
      type: Array,
      default: function(){
        return []
      }
    },
    selected: {
      type: Array,
      default: function(){
        return []
      }
    }
  },
  watch: {
    curSelected(val) {
      if(val.length === 0 && this.multiple) {
        this.curSelected = JSON.parse(JSON.stringify(this.options));
      }
    },
    options: {
      handler() {
        if(this.multiple && this.options.length !== 0) {
          this.curSelected = JSON.parse(JSON.stringify(this.options));
        }
      },
      immediate: true
    }
  },
  computed: {
    curSelected: {
      get() {
        return this.selected;
      },
      set(val) {
        this.$emit('update:selected', val);
      }
    },
    curSelectedValue() {
      let result = this.curSelected.map(e => e.value);
      if(result.includes('all') && this.curSelected.length === this.options.length) {
        result = ['all'];
      }
      this.$emit('update:selectedIds', result);
      return result;
    },
    indexes() {
      let indexes = [];
      let result;
      this.options.forEach((ele) => {
        let index = VUECOMPONENT.makePy(ele.label[0]);
        if (ele.value != 'all') {
          indexes.push(...index);
        }
        ele.index = index;
      })
      result = [...new Set(indexes)];
      result = result.filter(ele => !(ele >= 0 && ele <= 9));
      result.sort();
      result.unshift('全部');
      return result;
    },
    finalOptions() {
      let curIndex = this.curIndex;
      if(curIndex === '全部') {
        return this.options;
      }else{
        return this.options.filter(e => e.index.includes(curIndex));
      }
    }
  },
  methods: {
    selectItem(item) {
      if(this.multiple) {
        if(item.value === 'all') {
          this.curSelected = JSON.parse(JSON.stringify(this.options));
          return;
        }else{
          if(this.curSelectedValue.includes('all')) {
            this.curSelected = [item];
          }
        }
        let check = this.curSelected.some((e, i) => {
          if(e.value === item.value) {
            this.curSelected.splice(i, 1);
            return true;
          }
          return false;
        })
        if(!check) {
          this.curSelected.push(item);
        }
        //全选
        if(this.curSelected.length === this.options.length - 1) {
           this.curSelected.unshift(this.options[0]);
        }
      }else{
        this.$emit('update:visible', false);
        if(this.curSelected[0] && this.curSelected[0].value === item.value) {
          this.curSelected = [];
          return;
        }
        this.curSelected = [item];
      }
    }
  }
}
</script>

<style lang="less" scoped>
.common-select-dropdown{
  position: absolute;
  background: #fff;
  z-index: 10;
  width: 470px;
  border: 1px solid #108EE9;
  border-radius: 0 4px 4px 4px;
  top: 29px;
  font-size: 12px;
  li{
    list-style: none;
  }
}
.dropdown-inner{
  padding: 8px 8px 0 8px;
}
.header-wrapper{
  display: flex;
  padding-bottom: 8px;
  border-bottom: 1px solid #979797;
  .index-item{
    cursor: pointer;
    border: 1px solid #fff;
    margin-right: 1px;
    padding: 0 3px;
    &.active{
      border-color: #2196F3;
      color: #2196F3;
    }
  }
}
.content-wrapper{
  display: flex;
  flex-wrap: wrap;
  padding-top: 8px;
  max-height: 300px;
  overflow-y: auto;
  align-content: flex-start;
  .content-item{
    cursor: pointer;
    width: 20%;
    padding: 0 10px 8px 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    &.active{
      color: #2196F3;
    }
  }
}
</style>
