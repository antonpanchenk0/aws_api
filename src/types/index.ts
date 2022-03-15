import {ManagedUpload} from 'aws-sdk/lib/s3/managed_upload';

import SendData = ManagedUpload.SendData;

export interface UploadFileRequestData {
	base64: string;
	file_name: string;
	bucket_name: string;
	bucket_file_path: string;
}

export interface UploadFileResponseData {
	data: SendData | null;
	error: string | Error | null;
}