// 1) connect to the sequelize
const Sequelize = require('sequelize');
// 2) config db 변수 구조분해 가져오기
const { db } = require("../config");
// 3)환경변수 설정
const env = process.env.NODE_ENV || "development";
const config = db[env];

//Pool settings
const sequelize = new Sequelize(config.database, config.username, config.password, config);

module.exports = {
    Sequelize,
    sequelize,
}