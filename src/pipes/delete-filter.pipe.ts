import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../interfaces/user';

@Pipe({
  name: 'deleteFilter',
  standalone: true
})
export class DeleteFilterPipe implements PipeTransform {

  transform(users: User[],value:string): User[] {
    if(value == "not-deleted")return users.filter(user => !user.deleted);
    else if(value == "deleted")return users.filter(user => user.deleted);
    else return users;
    
  }

}
