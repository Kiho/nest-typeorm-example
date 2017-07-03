import { PipeTransform, Pipe, ArgumentMetadata } from '@nestjs/common';
import { HttpException } from '@nestjs/core';

@Pipe()
export class ValidatorPipe implements PipeTransform {
    public async transform(value, metadata: ArgumentMetadata) {
        return value;
    }
}