
import { HandleError } from '../../services/error/error';
import { DigiDataServiceData } from '../../services/digidata/digidata';

export class DigiDataService {
	constructor() {
		this._service = new DigiDataServiceData();
	}

	async PostPassiveLiveness(req, handler) {
		try {
			const response = await this._service.PostPassiveLiveness(req);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return HandleError(e, handler);
		}
	}
}