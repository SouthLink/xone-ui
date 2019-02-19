export default {
	name: 'expandRender',
	functional: true,
	props: {
		row: Object,
		column: Object,
		index: Number,
		render: Function,
	},
	render: (h, ctx) => {
		const params = {
			row: ctx.props.row,
			column: ctx.props.column,
			index: ctx.props.index,
			render: ctx.props.render,
		}

		if (ctx.props.column) params.column = ctx.props.column;
		return ctx.props.render(h, params)
	}
}