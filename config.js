const config = {
    db : {
        development : {
            username : 'root',
            password : 'Apple1984!',
            database : 'boardsys',
            port : '3306',
            host : "127.0.0.1",
            dialect : 'mysql',
            define : {
                freezeTableName : true,
                timestamps : false
            }
        }
    }
};

module.exports = config;