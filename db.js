const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.db_schema, process.env.db_user, process.env.db_password, {
  host: process.env.db_host,
  port: process.env.db_port,
  dialect: "mysql",
  dialectOptions: { decimalNumbers: true }
});

const modelDefiners = [
  require("./models/account.model"),
  require("./models/contact.model"),
  require("./models/doc_type.model"),
  require("./models/movement_type.model"),
  require("./models/movement.model"),
  require("./models/user.model"),
];

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

sequelize.models.user.hasOne(sequelize.models.account);
sequelize.models.account.belongsTo(sequelize.models.user);

sequelize.models.account.hasMany(sequelize.models.movement);
sequelize.models.movement.belongsTo(sequelize.models.account);

sequelize.models.docType.hasMany(sequelize.models.user);
sequelize.models.user.belongsTo(sequelize.models.docType);

sequelize.models.movementType.hasMany(sequelize.models.movement);
sequelize.models.movement.belongsTo(sequelize.models.movementType);

sequelize.models.contact.hasOne(sequelize.models.user, { sourceKey: 'userId', foreignKey: 'id' });
sequelize.models.contact.hasOne(sequelize.models.account, { sourceKey: 'accountId', foreignKey: 'id' });

module.exports = sequelize;
