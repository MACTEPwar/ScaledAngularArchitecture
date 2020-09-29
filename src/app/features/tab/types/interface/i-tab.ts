import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

/** Интерфейс для табов */
export interface ITab {
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
