import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'times',
  standalone: true
})
export class TimesPipe implements PipeTransform {

  transform(value: number): any {
    const iterable = <Iterable<any>> {};
    iterable[Symbol.iterator] = function* () {
      let n = 0;
      while (n < value) {
        yield ++n;
      }
    };
    return iterable;
  }

}
