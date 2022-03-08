import { Request, Response, NextFunction } from 'express';
import TryCatchWrapper from '../common/decorators/catch';

import AwsService from '../services/aws.service';

class AwsController {
	@TryCatchWrapper
	public async uploadOneFile (req: Request, res: Response, next: NextFunction) {
		await AwsService.uploadFile(req.body);

		res.statusCode = 201;
		res.send();
	}
}

export default new AwsController();
