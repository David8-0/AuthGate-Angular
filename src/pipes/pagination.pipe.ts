import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../interfaces/user';

@Pipe({
  name: 'pagination',
  standalone: true
})
export class PaginationPipe implements PipeTransform {

  transform(users: User[],pageSize:number,pageNumber:number): User[] {
    const startIndex = pageSize*(pageNumber-1);  //4
    const endIndex = startIndex+pageSize-1; //5
    return users.slice(startIndex,endIndex+1);
  }

}
