import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsOnlyDateString(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsOnlyDate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: 'Please provide only date like 2020-12-08',
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          const regex = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
          return typeof value === 'string' && regex.test(value);
        },
      },
    });
  };
}