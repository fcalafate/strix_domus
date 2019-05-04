const Database = require("../db");
const Log = require('../log')

class deviceController {
    constructor(){
        Log('deviceController.construtor',"Iniciou deviceController.")

        this.db = new Database();
    }

    ListAll() {
        return new Promise((resolve, reject) => {
            var query = "SELECT * FROM tb_device";

            this.db.QueryExec(query)
             .then(results => resolve(results) )
             .catch(err => reject(err));
        });
    }

    ListByMac(macaddress) {
        return new Promise((resolve, reject) => {
            var query = `SELECT * FROM tb_device WHERE vc_macaddress = '${macaddress}'`;

            this.db.QueryExec(query)
             .then(results => resolve(results) )
             .catch(err => reject(err));
        });
    }

    RegisterDeviceByMac(macaddress, state, source) {
        return new Promise((resolve, reject) => {
            var query = `CALL \`strix-domus\`.\`PRC_REGISTERDEVICE\`('${macaddress}', ${state}, '${source}');`;

            this.db.QueryExec(query)
             .then(results => resolve(results) )
             .catch(err => reject(err));
        });
    }

    GetStateByMac(macaddress) {
        return new Promise((resolve, reject) => {
            var query = `SELECT dsh.dt_history
                                , dsh.ni_state
                                , dsh.vc_statesource
                        FROM tb_device d
                            JOIN (SELECT ni_iddevice, MAX(ni_iddevicestatehistory) ni_iddevicestatehistory FROM tb_devicestatehistory GROUP BY ni_iddevice) last_dsh ON (last_dsh.ni_iddevice = d.ni_iddevice)
                            JOIN tb_devicestatehistory dsh ON (dsh.ni_iddevicestatehistory = last_dsh.ni_iddevicestatehistory)
                        WHERE d.vc_macaddress = '${macaddress}'`;

            this.db.QueryExec(query)
             .then(results => resolve(results) )
             .catch(err => reject(err));
        });
    }

    SetStateByMac(macaddress, state, source) {
        return new Promise((resolve, reject) => {
            var query = `CALL \`strix-domus\`.\`PRC_SETDEVICESETSTATE\`('${macaddress}', ${state}, '${source}');`;

            this.db.QueryExec(query)
             .then(results => resolve(results) )
             .catch(err => reject(err));
        });
    }
}

module.exports = deviceController;