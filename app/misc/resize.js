export default function handleResize(store) {
  var to

  function calculate() {
    const board = document.getElementsByClassName('board')[0]
    if(board) {
      const style = board.currentStyle || window.getComputedStyle(board);
      const margin = style.marginLeft //e.g. '202px'
      const availableWidth = parseFloat(margin.substring(0, margin.length - 2))
      store.dispatch({
        type: 'WINDOW_RESIZE',
        logPosition: availableWidth > 200 ? 'left' : 'bottom'
      })
    }
  }

  window.onresize = function() {
    clearTimeout(to)
    to = setTimeout(calculate, 600)
  }

}
