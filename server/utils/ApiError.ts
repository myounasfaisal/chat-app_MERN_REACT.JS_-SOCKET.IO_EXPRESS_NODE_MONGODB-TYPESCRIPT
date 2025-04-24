class ApiError extends Error {
	error: never[];
	statusCode: Number;
	data: null;
	success: boolean;

	constructor(statusCode: Number, message: string = "Something Went Wrong", error = [], stack: string | undefined) {
		super(message);
		this.statusCode = statusCode;
		this.error = error;
		this.data = null;
		this.success = false;
		this.message = message;
		if (stack) {
			this.stack = stack;
		} else {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}

export { ApiError };