
import { DataService } from '../config';

export class DigiDataServiceData {
	PostPassiveLiveness(req) {
		return DataService.post('/passive_liveness', req);
	}
}