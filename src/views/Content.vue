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
      copyBtnExtraStyle: {},
      copying: false,
    }
  },
  methods: {
    fallbackCopyTextToClipboard (text) {
      let textArea = document.createElement("textarea");
      textArea.value = text;

      // Avoid scrolling to bottom
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.position = "fixed";

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
      }

      document.body.removeChild(textArea);
    },
    copyTextToClipboard (text) {
      if (!navigator.clipboard) {
        this.fallbackCopyTextToClipboard.call(this, text);
        return;
      }
      navigator.clipboard.writeText(text).then(function () {
        console.log('Async: Copying to clipboard was successful!');
      }, function (err) {
        console.error('Async: Could not copy text: ', err);
      });
    },

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
      this.copyTextToClipboard(this.getSelectedText());
      this.showCopyBtn = false;
      window.getSelection().empty();
      this.$message({
        message: '复制好了ヽ(=^･ω･^=)丿',
        type: 'success',
        duration: '2000'
      });
    }
  },
  created () {
    //防止JS禁用选择
    document
      .querySelectorAll("*")
      .forEach(node =>
        node.onselectstart = function (e) {
          e.stopPropagation();
          return true;
        });

    document.addEventListener('mousedown', e => {
      if(!e.target){
        return;
      }
      if(!e.target.className){
        return;
      }
      //是按钮
      if (e.target.className.indexOf('cc-btn-logo') > -1) {
        return;
      }
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