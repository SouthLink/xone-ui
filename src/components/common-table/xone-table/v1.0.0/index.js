/*
 * @Author: Tang Biao
 * @Date: 2019-01-27
 * @Last Modified by:
 * @Last Modified time: 2019-02-15
 * Ps: xone table 组件
 * param {Object} table-data : table 数据
 * param {Object} table-config : table 表头配置
 
	 table-config配置：
	 	type 
			type : 'selection' => 开启selection模式，table增加多选，全选功能
			type : 'expand' => 开启扩展行功能，可以在此模式下使用render函数渲染
		render
			添加render函数后会开启render渲染模式
		slot 
			slot: '~' => 在当前列开启slot模式，通过slot-scope获取当前列数据
		fixed
			fixed: 'right' 开启右侧固定功能，但要求所有列设置width属性，以免没有滚动效果

		具体可以参照 table-render(example).vue / table-slot(example).vue 示例

 * return {event} on-selection-change : 开启selection模式下选中事件，返回选中的行数据
 */

import XoneTable from './src/xone-table.vue'

XoneTable.install = function (Vue) {
  Vue.component(XoneTable.name, XoneTable)
}

export default XoneTable