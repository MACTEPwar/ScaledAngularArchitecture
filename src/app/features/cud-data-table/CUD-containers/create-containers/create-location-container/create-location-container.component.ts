import { AfterViewInit, Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CudCreateBase } from '../../../baseclasses/cud-create-base';
import { ICudCreate } from '../../../baseclasses/i-cud-create';
import { LocationComponent } from '../../../components/location/location.component';
import { StructureComponent } from '../../../components/structure/structure.component';

@Component({
  selector: 'al-create-location-container',
  templateUrl: './create-location-container.component.html'
})
export class CreateLocationContainerComponent extends CudCreateBase implements OnInit, AfterViewInit, ICudCreate {

  @ViewChild('bottomSidebarDialog', { read: ViewContainerRef })
  bottomSidebarDialog: ViewContainerRef;
  @ViewChild('bottomSidebarDialog')
  bottomSidebarDialogElement: ElementRef;

  @ViewChildren('keyParent', { read: ViewContainerRef })
  keyParent: any;
  @ViewChildren('displayParent', { read: ViewContainerRef })
  displayParent: any;

  @ViewChildren('keyStructure', { read: ViewContainerRef })
  keyStructure: any;
  @ViewChildren('displayStructure', { read: ViewContainerRef })
  displayStructure: any;

  profileForm = new FormGroup({
    ParentId: new FormControl('', [Validators.required]),
    Type: new FormControl('', Validators.required),
    Code: new FormControl('', [Validators.minLength(0), Validators.maxLength(10)]),
    Name: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(10)]),
    Latitude: new FormControl('', ),
    Longitude: new FormControl('', ),
    Elevation: new FormControl('', ),
  });

  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    translateService: TranslateService,
  ) {
    super(componentFactoryResolver, translateService, ['Type']);
  }

  ngAfterViewInit(): void {
    this.keyParent.changes.subscribe(key => {
      this.displayParent.changes.subscribe(display => {
        this.contRef.push({
          link: 'Parent',
          fieldId: 'ParentId',
          type: LocationComponent,
          key: key.last,
          display: display.last
        });
      });
    });

    this.keyStructure.changes.subscribe(key => {
      this.displayStructure.changes.subscribe(display => {
        this.contRef.push({
          link: 'Structure',
          fieldId: 'StructureId',
          type: StructureComponent,
          key: key.last,
          display: display.last
        });
      });
    });
  }

  ngOnInit(): void {
    super.OnInitBase();
  }
}
