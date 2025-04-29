import { Response } from "express";

interface HandleResponse {
  res: Response;
  message?: string;
  statusCode: number;
  body?: any
}

export class ResponseHandling {
  static handleResponse({ res, message, statusCode, body }: HandleResponse) {
    let defaultMessage = "An error occurred";
    switch (statusCode) {
      case 200:
      case 201:
        defaultMessage = "Request succeeded.";
        break;
      case 400:
        defaultMessage = "Bad request. Please check your input.";
        break;
      case 401:
        defaultMessage = "Unauthorized. Authentication is required.";
        break;
      case 403:
        defaultMessage = "Forbidden. You don't have access.";
        break;
      case 404:
        defaultMessage = "Resource not found.";
        break;
      case 500:
        defaultMessage = "Internal server error. Please try again later.";
        break;
      default:
        defaultMessage = "An unknown error occurred.";
    }

    res.status(statusCode).json({
      success: statusCode >= 200 && statusCode < 300,
      message: message || defaultMessage,
      body: body
    });
  }
}
