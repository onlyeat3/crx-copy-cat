<template>
  <div id="__cc-app">
    <img
      v-on:click="copyContent"
      v-show="showCopyBtn"
      :style="copyBtnExtraStyle"
      class="cc-btn-logo"
      src="../assets/copy_black.png"
      alt="点击复制"
      title="点击复制内容"
    />
  </div>
</template>
<script>
//替换文本前与后的空格
String.prototype.trim = function () {
  return this.replace(/(^\s*)|(\s*$)/g, "");
}
export default {
  data () {
    return {
      showCopyBtn: false,
      showSuccessAlert: false,
      copyBtnExtraStyle: {}
    }
  },
  methods: {
    getSelectedText () {
      try {
        let selecter = window.getSelection().toString();
        if (selecter != null && selecter.trim() != "") {
          return selecter;
        }
      } catch (err) {
        let selecter = document.selection.createRange();
        let s = selecter.text;
        if (s != null && s.trim() != "") {
          return;
        }
      }
    },
    copyContent () {
      document.execCommand('copy');
      this.showCopyBtn = false;
      this.$message({
        message: '复制好了ヽ(=^･ω･^=)丿',
        type: 'success',
        duration: '2000'
      });
    }
  },
  created () {
    document.addEventListener('mousedown', e => {
      this.showCopyBtn = false;
      return true;
    }, false);
    document.addEventListener('mouseup', e => {
      setTimeout(() => {
        let text = this.getSelectedText();
        if (text == null || text == '') {
          this.showCopyBtn = false;
          return;
        }
        this.showCopyBtn = true;
        this.copyBtnExtraStyle = { top: `${e.pageY + 35}px`, left: `${e.pageX + 35}px` };
      }, 5);
      return true;
    }, false);

    document.addEventListener('copy', e => {
      e.preventDefault();
      let clipboardData = e.clipboardData || window.clipboardData();
      clipboardData.setData('text/plain', this.getSelectedText());
      return true;
    }, false);

  }
}
</script>
<style>
.alert-success {
  position: absolute;
  z-index: 9999999;
  top: 0px;
  right: 0px;
}
.cc-btn-logo {
  width: 28px;
  height: 28px;
  position: absolute;
  cursor: pointer;
  z-index: 999999999;
  background: #fafafa;
}
* {
  user-select: auto !important;
  -webkit-touch-callout: auto !important;
  -webkit-user-select: auto !important;
  -khtml-user-select: auto !important;
  -moz-user-select: auto !important;
  -ms-user-select: auto !important;
}
#__cc-app {
  all: initial;
}
.el-message {
  z-index: 99999 !important;
}
</style>