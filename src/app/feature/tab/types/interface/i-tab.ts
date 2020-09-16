import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface ITab {
    name: string;
    image?: IconDefinition;
    url: string;
    canClose: boolean;
    active: boolean;
}