export default  function(target) {
  for(let i = 1, j = arguments.length; i < j; i++) {
      let source = arguments[i] || {};
      for( let [k, v] of Object.entries(source) ) {
          if ( v !== undefined ) {
              target[k] = v;
          }
      }
  }

  return target;
}