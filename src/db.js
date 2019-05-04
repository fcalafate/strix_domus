const Mysql = require('mysql');
const Config = require('./config');
const Log = require('./log')

class DB {
    constructor () {
        this.Connection = "";
    }

    Connect (host, user, password, database){
        this.Connection = Mysql.createConnection({ host, port: 3306, user, password, database});

        this.Connection.connect(err => {if(err) Log('DB.Connect', err);});
        Log('DB.Connect', 'Conexão estabelecida com o banco');
    }

    QueryExec(query) {
        return new Promise((resolve, reject) => {
            this.Connect(Config.DatabaseServer, Config.DatabaseUser, Config.DatabasePassword, Config.DatabaseDefault);
            
            Log('DB.QueryExec',query)
        
            this.Connection.query(query, (err, results) => {
                if(err)
                {
                    Log('DB.QueryExec',err);
                    reject(new Error("Erro no banco de dados"));
                }
                else
                {
                    //this.Connection.end();
                    Log('DB.QueryExec', results);
                    resolve(results);
                }
            });

        }); 
    }
}

module.exports = DB;