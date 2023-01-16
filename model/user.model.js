// User.Model.js How to step
// 1) Class Open
// 2) Class Setting / Usage
// 3) Exports Class functions 
module.exports = (sequelize, Sequelize) => {
    class User extends Sequelize.model {
        static initialize() {
            // super === this, this is very important. (Different situations)
            return super.init({
                userId :{
                    type: Sequelize.STRING(60),
                    primaryKey : true,
                },
                userPw : {
                    type: Sequelize.STRING(64),
                    allowNull : false,
                },
                username :{
                    type:Sequelize.STRING(32),
                    allowNull : false,
                },
                provider :{
                    type: Sequelize.ENUM("local", "kakao"),
                    allowNull : false,
                    defaultValue : "local",
                    // ENUM is inserted value only listed ENUM values.
                    // DefaultValue : if not insert, defaultValue added
                },
                snsId:{
                    type:Sequelize.STRING(128),
                    allowNull : true,
                },
            },
            {
                sequelize,
            }
            ) 
        }

        static associate(models){

        }
    }
    
    User.initialize()
}