import { openBlock, createElementBlock, normalizeClass, createElementVNode, Fragment, renderList, withDirectives, withKeys, vModelText, toDisplayString, createCommentVNode } from 'vue';

var script = {
  emits: ['update:modelValue', 'changed'],
  mounted() {
    if (this.inFocus && this.$refs.codeInput && this.$refs.codeInput.length) this.$refs.codeInput[0].focus();
  },
  watch: {
    error() {
      this.innerError = this.error;
    },
    modelValue() {
      this.createArray();
    },
    innerValue: {
      deep: true,
      handler() {
        this.$emit("update:modelValue", this.innerValue.join(''));
        this.$emit("changed", this.innerValue.join(''));
      }
    }
  },
  created() {
    this.createArray();
  },
  methods: {
    createArray() {
      let res = [];
      for (let i = 0; i < this.length; i++) {
        if (this.modelValue && this.modelValue[i]) {
          res.push(this.modelValue[i]);
        } else {
          res.push(null);
        }
      }
      this.innerValue = res;
    },
    filterStr(val) {
      if (!val) return null;
      val = val.toString();
      val = val.replace(new RegExp(this.disallow, 'g'), '');
      return this.upper ? val.toUpperCase() : val.toLowerCase();
    },
    backEvent(e, ind) {
      if (!e.target.value && this.$refs.codeInput[ind - 1]) this.$refs.codeInput[ind - 1].focus();
    },
    pasteEvent(e) {
      e.preventDefault();
      const copiedData = e.clipboardData.getData('text');
      const compiledArray = this.filterStr(copiedData).split('').slice(0, this.length);
      this.innerValue = compiledArray;
      if (this.$refs.codeInput[this.innerValue.length - 1]) this.$refs.codeInput[this.innerValue.length - 1].focus();
    },
    goChange(e, val, ind) {
      this.innerError = null;
      if (!val) return;
      const vs = val.toString();
      const computedVal = vs[vs.length - 1];
      const value = computedVal ? this.filterStr(computedVal) : null;
      this.innerValue[ind] = value;
      e.target.value = value;
      if (e.inputType === "deleteContentBackward") {
        return;
      }
      if (this.$refs.codeInput[ind + 1] && e.target.value) this.$refs.codeInput[ind + 1].focus();
    }
  },
  props: {
    disallow: {
      type: RegExp,
      default: () => {
        return /[^a-zA-Z0-9]/g;
      }
    },
    upper: {
      type: Boolean
    },
    error: {
      type: [String, Number]
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
    }
  },
  data() {
    return {
      innerValue: [],
      innerError: this.error
    };
  }
};

const _hoisted_1 = {
  class: "code-field__list"
};
const _hoisted_2 = ["ind"];
const _hoisted_3 = ["onUpdate:modelValue", "onInput", "onKeydown"];
const _hoisted_4 = {
  key: 0,
  class: "code-field__error"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["code-field", {
      'error': $data.innerError
    }])
  }, [createElementVNode("div", _hoisted_1, [(openBlock(true), createElementBlock(Fragment, null, renderList([...Array($props.length).keys()], (item, ind) => {
    return openBlock(), createElementBlock("div", {
      class: "code-field__item",
      ind: 'ss' + ind
    }, [withDirectives(createElementVNode("input", {
      class: "code-field__input",
      type: "text",
      "onUpdate:modelValue": $event => $data.innerValue[ind] = $event,
      onInput: $event => $options.goChange($event, $data.innerValue[ind], ind),
      onClick: _cache[0] || (_cache[0] = $event => $data.innerError = null),
      onPaste: _cache[1] || (_cache[1] = function () {
        return $options.pasteEvent && $options.pasteEvent(...arguments);
      }),
      onKeydown: withKeys($event => $options.backEvent($event, ind), ["backspace"]),
      ref_for: true,
      ref: "codeInput"
    }, null, 40, _hoisted_3), [[vModelText, $data.innerValue[ind]]])], 8, _hoisted_2);
  }), 256))]), $data.innerError ? (openBlock(), createElementBlock("div", _hoisted_4, toDisplayString($data.innerError), 1)) : createCommentVNode("", true)], 2);
}

script.render = render;

// Import vue component

// Default export is installable instance of component.
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),
var entry_esm = /*#__PURE__*/(() => {
  // Get component instance
  const installable = script;

  // Attach install function executed by Vue.use()
  installable.install = app => {
    app.component('venCodeInput', installable);
  };
  return installable;
})();

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;

export { entry_esm as default };
