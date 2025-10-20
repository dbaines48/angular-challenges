import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'compute' })
export class ComputePipe implements PipeTransform {
  transform(person: string, index: number) {
    return `${person} - ${index}`;
  }
}
