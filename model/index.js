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
    await sequelize.sync ({ force : true,});

    const { User, Board, Comment , Hash } = models;
    await User.create({userId : 'choihwoong1', userPw :'1234', username : 'Admin'});
    await User.create({userId : 'choihwoong2', userPw :'1234', username : 'Admin'});
    await User.create({userId : 'choihwoong3', userPw :'1234', username : 'Admin'});
    await User.create({userId : 'choihwoong4', userPw :'1234', username : 'Admin'});
    await User.create({userId : 'choihwoong5', userPw :'1234', username : 'Admin'});
    await User.create({userId : 'choihwoong6', userPw :'1234', username : 'Hynn'});

    await Board.create({ subject : "안녕하세요", content : "1234" , userId : "choihwoong1"});
    await Board.create({ subject : "안녕하세요", content : "1234" , userId : "choihwoong2"});
    await Board.create({ subject : "안녕하세요", content : "1234" , userId : "choihwoong3"});
    await Board.create({ subject : "안녕하세요", content : "1234" , userId : "choihwoong4"});
    await Board.create({ subject : "안녕하세요", content : "1234" , userId : "choihwoong5"});
    await Board.create({ subject : "안녕하세요", content : "1234" , userId : "choihwoong6"});

    await Comment.create({ content : "테스트입니당" , userId : "choihwoong6" ,boardId : "1"});
    await Comment.create({ content : "테스트입니당" , userId : "choihwoong6" ,boardId : "1"});
    await Comment.create({ content : "테스트입니당" , userId : "choihwoong6" ,boardId : "2"});
    await Comment.create({ content : "테스트입니당" , userId : "choihwoong5" ,boardId : "2"});
    await Comment.create({ content : "테스트입니당" , userId : "choihwoong4" ,boardId : "3"});
    await Comment.create({ content : "테스트입니당" , userId : "choihwoong3" ,boardId : "3"});
    await Comment.create({ content : "테스트입니당" , userId : "choihwoong4" ,boardId : "4"});
    await Comment.create({ content : "테스트입니당" , userId : "choihwoong3" ,boardId : "4"});
    await Comment.create({ content : "테스트입니당" , userId : "choihwoong2" ,boardId : "5"});
    await Comment.create({ content : "테스트입니당" , userId : "choihwoong2" ,boardId : "5"});
    await Comment.create({ content : "테스트입니당" , userId : "choihwoong1" ,boardId : "6"});
    await Comment.create({ content : "테스트입니당" , userId : "choihwoong1" ,boardId : "6"});
    await Comment.create({ content : "테스트입니당" , userId : "choihwoong1" ,boardId : "6"});

    const body = {
        subject : "새로운 글 등록",
        content : "테스트 오우버",
        Hashtag : ["#javascript", "#hello", "#world", "#Hynn", "#Tistory"]
    };

    const cookies = {
        userId : 'choihwoong1'
    };

    const req = {body, cookies};
    // console.log("req test", req)

    // board, hash 
    // const {subject ,content, hashtag } = req.body
    const {Hashtag, ...rest} = req.body;
    // console.log('test reqbody', req.body);

    //1. Insert to Board Table
    const board = await Board.create(rest);
    // console.log('boardtest', board)
    console.log(Hashtag)
    // const insert1 = await Hash.findOrCreate({where : {tag: "#java123"}})
    // const insert2 = await Hash.findOrCreate({where : {tag: "#java"}})
    //1.Find, If yes, no action, else Insert.
    // console.log("123",models.Hash)
    // console.log("1",insert1)
    // console.log("2",insert2)

    // Hashtag.forEach(async (tag)=>{
    //  await Hash.findOrCreate({where : {tag: tag}})
    // })
    const Hashtags = Hashtag.map((tag)=> Hash.findOrCreate({where : {tag }}));
    // const Hashtags = [Hashtags.map((tag)=> Hash.findOrCreate({where : {tag} }))];
    const tags = await Promise.all(Hashtags);
    // console.log('hash1', hashtags);
    // console.log('hash2',tags);
    console.log('test',board.__proto__);
    // console.log('test2',board.addHashes());
    // await board.addHashes(tag);
    await board.addHashes(tags.map((v)=>v[0]));

    // Sequelize 내에서 사용가능한 추가 method list 

    //View Area
    const Id = 7
    const view = await Board.findOne({
        where : {id : Id},
        include : {
            model : User,
            attributes : ["username"],
        }
    })

    // console.log('view', view)
    // console.log(view.__proto__);
    const Comments = await view.getComments()
    const HashT = (await view.getHashes({raw : true})).map(v=>({tag:v.tag}));

    // console.log("comments", Comments)
    // console.log('hashs', HashT)

})();
module.exports = {
    Sequelize,
    sequelize,
}