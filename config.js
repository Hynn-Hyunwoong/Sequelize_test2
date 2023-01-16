const config = {
    db : {
        development : {
            username : 'root',
            password : 'Apple1984!',
            database : 'boardsys',
            port : '3306',
            dialect : 'mysql',
            define : {
                freezeTableName : true,
                timestamps : false
            }
        }
    }
};

module.exports = config;