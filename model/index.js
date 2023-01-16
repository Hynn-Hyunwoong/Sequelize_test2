// 1) connect to the sequelize
const Sequelize = require('sequelize');
// 2) config db 변수 구조분해 가져오기
const { db } = require("../config");
// 3)환경변수 설정
const env = process.env.NODE_ENV || "development";
const config = db[env];
// 4) FileSystem settings
const fs = require("fs");
// 5) path settings 
const path = require('path');

//Pool settings
const sequelize = new Sequelize(config.database, config.username, config.password, config);

//user.model
//board.model
//comment.model
// usage FileSystem

// console.log("dirname", __dirname);
const dir = fs.readdirSync(__dirname)
    .filter((v)=> v.indexOf('model') !== -1)
    .forEach((filename)=>{
        require(path.join(__dirname, filename))(sequelize,Sequelize)
    })
// console.log("dir", dir);
// console.log('test', sequelize)
const {models} = sequelize
for (const key in models){
    // console.log("models key",models[key])
    // console.log("type key", typeof models[key].associate)
    models[key].associate(models)
};

;(async () => {
    await sequelize.sync ({ force : true,})

    const { User, Board, Comment , Hash } = models
    await User.create({userId : 'choihwoong1', userPw :'1234', username : 'Admin'})
    await User.create({userId : 'choihwoong2', userPw :'1234', username : 'Admin'})
    await User.create({userId : 'choihwoong3', userPw :'1234', username : 'Admin'})
    await User.create({userId : 'choihwoong4', userPw :'1234', username : 'Admin'})
    await User.create({userId : 'choihwoong5', userPw :'1234', username : 'Admin'})
    await User.create({userId : 'choihwoong6', userPw :'1234', username : 'Hynn'})

    await Board.create({ subject : "안녕하세요", content : "1234" , userId : "choihwoong1"})
    await Board.create({ subject : "안녕하세요", content : "1234" , userId : "choihwoong2"})
    await Board.create({ subject : "안녕하세요", content : "1234" , userId : "choihwoong3"})
    await Board.create({ subject : "안녕하세요", content : "1234" , userId : "choihwoong4"})
    await Board.create({ subject : "안녕하세요", content : "1234" , userId : "choihwoong5"})
    await Board.create({ subject : "안녕하세요", content : "1234" , userId : "choihwoong6"})

    await Comment.create({ content : "테스트입니당" , userId : "choihwoong6" ,boardId : "1"})
    await Comment.create({ content : "테스트입니당" , userId : "choihwoong6" ,boardId : "1"})
    await Comment.create({ content : "테스트입니당" , userId : "choihwoong6" ,boardId : "2"})
    await Comment.create({ content : "테스트입니당" , userId : "choihwoong5" ,boardId : "2"})
    await Comment.create({ content : "테스트입니당" , userId : "choihwoong4" ,boardId : "3"})
    await Comment.create({ content : "테스트입니당" , userId : "choihwoong3" ,boardId : "3"})
    await Comment.create({ content : "테스트입니당" , userId : "choihwoong4" ,boardId : "4"})
    await Comment.create({ content : "테스트입니당" , userId : "choihwoong3" ,boardId : "4"})
    await Comment.create({ content : "테스트입니당" , userId : "choihwoong2" ,boardId : "5"})
    await Comment.create({ content : "테스트입니당" , userId : "choihwoong2" ,boardId : "5"})
    await Comment.create({ content : "테스트입니당" , userId : "choihwoong1" ,boardId : "6"})
    await Comment.create({ content : "테스트입니당" , userId : "choihwoong1" ,boardId : "6"})
    await Comment.create({ content : "테스트입니당" , userId : "choihwoong1" ,boardId : "6"})

    const body = {
        subject : "새로운 글 등록",
        content : "테스트 오우버",
        hashtag : ["#javascript", "#hello", "#world", "#Hynn", "#Tistory"]
    }

    const cookies = {
        userId : 'choihwoong1'
    }

    const req = {body, cookies}
    console.log("req test", req)

})();
module.exports = {
    Sequelize,
    sequelize,
}