// param {String} componentName : 组件的 name 值 , 向上或向下递归遍历来寻找对应的组件
// param {String} eventName : 自定义事件名称
// param {All type} params : 传递的参数

// 自行实现的 Vue1.x 中的 dispatch 和 broadcast 方法 ， 解决父子组件（跨级）通信问题

function broadcast(componentName, eventName, params) {
	this.$children.forEach(child => {
		const name = child.$options.name;

		if (name === componentName) {
			child.$emit.apply(child, [eventName].concat(params));
		} else {
			broadcast.apply(child, [componentName, eventName].concat([params]))
		}

	});
}

export default {
	methods: {
		dispatch(componentName, eventName, params) {
			let parent = this.$parent || this.$root;
			let name = parent.$options.name;

			while (parent && (!name || name != componentName)) {
				parent = parent.$parent;

				if (parent) {
					name = parent.$options.name;
				}
			}	

			if(parent){
				parent.$emit.apply(parent, [eventName].concat(params));
			}		
		},
		broadcast(componentName, eventName, params) {
			broadcast.call(this, componentName, eventName, params);
		}
	}
}