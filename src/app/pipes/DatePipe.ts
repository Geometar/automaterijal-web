import { Pipe, PipeTransform } from '@angular/core';
import { mesec } from '../model/konstante';

@Pipe({ name: 'datum' })
export class DatePipe implements PipeTransform {
    transform(value: string): string {
        if (!value) {
            value = 'N/A';
        } else {
            const datumNiz = value.split('-');
            datumNiz[1] = mesec['mesec_' + datumNiz[1]];
            value = datumNiz[0] + '-' +  datumNiz[1] + '-' + datumNiz[2] + ' ' + datumNiz[3];
        }
        return value;
    }
}
