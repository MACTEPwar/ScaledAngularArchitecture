import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { ITab } from '../interface/i-tab';

export class Tab implements ITab{
  name: string;
  image?: IconDefinition;
  url: string;
  canClose: boolean;
  active: boolean;
}
