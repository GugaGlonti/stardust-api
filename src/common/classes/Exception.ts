import ErrorHandler from './ErrorHandler';

export class Exception {
  constructor(ENUM: string) {
    throw ErrorHandler.getException(ENUM);
  }
}
