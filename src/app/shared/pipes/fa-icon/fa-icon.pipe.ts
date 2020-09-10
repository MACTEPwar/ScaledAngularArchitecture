import {
  IconDefinition,
  findIconDefinition,
  IconPrefix,
  IconName,
  library,
} from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/pro-solid-svg-icons';
import { far } from '@fortawesome/pro-regular-svg-icons';
import { fal } from '@fortawesome/pro-light-svg-icons';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'faIcon'
})
export class FaIconPipe implements PipeTransform {

  transform(iconName: string, prefix: string = 'fas'): IconDefinition {
    library.add(fas, far, fal);
    const tempFind = findIconDefinition({
      prefix: prefix as IconPrefix,
      iconName: iconName as IconName,
    });
    return tempFind ?? null;
  }

}
