<template>
  <div class="xone-table">
    <div class="table-query-content">
      <div class="table-content-wrap">
        <div class="table-wrap">
          <!-- table header -->
          <div
            class="xone-table-header"
            ref="thead">
            <table
              cellspacing="0"
              cellpadding="0"
              border="0">
              <colgroup>
                <col
                  :style="{width: col.width + 'px'}"
                  v-for="col in tableHeadConfig">    
                <col
                  class="xone-hidden"
                  :style="{width: col.width + 'px'}"
                  v-for="col in fixedRightConfig"></col>
                </col>
              </colgroup>
              <thead>
                <tr>
                  <th
                    v-for="col in tableHeadConfig">
                    <div
                      class="table-cell"
                      v-if=" 'type' in col && col.type === 'selection' ">
                      <Checkbox
                        :value="isSelectAll"
                        @on-change="selectAll" />
                    </div>
                    <div
                      class="table-cell"
                      v-else>
                      <span>{{ col.title }}</span>
                    </div>
                  </th>
                  <th
                    v-for="col in fixedRightConfig">
                    <div
                      class="table-cell xone-hidden">
                      <span>{{ col.title }}</span>
                    </div>
                  </th>
                </tr>
              </thead>
            </table>
          </div>

          <!-- table body -->
          <div
            class="xone-table-body"
            ref="tbody"
            @scroll="tableBodyScroll">
            <table
              cellspacing="0"
              cellpadding="0"
              border="0"
              class="table-body">
              <colgroup>
                <col
                  :style="{width: col.width + 'px'}"
                  v-for="col in tableHeadConfig"></col>
                <col
                  :style="{width: col.width + 'px'}"
                  v-for="col in fixedRightConfig"></col>
              </colgroup>
              <tbody>
                <template v-for="(row, rowIndex) in cloneData">

                  <tr
                    class="table-row table-normal-row"
                    v-if="cloneData.length > 0">
                    <td
                      v-for="col in tableHeadConfig">
                      <!-- table cell -->
                      <table-cell
                        :table-data="cloneData"
                        :col="col"
                        :row="row"
                        :row-index="rowIndex"
                        :checked="row.isChecked"
                        :expand="row.isExpand" />
                    </td>
                    <th
                      v-for="col in fixedRightConfig">
                      <div
                        class="table-cell xone-hidden">
                        <span>{{ col.title }}</span>
                      </div>
                    </th>
                  </tr>
                  <!-- expand  -->
                  <!-- <transition name="slide"> -->
                  <tr
                    class="table-row table-expand-row"
                    ref="expandRow"
                    v-if="row.isExpand">
                    <td
                      :colspan="getColspan(rowIndex)"
                      v-for="col in tableHeadConfig"
                      v-if=" 'render' in col">
                      <div class="table-cell" >
                        <ExpandRender
                          :row="row"
                          :column="col"
                          :index="rowIndex"
                          :render="col.render" 
                          ></ExpandRender>
                      </div>
                    </td>
                  </tr>
                  <!-- </transition>   -->

                </template>

                <template v-if="cloneData.length == 0">
                  <tr
                    class="table-row">
                    <td
                      :colspan="getColspan()">
                      <div class="table-cell table-empty-cell" >
                        暂无数据
                      </div>
                    </td>
                  </tr>
                </template>

              </tbody>
            </table>
          </div>
          
          <!-- fixed right -->
          <TableFixed
            :table-data="cloneData"
            :fixed-left-config="fixedLeftConfig"
            :fixed-right-config="fixedRightConfig"
            :fixed-right-width="fixedRightWidth"
            :expand-height="expandHeight" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import TableCell from './table-cell.vue'
  import TableFixed from './table-fixed.vue'
  import ExpandRender from './expand-render.js' 
  import { deepClone } from '../../../../utils/util.js'

  export default {
    components: {
      TableCell,
      TableFixed,
      ExpandRender,
    },
    provide () {
      return {
        tableRoot: this
      }
    },
    data() {
      return {
        color: '#ffbf00',
        fixedRightWidth: 0,
        cloneData: this.getCloneData(),
        expandHeight: 0,
      } 
    },
    computed: {
      hasCheckbox() {
        let hasBoxList = this.tableConfig.filter(e => e.type && e.type === 'selection')

        return hasBoxList.length > 0 ?  true : false
      },
      fixedLeftConfig() {
        return this.tableConfig.filter(e => e.fixed && e.fixed === 'left')
      },
      fixedRightConfig() {
        return this.tableConfig.filter(e => e.fixed && e.fixed === 'right')
      },
      tableHeadConfig() {
        return this.tableConfig.filter(e => !e.fixed)
      },
      isSelectAll: {
        get() {
          let isSelectAll = true;
          if (!this.cloneData.length) isSelectAll = false;
          for (let i = 0, len = this.cloneData.length ; i < len; i++) {
            if (!this.cloneData[i].isChecked) {
              isSelectAll = false
              break;
            }
          }
          return isSelectAll;
        },
        set() {
          
        }
      }
    },
    props: {
      tableConfig: {
        type: Array,
        default: function() {
          return []
        }
      },
      tableData: {
        type: Array,
        default: function() {
          return []
        }
      }
    },
    watch: {
      tableConfig(val) {
        console.log(val)
      },
      tableData: {
        handler () {
          setTimeout(() => {
            this.cloneData = deepClone(this.tableData);
          }, 0);
        },
        deep: true
      },
      tableConfig: {
        handler () {
          setTimeout(() => {
            this.tableConfig = deepClone(this.tableConfig);
          }, 0);
        },
        deep: true
      }
    },
    mounted() {
      // 暂时不用获取最后一个th的宽度来决定fixed宽度
      this.$nextTick(() => {
        // let allThead = this.$refs.thead.getElementsByTagName('th')
        // this.fixedRightWidth = allThead[allThead.length - 1].clientWidth || 120
      })
    },
    methods: {
      getCloneData() {
        let cloneObj = deepClone(this.tableData)
        return cloneObj
      },
      tableBodyScroll(e) {
        let self = this
        window.requestAnimationFrame(() => {
          self.$refs.thead.scrollLeft = e.target.scrollLeft
        })
      },
      // 这里因为vue数组更新不响应问题，暂时用vue.$set解决，后面考虑多一级子组件用对象赋值或者深度监听
      selectAll(val) {
        for (let i = 0, len = this.cloneData.length ; i < len; i++) {
          const obj = this.cloneData[i]
          obj.isChecked = val
          this.$set(this.cloneData, i , obj)
        }

        this.$emit('on-selection-change', val ? this.cloneData : [])
      },
      toggleSelect(inx) {
        const obj = this.cloneData[inx]
        obj.isChecked = !obj.isChecked
        this.$set(this.cloneData, inx , obj)

        const selection = this.getSelected()
        this.$emit('on-selection-change', selection)
      },
      getSelected() {
        let selection = []
        for (let i = 0, len = this.cloneData.length ; i < len; i++) {
          if (this.cloneData[i].isChecked) {
            selection.push(this.cloneData[i])
          }
        }

        return selection
      },
      expanding(inx) {
        const obj = this.cloneData[inx]
        obj.isExpand = !obj.isExpand
        this.$set(this.cloneData, inx , obj)

        this.getExpandHeight()
      },
      getColspan(inx) {
        let obj = this.tableConfig.filter(e => {
          return !e.fixed
        })
        return obj.length
      },
      getExpandHeight() {
        this.$nextTick(() => {
          this.expandHeight = this.$refs.expandRow && 
                              this.$refs.expandRow[0] && 
                              this.$refs.expandRow[0].getElementsByTagName('td')[0] &&
                              this.$refs.expandRow[0].getElementsByTagName('td')[0].clientHeight
        })
      }
    }
  }

