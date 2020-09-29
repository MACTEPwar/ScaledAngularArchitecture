import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { ITab } from '../interface/i-tab';

/** Класс для табов */
export class Tab implements ITab {
  /** Отображаемое название */
  name: string;
  /** Картика (FontAwesome) */
  image?: IconDefinition;
  /** Ссылка, по которой будет переходить при нажатии на таб */
  url: string;
  /** Можно ли закрыть таб? */
  canClose: boolean;
  /** Активный? */
  active: boolean;
}
