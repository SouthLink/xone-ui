/*
 * @Author: Tang Biao
 * @Date: 2019-01-26
 * @Last Modified by:
 * @Last Modified time: 2019-01-26
 * Ps: 全局Message组件
 *
 * param {{ String }} content : 消息内容
 * param {{ Number }} duration : 消息框维持时间
 * 
 * apply : this.$Msg.info({
 *					content: '11233',
 *					duration: 5
 *				})
 * 
 * 			  this.$Msg.error ...
 * 				this.$Msg.warning ...
 * 				this.$Msg.primary ...
 */

import msg from './msg.js'

let msgInstance;

function getMsgInstance() {
	msgInstance = msgInstance || msg.newInstance()
	return msgInstance
}

function notice({duration = 1.5, content = ''}, type = "success") {
	let instance = getMsgInstance()

	instance.add({
		content: content,
		duration: duration,
		type: type,
	})
}

export default {
	info (options) {
		return notice(options)
	},
	error (options) {
		return notice(options, 'error')
	},
	warning (options) {
		return notice(options, 'warning')
	},
	primary (options) {
		return notice(options, 'primary')
	}
}