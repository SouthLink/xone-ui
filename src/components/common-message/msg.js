// 注册实例并挂载到body

import XoneMsg from './src/msg.vue'
import Vue from 'vue'

XoneMsg.newInstance = properties => {
	const props = properties || {}

	const Instance = new Vue({
		data: props,
		render (h) {
			return h(XoneMsg, {
				props: props
			})
		}
	})

	const component = Instance.$mount();
	document.body.appendChild(component.$el);

	const msg = Instance.$children[0];

	return {
		add (noticeProps) {
			msg.add(noticeProps)
		},
		remove (name) {
			msg.remove(name)
		},
		destroy (element) {
      // notification.closeAll();
      // setTimeout(function() {
      //   document.body.removeChild(document.getElementsByClassName(element)[0]);
      //  }, 500);
    }
	}
}

export default XoneMsg