import { Injectable } from '@angular/core';
@Injectable()
export class DataFilterService {

    filter(dataSource: any[], filterProperties: string[], filterData: string) {

        if (dataSource && filterProperties && filterData) {

            filterData = filterData.toUpperCase();
            const filtered = dataSource.filter(item => {
                let match = false;
                for (const prop of filterProperties) {
                  const propVal = item[prop].toString().toUpperCase();
                  if (propVal.indexOf(filterData) > -1) {
                    match = true;
                    break;
                }
              }
                return match;
            });
            return filtered;
        } else {
            return dataSource;
        }
    }

}
