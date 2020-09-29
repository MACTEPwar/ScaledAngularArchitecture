import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Stirng2FaIcon } from '../../../shared/helpers/string-2-faicon';

export class ToolbarItem {
  type: string;
  icon: string | IconDefinition;
  iconType: eIconType;
  name: string;
  id?: number;

  constructor(name: string, icon: string, iconType = eIconType.fontawesome) {
    this.name = name;
    this.iconType = iconType;
    this.icon =
      this.iconType === eIconType.fontawesome ? Stirng2FaIcon(icon) : icon;
  }
}

export enum eIconType {
  fontawesome = 1,
  href,
  prime,
}
