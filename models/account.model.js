const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('account', {
		userId: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
		balance: {
			allowNull: false,
			type: DataTypes.DECIMAL(15, 2)
		},
		alias: {
			allowNull: false,
			unique: true,
			type: DataTypes.STRING,
		},
		cbu: {
			allowNull: false,
			unique: true,
			type: DataTypes.STRING,
		},
	}, {
		timestamps: false
	});
};