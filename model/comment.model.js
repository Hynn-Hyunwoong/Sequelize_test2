module.exports = (sequelize, Sequelize) => {
    class Comment extends Sequelize.Model {
        static initialize(){
            return super.init({
                content: {
                    type: Sequelize.TEXT,
                    allowNull: false,
                },
                createAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: sequelize.fn("now"),
                },
            },
            {
                sequelize
            }
            )
        }
        static associate(models){
            super.belongsTo(models.Board, {
                foreignKey: "boardId"
            })
            super.belongsTo(models.User, {
                foreignKey : "userId"
            })
        }
    }
    Comment.initialize()
}