import { Type } from '@nestjs/common';
export declare const ApiResponsegType: <TModel extends Type<any>>(model: TModel, isArray: boolean) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
