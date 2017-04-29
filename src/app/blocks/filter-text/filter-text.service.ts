import { Injectable } from '@angular/core';

@Injectable()
export class FilterService {
  constructor() { }
  /**
   * Filters contact by name and returns a filtered list.. 
   * @param data : title of mission to be filtered
   * @param originalList 
   */
  filter(data: string, originalList: Array<any>) {
    let filteredList: any[];
    if (data && originalList) {
      data = data.toLowerCase();
      let filtered = originalList.filter(item => {
        let match = false;
        
        if (item.title && item.title.toString().toLowerCase().indexOf(data) > -1) {
          match = true;
        }

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


/*
  filter(data: string, props: Array<string>, originalList: Array<any>) {
    let filteredList: any[];
    if (data && props && originalList) {
      data = data.toLowerCase();
      let filtered = originalList.filter(item => {
        let match = false;
        for (let prop of props) {
          if (item[prop].toString().toLowerCase().indexOf(data) > -1) {
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

*/