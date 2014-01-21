var BootstrapDevice = require('BootstrapDevice')

/**
 * Determines the active Bootstrap 3 device class based on device width or
 * current window width.
 * @return {BootstrapDevice}
 */
function bsDevice() {
  var width = (window.innerWidth > 0 ? window.innerWidth : screen.width)
  if (width < 768) return BootstrapDevice.XS
  if (width < 992) return BootstrapDevice.SM
  if (width < 1200) return BootstrapDevice.MD
  return BootstrapDevice.LG
}

module.exports = bsDevice