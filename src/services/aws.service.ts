import * as AwsSdk from 'aws-sdk';
import path from 'path';
import fs from 'fs';
import { v4 } from 'uuid';

import { InternalError } from '../common/exceptions';

import UploadsModel from '../models/uploads/uploads.model';

import {UploadFileRequestData, UploadFileResponseData } from '../types';

class AwsService {
	private s3: AwsSdk.S3;

	constructor() {
		AwsSdk.config.update({
			accessKeyId: process.env.AWS_ACCESS_KEY_ID,
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
		});

		this.s3 = new AwsSdk.S3();
	}

	public uploadFile = async (fileData: UploadFileRequestData): Promise<UploadFileResponseData> => {
		const fileWithoutDataType = fileData.base64.replace(/data:[a-z]{0,}\//, '');

		const fileType = fileWithoutDataType.substring(0, fileWithoutDataType.indexOf(';base64'));

		const base64File = fileData.base64.split(';base64').pop();

		const filePath = `./temp/${v4()}_${fileData.file_name}.${fileType}`;

		if (!base64File) {
			throw new InternalError('Something went wrong with provided file.');
		}

		fs.writeFileSync(filePath, base64File, { encoding: 'base64' });

		const response = await this.s3.upload({
			Bucket: fileData.bucket_name,
			Key: `${fileData.bucket_file_path}/${path.basename(filePath)}`,
			Body: fs.createReadStream(filePath),
		}).promise().then((res) => ({
			data: res,
			error: null,
		}))
			.catch((error) => ({
				data: null,
				error,
			}));

		await fs.unlinkSync(filePath);

		if (response.error) {
			throw new InternalError(response.error?.message || response.error);
		}

		return response;
	}
}

export default new AwsService();
