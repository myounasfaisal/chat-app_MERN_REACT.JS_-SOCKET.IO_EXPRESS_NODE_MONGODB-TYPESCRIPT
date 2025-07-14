class ApiError extends Error {
	statusCode: number;
	error: any[];
	data: null;
	success: boolean;
  
	constructor( message: string = "Something Went Wrong", statusCode: number, error: any[] = [], stack?: string) {
	  super(message);
	  this.statusCode = statusCode;
	  this.error = error;
	  this.data = null;
	  this.success = false;
	  if (stack) {
		this.stack = stack;
	  } else {
		Error.captureStackTrace(this, this.constructor);
	  }
	}
  }
export {ApiError}  