</script>
<style lang="less">

.table-query-bar {
  padding: 10px 15px;
  margin-bottom: 25px;
}

.table-query-content {}

.xone-hidden{
  visibility: hidden;
}

.xone-table{
  .table-content-wrap {
    position: relative;
    border: 1px solid #dcdee2;
    border-bottom: 0;
    border-right: 0;
    &>.table-wrap {
      width: inherit;
      height: 100%;
      max-width: 100%;
      overflow: hidden;
      color: #515a6e;
      font-size: 12px;
      background-color: #fff;
      box-sizing: border-box;
      position: relative;
      &:after {
        width: 1px;
        height: 100%;
        top: 0;
        right: 0;
        z-index: 3;
        content: '';
        position: absolute;
        background-color: #dcdee2;
      }
      &>.xone-table-header {
        overflow: hidden;
      }
      &>.xone-table-body {
        overflow-x: auto;
      }
      &>.xone-table-body tr:nth-child(2n) {
        background-color: #f7f9f9;
        transition: background-color .2s ease-in-out;
      }
      &>.xone-table-body tr:hover {
        background-color: #ebf7ff;
      }
      table {
        table-layout: fixed;
        width: 100%;
        thead{
          tr{
            background: #f2f4f4;
            .table-cell {
              color: #000;
            }
          }
        }
        th {
          min-width: 0;
          height: 30px;
          white-space: nowrap;
          overflow: hidden;
          // background-color: #f8f8f9;
          box-sizing: border-box;
          text-align: left;
          text-overflow: ellipsis;
          vertical-align: middle;
          border-bottom: 1px solid #dadce0;
        }
        td {
          min-width: 0;
          height: 40px;
          box-sizing: border-box;
          text-align: left;
          text-overflow: ellipsis;
          vertical-align: middle;
          border-bottom: 1px solid #dadce0;
        }
        .table-cell {
          color: #333;
          font-size: 12px;
          font-weight: 400;
          display: inline-block;
          word-wrap: normal;
          vertical-align: middle;
          padding-left: 18px;
          padding-right: 18px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: normal;
          word-break: break-all;
          box-sizing: border-box;
        }
        .table-expand-row{
          background: #fff !important;
          .table-cell{
            width: 80%;
            padding:20px 80px 15px 20px;
          }
        }
        .table-empty-cell{
          text-align: center;
          width: 100%;
        }
        // animation
        .slide-enter-active {
          transition: all 3s ease;
          height: 40px;
          overflow: hidden;
        }
        .slide-leave-active {
          transition: all 3s ease;
          height: 0px;
          overflow: hidden;
        }
        .slide-enter, .slide-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */ {
          height: 0;
          opacity: 0;
        }
      }
      .xone-table-fixed__right {
        position: absolute;
        top: 0;
        left: auto;
        right: 0;
        width: 120px;
        box-shadow: -2px 0 6px -2px rgba(0,0,0,.2);
        z-index: 10;
        background-color: #fff;
        border-right: 1px solid #dcdee2;
      }
    }
  }
}


</style>
