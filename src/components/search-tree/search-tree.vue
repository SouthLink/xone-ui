<!--   
  搜索树组件
  基于剪枝算法
  by tang.biao 
-->
<template>
  <ul class="tree-menu" >
    <tree-menu 
      v-for="item in nodeList"
      :key="item.sign"
      :data="item.sub"
      :search-text="searchText"
      @setTreeId="setSelectId"/> 
  </ul>
</template>

<script>
import TreeMenu from './tree-menu.vue';
export default {
  components: {
    TreeMenu
  },
  data() {
    return {
      nodeList: {},
      scope: {},
      ischeckId:'',
      cacheData: []
    }
  },
  watch: {
    searchText() {
      this.search()
    },
    data() {
      this.nodeList = JSON.parse(JSON.stringify(this.data))
    }
  },
  mounted() {
    
  },
  computed:{
    
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
    }
  },
  methods: {
    //搜索
    search () {
      let self = this;
      let value = this.searchText
      this.nodeList = JSON.parse(JSON.stringify(this.data))
      if (this.searchText == '') {
        return
      }
      if (this.nodeList && this.nodeList.length > 0) {
        this.nodeList.forEach((item) => {
          self.searchDeep(item, this.searchText)
        })

        let length = this.nodeList.length
        for (let i = length - 1; i >= 0; i--) {
          let b = this.nodeList[i];
          if (!this.isHasChildren(b) &&  (b.sys_subjects_name.indexOf(value) == -1 || b.fin_subjects_name.indexOf(value) == -1)) {
            this.nodeList.splice(i, 1)
          }
        }
      }
    },
    // 搜索子节点
    searchDeep (node, value) {
      let depth = this.getTreeDepth(node)
      let self = this
      for (let i = 0; i < depth - 1; i++){
        let spliceCounter = 0

        this.traverseTree(node, n => {
          if (self.isHasChildren(n)) {
            let children = n.sub
            let length = children.length

            // 找到不匹配搜索内容的叶子节点并删除。为了避免要删除的元素在数组中的索引改变，从后向前循环,
            // 找不到匹配的元素就删除。
            for (let j = length - 1; j >= 0; j--) {
              let e = children[j]
              if (!self.isHasChildren(e) && (e.sys_subjects_name.indexOf(value) == -1 || e.fin_subjects_name.indexOf(value) == -1)){
                children.splice(j, 1);
                spliceCounter ++
              }
            }
          }
        })

        if (spliceCounter == 0) {
          break;
        }
      }
    },
    // 获取根节点的深度
    getTreeDepth (node) {
      if (node == undefined || node == null) {
        return 0
      }
      let r = 0
      let currentLevelNodes = [node]
      // 判断当前层是否有节点
      while (currentLevelNodes.length > 0) {
        r++;

        let nextLevelNodes = [];
        for(let i = 0; i < currentLevelNodes.length; i++){
          let e = currentLevelNodes[i]
          if (this.isHasChildren(e)) {
            nextLevelNodes = nextLevelNodes.concat(e.sub)
          }
        }

        // 改变集合指向
        currentLevelNodes = nextLevelNodes
      }
      return r
    },
    // 判断树中是否有子节点
    isHasChildren (node) {
      let flag = false;
      if (node.sub && node.sub.length > 0) {
        flag = true
      }
      return flag
    },
    // 非递归遍历
    traverseTree (node, callback) {
      if (!node) {
        return
      }
      let stack = []
      stack.push(node)
      let tmpNode;
      while (stack.length > 0) {
        tmpNode = stack.pop();
        callback(tmpNode);
        if (tmpNode.sub && tmpNode.sub.length > 0) {
          for (let i = tmpNode.sub.length - 1; i >= 0; i--) {
            stack.push(tmpNode.sub[i])
          }
        }
      }
    },
    setSelectId(item){
      this.$emit('setTreeId',item);
    },
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