const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('movement', {
		accountId: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
		amount: {
			allowNull: false,
			type: DataTypes.DECIMAL(15, 2)
		},
		movementTypeId: {
			allowNull: false,
			type: DataTypes.STRING
		},
		billNumber: {
			type: DataTypes.INTEGER
		},
		creationDate: {
			allowNull: false,
			type: DataTypes.DATE,
			defaultValue: Sequelize.NOW
		},
		description: {
			allowNull: false,
			type: DataTypes.STRING
		},
		usernameDebit: {
			type: DataTypes.STRING
		},
		usernameCredit: {
			type: DataTypes.STRING
		},
	}, {
		timestamps: false
	});
};