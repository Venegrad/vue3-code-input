<template lang="pug">
.code-field
  .code-field__list
    .code-field__item(v-for="(item, ind) in [...Array(length).keys()]" :ind="'ss'+ind")
      input.code-field__input(
        type="text" 
        v-model="innerValue[ind]" 
        @input="goChange($event, innerValue[ind], ind)" 
        @paste="pasteEvent"
        @keydown.backspace="backEvent($event, ind)" 
        ref="codeInput"
        )
</template>

<script>
export default {
	emits: ['update:modelValue', 'changed'],
	data() {
		return {
			innerValue: []
		}
	},
	watch: {
		modelValue() {
			let res = []
			for(let i = 0; i < this.length; i++) {
				if(this.modelValue && this.modelValue[i]) {
					res.push(this.modelValue[i])
				} else {
					res.push(null)
				}
			}
			this.innerValue = res;
		},
		innerValue: {
			deep: true,
			handler() {
				this.$emit("update:modelValue", this.innerValue.join(''))
				this.$emit("changed", this.innerValue.join(''))
			}
		}
	},
	methods: {
		filterStr(val) {
			if (!val) return null;
			val = val.toString();
			val = val.replace(new RegExp(this.disallow, 'g'), '');
  		return this.upper ? val.toUpperCase() : val.toLowerCase();
		},
		backEvent(e, ind) {
			if(!e.target.value && this.$refs.codeInput[ind - 1]) this.$refs.codeInput[ind - 1].focus();
		},
		pasteEvent(e) {
			e.preventDefault()
			const copiedData = e.clipboardData.getData('text');
			const compiledArray = this.filterStr(copiedData).split('').slice(0,  this.length)
			this.innerValue = compiledArray
			if(this.$refs.codeInput[this.innerValue.length - 1]) this.$refs.codeInput[this.innerValue.length - 1].focus()
		},

		goChange(e, val, ind) { 
			if(!val) return
			const vs = val.toString();
			const computedVal = vs[vs.length - 1];
			const value = computedVal ? this.filterStr(computedVal) : null
			this.innerValue[ind] = value
			e.target.value  = value

			if(e.inputType === "deleteContentBackward") {
				return
			}

			if(this.$refs.codeInput[ind + 1] && e.target.value) this.$refs.codeInput[ind + 1].focus();
		}
	},
	props: {
		disallow: {
			type: RegExp,
			default: /[^a-zA-Z0-9]/g,
		},
		upper: {
			type: Boolean,
		},
		lower: {
			type: Boolean,
			default: true
		},
		modelValue: {
			type: [String, Number]
		},
		length: {
			type: [String, Number],
			default: 6
		}
	}
}
</script>

<style lang="stylus">
.code-field
	box-sizing border-box
	max-width 500px
	*
		box-sizing border-box
	&__list
		display flex
		margin-left -4px
		margin-right -4px
	&__item
		flex-grow 1
		padding-left 4px
		padding-right 4px
	&__input
		width 100%
		height 50px
		border 2px solid transparent
		text-align center
		background-color #222
		color #fff
		font-size 20px
		font-weight 700
		border-radius 12px
		outline none
		&:focus
			border-color #777
</style>