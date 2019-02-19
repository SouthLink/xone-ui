<template>
  <ul class="tree-menu" >
    <li 
      v-for="item in data" 
      :key="item.sign">
      <i 
        @click="toggle(item)" 
        class="icon" 
        :class="{'has-children': item.sub && item.sub.length > 0,'open': scope[item.sign]}"/>
      <span 
        @click="setSelectId(item)" 
        class="span" 
        :class=" selectId === item.sign ? 'select' : '' "
        v-html="treeText(item)">        
        {{ item.fin_subjects_name }}
      </span>
      <div style="margin-left:16px">
        <tree-menu 
          v-if="scope[item.sign]" 
          :data="item.sub" 
          :search-text="searchText"
          @setTreeId="setSelectId"/> 
      </div>
    </li> 
  </ul>
</template>

<script>
import { mapState,mapMutations } from 'vuex';
export default {
  name: 'TreeMenu',
  data() {
    return {
      scope: {},
      ischeckId:'',
      searchValue: ''
    }
  },
  watch: {
    searchText() {

    }
  },
  mounted() {
    
  },
  computed:{
    ...mapState('moduleEstimate/moduleUpload',['selectId']),
  },
  props: {
    data: {
      type: Array,
      default: function() {
        return []
      }
    },
    searchText: {
      type: String,
      default: function() {
        return ''
      }
    },
    canModifyList: {
      type: Array,
      default: function() {

      }
    },
  },
  methods: {
    toggle(item) {
      if(item.sub && item.sub.length > 0) {
        this.$set(this.scope, item.sign, !this.scope[item.sign]);
      }
      // console.log(item)
    },
    setSelectId(item){
      if (item.is_last_layer == 1) {
        this.chgselectId(item.sign)
        this.$emit('setTreeId',item);
      }
    },
    ...mapMutations('moduleEstimate/moduleUpload',[
      'chgselectId'
    ]),
    treeText (item) {
      let searchText = this.searchText
      if (searchText == undefined || searchText == "" || searchText == null) {
        return item.fin_subjects_name;
      }
      if (item.fin_subjects_name.indexOf(searchText) <= -1) {
        return item.fin_subjects_name;
      }
      return this.replaceAll(item.fin_subjects_name, searchText, 
        `<span style='color:red;'>${searchText}</span>`);
    },
    replaceAll(str, substr, replacement) {
      if(!str) {
        return ''
      }
      return str.split(substr).join(replacement)
    }
  }
}
</script>

<style lang="less" scoped>
.icon{
  display: inline-block;
  width: 14px;
  height: 14px;
  position: absolute;
  top: 3px;
  background-size: 100% 100%;
  &.has-children {
    background-image: url('./icon-arrow-show.png')
  }
}
.span{
  display: inline-block;
  width: 90%;
  padding-left: 19px;
  margin: 1px 0;
}
.select{
  color: #2196F3;
}
.tree-menu{
  li{
    position: relative;
    color: #000000;
    margin: 1px;
    cursor: pointer;
    .open.icon{
        width: 14px;
        height: 14px;
        &.has-children {
          background-image: url('./icon-arrow-hide.png') !important;
        }
      }
  }
}

</style>