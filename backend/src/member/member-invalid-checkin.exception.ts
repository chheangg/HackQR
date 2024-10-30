import { BadRequestException } from "@nestjs/common";

export class MemberInvalidCheckinException extends BadRequestException {
  constructor(message) {
    super(message);
  }
};