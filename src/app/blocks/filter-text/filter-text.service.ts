import { Injectable } from '@angular/core';

@Injectable()
export class FilterService {
  constructor() { }
  
/**
 * 
 * @param data searchstring
 * @param props properties of object to filter on
 * @param originalList 
 */
  filter(data: string, props: Array<string>, originalList: Array<any>) {
    let filteredList: any[];
    if (data && props && originalList) {
      data = data.toLowerCase();
      let filtered = originalList.filter(item => {
        let match = false;
        for (let prop of props) {
          if (item[prop] && item[prop].toString().toLowerCase().indexOf(data) > -1) {
            match = true;
            break;
          }
        };
        return match;
      });
      filteredList = filtered;
    }
    else {
      filteredList = originalList;
    }
    return filteredList;
  }
}

  

