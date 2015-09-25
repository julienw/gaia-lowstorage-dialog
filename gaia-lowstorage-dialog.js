/*global MozActivity, define, require, exports, module */
;(function(define){'use strict';define((require,exports,module) => {

/**
 * Dependencies
 */
var component = require('gaia-component');


function learnmore() {
  var activity = new MozActivity({
    name: 'configure',
    data: {
      target: 'storage',
      section: 'application storage'
    }
  });

  return Promise.resolve(activity);
}

module.export = component.register('gaia-lowstorage-dialog', {
  extensible: false,
  created() {
    var shadow = this.setupShadowRoot();
    navigator.mozL10n.ready(this._localizeShadowDom.bind(this));

    var learnmoreLink = shadow.querySelector('.learnmore-button');
    learnmoreLink.addEventListener('click', learnmore);

    var confirm = shadow.querySelector('gaia-confirm');
    confirm.addEventListener('confirm', () => {
      this.dispatchEvent(new CustomEvent('confirm'));
    });
  },

  /**
   * Localize the component manually as l10n attributes are not supported
   * within the shadow dom. See also: bug 1026236.
   */
  _localizeShadowDom() {
    navigator.mozL10n.translateFragment(this.shadowRoot);
  },
  template: `<gaia-confirm>
    <h1 data-l10n-id="lowstorage-dialog-title"></h1>
    <p><strong class='stronger'><content/></strong></p>
    <p data-l10n-id="lowstorage-dialog-generic-text"></p>
    <p>
      <button type="button"
              class="button-link-like learnmore-button"
              data-l10n-id="lowstorage-dialog-learnmore"></button>
    </p>
    <gaia-buttons skin="dark">
      <button class="confirm recommend"
              data-l10n-id="lowstorage-dialog-ok"
              type="button"></button>
    </gaia-buttons>
  </gaia-confirm>
  <style>
  .button-link-like {
    display: inline;
    -moz-appearance: none;
    text-align: left;

    padding: 0;
    border: 0;

    font: inherit;
    color: #00CAF2;
    cursor: pointer;
    text-decoration: underline;
    background-color: transparent;
  }

  .button-link-like::-moz-focus-inner {
    /* this is necessary to eliminate a small "padding" inside the button */
    border: 0;
    padding: 0;
  }

  .button-link-like:focus {
    outline: 1px dotted currentColor;
  }
  </style>`
});

});})(typeof define=='function'&&define.amd?define
:(function(n,w){'use strict';return typeof module=='object'?function(c){
c(require,exports,module);}:function(c){var m={exports:{}};c(function(n){
return w[n];},m.exports,m);w[n]=m.exports;};})('gaia-lowstorage-dialog',this));
