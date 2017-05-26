import { Pipe, PipeTransform } from '@angular/core';

import { Mission } from '../models/models';

@Pipe({ name: 'sortMissions' })
export class SortMissionsPipe implements PipeTransform {
    transform(value: Mission[], args?: any[]) {
        if (!value || !value.sort) { return value; }

        // We sort the missions by date; newest first.
        return value.sort((a: Mission, b: Mission) => {
            if (a.dateStart < b.dateStart) { return 1; }
            if (a.dateStart > b.dateStart) { return -1; }
            return 0;
        });
    }
}