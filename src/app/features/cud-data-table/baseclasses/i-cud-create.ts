import { FormGroup } from '@angular/forms';
import { ViewContainerRef, ElementRef } from '@angular/core';

export interface ICudCreate {
    profileForm: FormGroup;
    bottomSidebarDialog: ViewContainerRef;
    bottomSidebarDialogElement: ElementRef;
}
