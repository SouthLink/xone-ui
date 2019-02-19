import CommonSelect from './src/select.vue'

CommonSelect.install = function(Vue) {
    Vue.component(CommonSelect.name, CommonSelect);
}

export default CommonSelect;