<template>
	<div class="xone-msg">
		<transition-group name="msg_slide-fade" @enter="handleEnter" tag="p">
			<div 
				class="x-msg-main list-item" 
				:key="item.name" 
				:data-id="item.name" 
				:class="`x-msg-${item.type}`"
				v-for="(item, inx) in notices">
				<div class="x-msg-img">
					<img src="../img/success.png" alt="" v-if="item.type == 'success'">
					<img src="../img/error.png" alt="" v-if="item.type == 'error'">
					<img src="../img/warning.png" alt="" v-if="item.type == 'warning'">
					<img src="../img/primary.png" alt="" v-if="item.type == 'primary'">
				</div>
				<div class="x-msg-content">
					{{item.content}}
				</div>
				<div class="x-msg-close" @click="remove(item.name)">
					<img src="../img/close.png" alt="">
				</div>
			</div>
		</transition-group>
	</div>
</template>

<script>
	let seed = 0;

	function getUuid() {
		return 'msg_' + (seed++) + '_' + new Date().getTime();
	}

	export default {
		data() {
			return {
				notices: [],
				items: [1,2,3,4,5,6,7,8,9],
    		nextNum: 10
			}
		},
		methods: {
			add(notice) {
				const name = getUuid()

				let _notice = Object.assign({
					name: name
				}, notice)

				this.notices.push(_notice)
				console.log(this.notices)
				// 定时移除
				const duration = notice.duration
				setTimeout(() => {
					this.remove(name)
				}, duration*1000)
			},
			remove(name) {
				const notices = this.notices

				for (let i = 0, len = notices.length; i < len; i++) {
					if (notices[i].name === name) {
						this.notices.splice(i, 1);
						break;
					}
				}
			},
			handleEnter() {

			},
		}
	}
</script>

<style lang="less">
	.xone-msg{
		position: fixed;
		top: 15vh;
	  left: calc(50% - 232px);
    .x-msg-main{
	    width: 464px;
	    height: 32px;
	    border-radius: 4px;
	    font-family: 'PingFangSC-Regular', 'PingFang SC';
	    font-weight: 400;
	    font-style: normal;
	    font-size: 14px;
	    color: rgba(0, 0, 0, 0.6);
	    text-align: left;
	    line-height: 22px;
	    z-index: 99;
	    background-color: rgba(246, 255, 237, 1);
	    border: 1px solid rgba(183, 235, 143, 1);
	    box-sizing: border-box;
    	padding: 0px 0px 0px 25px;
    	margin-bottom: 8px;
    	display: flex;
    	img{
    		width: 100%;
    		display: block;
    	}
    	.x-msg-img{
    		width: 15px;
    		height: 15px;
    		padding-top: 8px;
    	}
    	.x-msg-close{
    		width: 10px;
    		height: 10px;
    		right: 13px;
    		top: 10px;
    		cursor: pointer;
    		margin-left: auto;
    		margin-top: 10px;
    		margin-right: 10px;
    	}
    	.x-msg-content{
  		  font-family: 'PingFangSC-Regular', 'PingFang SC';
		    font-weight: 400;
		    font-style: normal;
		    font-size: 14px;
		    color: rgba(0, 0, 0, 0.6);
		    text-align: left;
		    line-height: 22px;
		    text-align: left;
		    float: left;
		    margin-left: 8px;
		    margin-top: 4px;
		    max-width: 380px;
    	}
    }
    .x-msg-error{
    	background-color: rgba(255, 242, 241, 1);
	    border: 1px solid rgba(255, 163, 158, 1);
    }
    .x-msg-warning{
    	background-color: rgba(255, 251, 230, 1);
	    border: 1px solid rgba(255, 229, 143, 1);
    }
    .x-msg-primary{
    	background-color: rgba(230, 247, 255, 1);
	    border: 1px solid rgba(145, 213, 255, 1);
    }
	}
	
	// -----     msg animation  ------
	// msg fade
	.msg_fade-enter-active, .msg_fade-leave-active {
	  transition: opacity .5s;
	}
	.msg_fade-enter, .msg_fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	  opacity: 0;
	}
	
	// msg slide
	.msg_slide-fade-enter-active {
	  transition: all .3s ease;
	}
	.msg_slide-fade-leave-active {
	  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	.msg_slide-fade-enter, .msg_slide-fade-leave-to
	/* .slide-fade-leave-active for below version 2.1.8 */ {
	  transform: translateY(-15px);
	  opacity: 0;
	}
	.x-msg-main{
		transition: all .5s;
	  display: inline-block;
	  margin-right: 10px;
	}
	// 离开缓冲动画
	.msg_slide-fade-leave-active {
	  position: absolute;
	}
</style>