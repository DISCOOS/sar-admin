import { Injectable } from '@angular/core';

@Injectable()
export class FilterService {
  constructor() { }
  
/**
 * Filters on searchstring
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


/**
 * Filters on searchstring
 */
  filterMissionStatus(filterStatus: boolean, originalList: Array<any>) {
    
    // this means we want all of the missions
    if(typeof filterStatus == 'undefined') {
      return originalList;
    }
    
    let filteredList: any[];
    if (filterStatus && originalList) {
      
      let filtered = originalList.filter(item => {
        let match = false;
          if (item.isActive == filterStatus) {
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

  

