import { DataTypes, Model, Sequelize } from 'sequelize';
import { Upload } from './uploads.types';

import { sequelize } from '../../database/connect';

class UploadsModel extends Model<Upload> {
	public static tableName: string = 'uploads';

	public id?: number;
	public file_url: string;
	public file_type: string;
	public status: string;

	public static prepareInit = (seq: Sequelize) => {
		UploadsModel.init({
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
		}, { tableName: UploadsModel.tableName, sequelize });
	}
}

UploadsModel.prepareInit(sequelize);

export default UploadsModel;
