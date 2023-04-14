const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('contact', {
		userId: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
		accountId: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
		observation: {
			type: DataTypes.STRING
		},
	}, {
		timestamps: false,
		uniqueKeys: {
			contacts_unique: {
				fields: ['userId', 'accountId']
			}
		}
	});
};