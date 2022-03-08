import { QueryInterface, DataTypes } from 'sequelize';
import UploadsModel from '../../models/uploads/uploads.model';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
	return queryInterface.createTable(UploadsModel.tableName, {
		id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
		},
		file_url: {
      type: DataTypes.STRING(4096),
      allowNull: false,
		},
		file_type: {
      type: DataTypes.STRING(128),
      allowNull: false,
		},
		status: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
		createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
		},
		updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
		},
	});
  },
  down: async (queryInterface: QueryInterface): Promise<void> => {
	return queryInterface.dropTable(UploadsModel.tableName);
  }
};