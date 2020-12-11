// trying to polyfill event
(function () {

  if ( typeof window.CustomEvent === "function" ) return false;

  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: null };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   }

  window.CustomEvent = CustomEvent;
})();

const event = new CustomEvent('itemInserted')

module.exports = (key,value) => {
  localStorage.setItem(key,value);
  document.dispatchEvent(event);
};
