import { PipeTransform, Pipe } from '@angular/core';
import { transformator } from '../model/konstante';

@Pipe({ name: 'translate' })
export class TranslatePipe implements PipeTransform {
    transform(value: string): string {
        return transformator[value];
    }
}
