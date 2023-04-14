const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('movementType', {
		id: {
			allowNull: false,
			type: DataTypes.STRING,
			primaryKey: true
		},
		descriptionDebit: {
			type: DataTypes.STRING
		},
		descriptionCredit: {
			type: DataTypes.STRING
		},
	}, {
		timestamps: false,
		tableName: 'movement_types'
	});
};