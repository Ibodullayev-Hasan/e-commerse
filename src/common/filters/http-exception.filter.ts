import { ExceptionFilter, Catch, ArgumentsHost, HttpException, NotFoundException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();
		const request = ctx.getRequest();
		const status = exception.getStatus();
		const exceptionResponse = exception.getResponse();

		const isDev = process.env.NODE_ENV === 'development';

		const isRouteNotFound = exception instanceof NotFoundException === false && status === 404;

		const messages: Record<number, string> = {
			405: `${request.method} metodi bu route da ruxsat etilmagan`,
		};

		const message = isRouteNotFound
			? "Mavjud bo'lmagan route"
			: messages[status] ?? (
				typeof exceptionResponse === 'object'
					? (exceptionResponse as any).message ?? "Resurs topilmadi"
					: exceptionResponse
			);

		response.status(status).json({
			statusCode: status,
			message,
			path: request.url,
			method: request.method,
			timestamp: new Date().toISOString(),
			...(isDev && { stack: exception.stack }),
		});
	}
}