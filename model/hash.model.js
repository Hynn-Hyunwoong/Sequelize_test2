module.exports = (sequelize, Sequelize) => {
    class Hash extends Sequelize.Model {
        static initialize(){
            return super.init({
                    tag: {
                        type: Sequelize.STRING(30),
                        allowNull: false,
                        primaryKey: true,
                    },

            },
            {
                sequelize
            }
            )
        }
        static associate(models){   
            super.belongsToMany(models.Board,{
                through : 'Hashtag',
                foreignKey : 'tag',
            })
        }
    }
    Hash.initialize()
}