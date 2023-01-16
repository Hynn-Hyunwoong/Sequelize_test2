module.exports = (sequelize, Sequelize) => {
    class Board extends Sequelize.Model {
        static initialize(){
            return super.init({
                id : {
                    type:Sequelize.INTEGER,
                    autoIncrement:true,
                    primaryKey : true,
                },
                subject :{
                    type:Sequelize.STRING(128),
                    allowNull : false,
                },
                content : {
                    type:Sequelize.TEXT,
                    allowNull : false
                },
                createAt : {
                    type:Sequelize.DATE,
                    defaultValue:Sequelize.fn('now'),
                },
                hit : {
                    type:Sequelize.INTEGER,
                    defaultValue : 0,
                },
            },
            {
                sequelize
            }
            )
        }
        static associate(models){
            super.belongsTo(models.User, {
                foreignKey : "userId"
            })

            super.hasMany(models.Comment, {
                foreignKey : "boardId"
            })
            super.belongsToMany(models.User, {
                through : "Liked",
                foreignKey : "boardId"
            })
            super.belongsToMany(models.Hash, {
                through: "Hashtag",
                foreignKey : "boardId"
            })
        }
    }
    Board.initialize()
}