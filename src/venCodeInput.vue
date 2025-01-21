<template lang="pug">
.code-field(:class="{'error': innerError}")
  .code-field__list
    .code-field__item(v-for="(item, ind) in [...Array(length).keys()]" :ind="'ss'+ind")
      input.code-field__input(:type="numbersOnly ? 'number' : 'text'" min="0" :inputmode="numbersOnly ? 'numeric' : null" :pattern="numbersOnly ? '[0-9]*' : '.*'" v-model="innerValue[ind]" @input="goChange($event, innerValue[ind], ind)"  @click="innerError = null" @paste="pasteEvent" @keydown.backspace="backEvent($event, ind)"  ref="codeInput")
  .code-field__error(v-if="innerError") {{ innerError }} 
</template>

<script>
const regex = RegExp(/[0-9]+/g);

export default {
	emits: ['update:modelValue', 'changed'],
	
	mounted() {
		if(this.inFocus && this.$refs.codeInput && this.$refs.codeInput.length) this.$refs.codeInput[0].focus()
	},
	watch: {
		error() {
			this.innerError = this.error
		},
		modelValue() {
			this.createArray()
		},
		innerValue: {
			deep: true,
			handler() {
				this.$emit("update:modelValue", this.innerValue.join(''))
				this.$emit("changed", this.innerValue.join(''))
			}
		}
	},
	created() {
		this.createArray()
	},
	methods: {
		createArray() {
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
		filterStr(val) {
			if (!val) return null;
			val = val.toString();
			val = val.replace(new RegExp(this.disallow, 'g'), '');
			if(this.numbersOnly) val = val.replace(new RegExp(/[^0-9]/g, 'g'), ''); 
			return this.upper ? val.toUpperCase() : val.toLowerCase();
		},
		backEvent(e, ind) {
			if(!e.target.value && this.$refs.codeInput[ind - 1]) this.$refs.codeInput[ind - 1].focus();
		},
		pasteEvent(e) {
			
			e.preventDefault()
			let copiedData = e.clipboardData.getData('text');
			const compiledArray = this.filterStr(copiedData).split('').slice(0,  this.length)
			this.innerValue = compiledArray

			if(this.blurdone && this.innerValue?.join('').length === this.length && document?.activeElement) {
				document.activeElement.blur();
			} else if(this.$refs.codeInput[this.innerValue.length - 1]) {
				this.$refs.codeInput[this.innerValue.length - 1].focus()
			}
		},

		goChange(e, val, ind) { 

			
			if(this.numbersOnly && !regex.test(e.target.value)) e.target.value = null


			this.innerError = null
			if(!val) return
			const vs = val.toString();
			const computedVal = vs[vs.length - 1];
			const value = computedVal ? this.filterStr(computedVal) : null
			this.innerValue[ind] = value
			e.target.value  = value

			if(e.inputType === "deleteContentBackward") {
				return
			}

			if(this.$refs.codeInput[ind + 1] && e.target.value) {
				this.$refs.codeInput[ind + 1].focus();
			} else if (this.blurdone && document) {
				document.activeElement?.blur();
			}
		}
	},
	props: {
		disallow: {
			type: RegExp,
			default: () => {
				return /[^a-zA-Z0-9]/g
			},
		},
		numbersOnly: {
			type: Boolean,
			default: true
		},
		upper: {
			type: Boolean,
		},
		error: {
			type: [String, Number],
		},
		lower: {
			type: Boolean,
			default: true
		},
		modelValue: {
			type: [String, Number]
		},
		inFocus: {
			type: Boolean,
			default: true
		},
		length: {
			type: [String, Number],
			default: 6
		},
		blurdone: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			innerValue: [],
			innerError: this.error
		}
	},
}
</script>

<style>
.code-field {
  box-sizing: border-box;
  max-width: 500px;
}

.code-field__error {
	text-align: center;
	font-size: 12px;
	margin: 10px;
	color: #f23d34;
}

.code-field * {
  box-sizing: border-box;
}
.code-field__list {
  display: flex;
  margin-left: -4px;
  margin-right: -4px;
}
.code-field__item {
  flex-grow: 1;
  padding-left: 4px;
  padding-right: 4px;
}
.code-field__input {
  width: 100%;
  height: 50px;
  border: 2px solid transparent;
  text-align: center;
  background-color: #222;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  border-radius: 12px;
  outline: none;
}
.code-field__input:focus {
  border-color: #777;
}

.code-field.error input {
	border-color: #f23d34
}
</style>