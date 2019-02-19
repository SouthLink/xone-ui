<template>
  <div
    class="xone-table-fixed__right"
    ref="fixedRight"
    :style="{width: getFixedRightWidth + 'px'}" >   
    <div class="xone-table-header">
      <table
        cellspacing="0"
        cellpadding="0"
        border="0">
        <colgroup>
          <col
            :style="{width: col.width + 'px' || 'auto'}"
            :key="col.key"
            v-for="col in fixedRightConfig"></col>
        </colgroup>
        <thead ref="thead">
          <tr>
            <th
              :key="col.key"
              v-for="col in fixedRightConfig">
              <div class="table-cell">
                <span>{{ col.title }}</span>
              </div>
            </th>
          </tr>
        </thead>
      </table>
    </div>

    <div class="xone-table-body">
      <table>
        <colgroup>
          <col
            :style="{width: col.width || 'auto', minWidth: col.minWidth}"
            :key="col.key"
            v-for="col in fixedRightConfig"></col>
        </colgroup>
        <tbody>
          <template v-for="(row, rowIndex) in tableData">
            <tr
              class="table-row"
              :key="rowIndex">
              <td
                :key="col.key"
                v-for="col in fixedRightConfig">
                <!-- table cell -->
                <table-cell
                  :table-data="tableData"
                  :col="col"
                  :row="row"
                  :row-index="rowIndex"
                  :checked="row.isChecked"
                  :expand="row.isExpand" />
              </td>
            </tr>
            
            <!-- expand  -->
            <!-- <transition name="slide"> -->
            <tr
              class="table-row table-expand-row"
              :key="row.isExpand + '' + rowIndex"
              v-if="row.isExpand">
              <td :colspan="getColspan(rowIndex)">
                <div
                  class="table-cell"
                  :style="{height: expandHeight + 'px'}" />
              </td>
            </tr>
            <!-- </transition>   -->
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import Render from './render.js'
  import SlotScope from './slot.js'
  import TableCell from './table-cell.vue'

  export default {
    components: {
      Render,
      SlotScope,
      TableCell,
    },
    data() {
      return {

      }
    },
    computed: {
      getFixedRightWidth() {
        let fixedRightWidth = 0
        this.fixedRightConfig.map(e => {
          fixedRightWidth += e.width
        })
        return fixedRightWidth
      },
    },
    watch: {

    },
    props: {
      fixedLeftConfig: {
        type: Array,
        default: function() {
          return []
        }
      },
      fixedRightConfig: {
        type: Array,
        default: function() {
          return []
        }
      },
      fixedRightWidth: {
        type: Number,
        default: function() {
          return 120
        }
      },
      expandHeight: {
        type: Number || void(0),
        default: function() {
          return 0
        }
      },
      tableData: {
        type: Array,
        default: function() {
          return []
        }
      },
    },
    methods: {
      getColspan(inx) {
        return this.$refs.thead.getElementsByTagName('th').length
      },
    }
  }
</script>