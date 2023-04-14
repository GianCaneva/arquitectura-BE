const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('user', {
		docTypeId: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
		docNumber: {
			allowNull: false,
			type: DataTypes.STRING
		},
		password: {
			allowNull: false,
			type: DataTypes.STRING
		},
		name: {
			allowNull: false,
			type: DataTypes.STRING
		},
	}, {
		timestamps: false
	});
};