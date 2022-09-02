

// Format an integer number:   formatNumber(123456789, ',')  ->  '123,456,789'
/* ---------------
// Global functions
--------------- */

function formatNumber(num, tSep = ',') {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${tSep}`)
}

  
function formula(pkg) {    
    return (pkg.length + pkg.height + pkg.wide) * pkg.weight + (pkg.price * 0.01);
}