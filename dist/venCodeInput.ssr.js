'use strict';var vue=require('vue');var script = {
  emits: ['update:modelValue', 'changed'],
  data() {
    return {
      innerValue: []
    };
  },
  watch: {
    modelValue() {
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
    innerValue: {
      deep: true,
      handler() {
        this.$emit("update:modelValue", this.innerValue.join(''));
        this.$emit("changed", this.innerValue.join(''));
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
};const _hoisted_1 = {
  class: "code-field"
};
const _hoisted_2 = {
  class: "code-field__list"
};
const _hoisted_3 = ["ind"];
const _hoisted_4 = ["onUpdate:modelValue", "onInput", "onKeydown"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [vue.createElementVNode("div", _hoisted_2, [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList([...Array($props.length).keys()], (item, ind) => {
    return vue.openBlock(), vue.createElementBlock("div", {
      class: "code-field__item",
      ind: 'ss' + ind
    }, [vue.withDirectives(vue.createElementVNode("input", {
      class: "code-field__input",
      type: "text",
      "onUpdate:modelValue": $event => $data.innerValue[ind] = $event,
      onInput: $event => $options.goChange($event, $data.innerValue[ind], ind),
      onPaste: _cache[0] || (_cache[0] = function () {
        return $options.pasteEvent && $options.pasteEvent(...arguments);
      }),
      onKeydown: vue.withKeys($event => $options.backEvent($event, ind), ["backspace"]),
      ref_for: true,
      ref: "codeInput"
    }, null, 40, _hoisted_4), [[vue.vModelText, $data.innerValue[ind]]])], 8, _hoisted_3);
  }), 256))])]);
}script.render = render;// Import vue component

// Default export is installable instance of component.
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),
var component = /*#__PURE__*/(() => {
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
var namedExports=/*#__PURE__*/Object.freeze({__proto__:null,'default':component});// iife/cjs usage extends esm default export - so import it all

// Attach named exports directly to component. IIFE/CJS will
// only expose one global var, with named exports exposed as properties of
// that global var (eg. plugin.namedExport)
Object.entries(namedExports).forEach(_ref => {
  let [exportName, exported] = _ref;
  if (exportName !== 'default') component[exportName] = exported;
});module.exports=component;