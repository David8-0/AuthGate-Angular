import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../interfaces/user';

@Pipe({
  name: 'searchUsers',
  standalone: true
})
export class SearchUsersPipe implements PipeTransform {

  transform( users: User[],str: string): User[] {
    return users.filter(user =>user.name?.toLocaleLowerCase().includes(str.toLowerCase()));
  }

}
