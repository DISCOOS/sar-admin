import { Pipe, PipeTransform } from '@angular/core';


// Courtesy of http://youknowriad.github.io/angular2-cookbooks/pipe.html
@Pipe({
    name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
    transform(value: string, limit: string, trail: string): string {
        let intLimit;
        if(!limit) {
            intLimit = 10;
        } else {
            intLimit = parseInt(limit, 10);
        }
        if(!trail) {
            trail = '...';
        }

        return value.length > intLimit ? value.substring(0, intLimit) + trail : value;
    }
}
