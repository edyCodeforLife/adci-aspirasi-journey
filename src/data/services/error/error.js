import { AxiosError } from 'axios';

export const HandleError = async (err, handler) => {
	let e = err?.response;
	if (err?.code === 'ECONNABORTED') {
		if (handler?.TimoutExceeded)
			return await handler.TimoutExceeded?.();
	} else {
		switch (e?.status) {
			case (400): {
				return await handler?.ValidationError?.(e?.data);
			}
			case (401): {
				if (handler.TokenExpired)
					return await handler.TokenExpired();
				else return handler.handle401?.(e?.data);
			}

			case (413): {
				if (handler.handleLargePayload)
					return await handler.handleLargePayload?.(e?.data);
			}

			case (404): {
				if (handler.NotFound)
					return await handler.NotFound?.(e?.data);
			}

			case (408): {
				if (handler.TimoutExceeded)
					return await handler.TimoutExceeded();
			}

			case (422): {
				if (handler.unprocessableEntity)
					return await handler.unprocessableEntity(e?.data);
			}

			default: {
				return await handler.ServerError?.(e?.data);
			}
		}
	}
};

