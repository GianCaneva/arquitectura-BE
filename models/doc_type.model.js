const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('docType', {
		id: {
			allowNull: false,
			type: DataTypes.STRING,
			primaryKey: true
		},
		description: {
			allowNull: false,
			type: DataTypes.STRING,
			unique: true
		},
	}, {
		timestamps: false,
		tableName: 'doc_types'
	});
};