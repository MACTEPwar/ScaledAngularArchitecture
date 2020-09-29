import { FormGroup } from '@angular/forms';
import { ViewContainerRef, ElementRef } from '@angular/core';

export interface ICudUpdate {
    profileForm: FormGroup;
    bottomSidebarDialog: ViewContainerRef;
    bottomSidebarDialogElement: ElementRef;
    result2Form: (result: any) => void;
}
