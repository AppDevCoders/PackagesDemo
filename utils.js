/* ---------------
// Global functions
--------------- */

// get ISO date as string
function getDateString() {
  return (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0, 10);
}

// Format an integer number:   formatNumber(123456789, ',')  ->  '123,456,789'
function formatNumber(num, tSep = ',') {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${tSep}`)
}

// Dummy formula
function formula(pkg) {    
    return (pkg.width + pkg.height + pkg.length) * pkg.weight + (pkg.price * 0.01);
}

