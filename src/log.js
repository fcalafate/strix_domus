var moment = require('moment');

const Log = (origem, objeto) => {
    const now = moment().format('DD/MM/YYYY hh:mm:ss');
    
    console.log(`[${now}][${origem}]: ${objeto} `);

    if(objeto === Object(objeto))
    {
        console.log(objeto);
        console.log('------------------------------------------------------------------------------------------------------');
    }
}

module.exports = Log