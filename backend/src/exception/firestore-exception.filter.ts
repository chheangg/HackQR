
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { FirebaseFirestoreError } from 'firebase-admin/lib/utils/error';

@Catch(Error)
export class FirestoreExceptionFilter implements ExceptionFilter {
  catch(exception: FirebaseFirestoreError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status: HttpStatus;
    
    switch (Number(exception.code)) {
      case 5:
        status = HttpStatus.NOT_FOUND
        response
        .status(status)
        .json({
          statusCode: status,
          timestamp: new Date().toISOString(),
          message: "Document not found"
        });
        break;
      default:
        status = HttpStatus.BAD_REQUEST;
        response
        .status(status)
        .json({
          statusCode: status,
          timestamp: new Date().toISOString(),
          message: exception.message,
        });
        break;
    }
  }
}