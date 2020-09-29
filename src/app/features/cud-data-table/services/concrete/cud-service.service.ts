import { Injectable, Type } from '@angular/core';
import {
  CreateBanksContainerComponent,
  CreateCashboxContainerComponent,
  CreateCashboxpermitactionContainerComponent,
  CreateCashboxpermitContainerComponent,
  CreateCurrencyContainerComponent,
  CreateDefaultContainerComponent,
  CreateDeviceContainerComponent,
  CreateEmployeeContainerComponent,
  CreateFirmContainerComponent,
  CreateFirmgroupContainerComponent,
  CreateLocationContainerComponent,
  CreatePostContainerComponent,
  CreateStoreContainerComponent,
  CreateStoreframeContainerComponent,
  CreateStructureContainerComponent, CreateTaxrateContainerComponent,
  CreateUnitContainerComponent
} from '../../CUD-containers/create-containers';
import { DeleteDefaultContainerComponent } from '../../CUD-containers/delete-containers/delete-default-container/delete-default-container.component';
import {
  UpdateBanksContainerComponent,
  UpdateCashboxContainerComponent,
  UpdateCashboxPermitActionContainerComponent,
  UpdateCashboxPermitContainerComponent,
  UpdateCurrencyContainerComponent,
  UpdateDefaultContainerComponent,
  UpdateDeviceContainerComponent,
  UpdateEmployeeContainerComponent,
  UpdateFirmGroupContainerComponent,
  UpdatePostContainerComponent,
  UpdateStoreContainerComponent,
  UpdateStructureContainerComponent,
  UpdateUnitContainerComponent
} from '../../CUD-containers/update-containers';
import {CreateFormownContainerComponent} from '../../CUD-containers/create-containers/create-formown-container/create-formown-container.component';
import {UpdateFormownContainerComponent} from '../../CUD-containers/update-containers/update-formown-container/update-formown-container.component';
import {CreateGrouppriceContainerComponent} from '../../CUD-containers/create-containers/create-groupprice-container/create-groupprice-container.component';
import {CreateProductbarContainerComponent} from '../../CUD-containers/create-containers/create-productbar-container/create-productbar-container.component';
import {CreateDevicemodelContainerComponent} from '../../CUD-containers/create-containers/create-devicemodel-container/create-devicemodel-container.component';
import {UpdateDevicemodelContainerComponent} from '../../CUD-containers/update-containers/update-devicemodel-container/update-devicemodel-container.component';
import {CreateSubstanceContainerComponent} from '../../CUD-containers/create-containers/create-substance-container/create-substance-container.component';
import {UpdateSubstanceContainerComponent} from '../../CUD-containers/update-containers/update-substance-container/update-substance-container.component';
import {CreateSymptomContainerComponent} from '../../CUD-containers/create-containers/create-symptom-container/create-symptom-container.component';
import {UpdateSymptomContainerComponent} from '../../CUD-containers/update-containers/update-symptom-container/update-symptom-container.component';
import {CreateFormfactoryContainerComponent} from "../../CUD-containers/create-containers/create-formfactory-container/create-formfactory-container.component";
import {UpdateFormfactoryContainerComponent} from "../../CUD-containers/update-containers/update-formfactory-container/update-formfactory-container.component";
import {UpdateTaxrateContainerComponent} from "../../CUD-containers/update-containers/update-taxrate-container/update-taxrate-container.component";

@Injectable({
  providedIn: 'root'
})
export class CUDService {

  table: TableElement[] = [
    new TableElement('bank', CreateBanksContainerComponent, eMode.CREATE),
    new TableElement('bank', UpdateBanksContainerComponent, eMode.UPDATE),
    new TableElement('store', CreateStoreContainerComponent, eMode.CREATE),
    new TableElement('store', UpdateStoreContainerComponent, eMode.UPDATE),
    new TableElement('unit', CreateUnitContainerComponent, eMode.CREATE),
    new TableElement('unit', UpdateUnitContainerComponent, eMode.UPDATE),
    new TableElement('post', CreatePostContainerComponent, eMode.CREATE),
    new TableElement('post', UpdatePostContainerComponent, eMode.UPDATE),
    new TableElement('location', CreateLocationContainerComponent, eMode.CREATE),
    new TableElement('currency', CreateCurrencyContainerComponent, eMode.CREATE),
    new TableElement('currency', UpdateCurrencyContainerComponent, eMode.UPDATE),
    new TableElement('employee', CreateEmployeeContainerComponent, eMode.CREATE),
    new TableElement('employee', UpdateEmployeeContainerComponent, eMode.UPDATE),
    new TableElement('firm', CreateFirmContainerComponent, eMode.CREATE),
    new TableElement('firmgroup', CreateFirmgroupContainerComponent, eMode.CREATE),
    new TableElement('firmgroup', UpdateFirmGroupContainerComponent, eMode.UPDATE),
    new TableElement('structure', CreateStructureContainerComponent, eMode.CREATE),
    new TableElement('structure', UpdateStructureContainerComponent, eMode.UPDATE),
    new TableElement('storeframe', CreateStoreframeContainerComponent, eMode.CREATE),
    new TableElement('cashbox', CreateCashboxContainerComponent, eMode.CREATE),
    new TableElement('cashbox', UpdateCashboxContainerComponent, eMode.UPDATE),
    new TableElement('cashboxpermit', CreateCashboxpermitContainerComponent, eMode.CREATE),
    new TableElement('cashboxpermit', UpdateCashboxPermitContainerComponent, eMode.UPDATE),
    new TableElement('cashboxpermitaction', CreateCashboxpermitactionContainerComponent, eMode.CREATE),
    new TableElement('cashboxpermitaction', UpdateCashboxPermitActionContainerComponent, eMode.UPDATE),
    new TableElement('device', CreateDeviceContainerComponent, eMode.CREATE),
    new TableElement('device', UpdateDeviceContainerComponent, eMode.UPDATE),
    new TableElement('formown', CreateFormownContainerComponent, eMode.CREATE),
    new TableElement('formown', UpdateFormownContainerComponent, eMode.UPDATE),
    new TableElement('groupprice', CreateGrouppriceContainerComponent, eMode.CREATE),
    new TableElement('productbar', CreateProductbarContainerComponent, eMode.CREATE), // TODO убрать таблицу в товар
    new TableElement('devicemodel', CreateDevicemodelContainerComponent, eMode.CREATE),
    new TableElement('devicemodel', UpdateDevicemodelContainerComponent, eMode.UPDATE),
    new TableElement('substance', CreateSubstanceContainerComponent, eMode.CREATE),
    new TableElement('substance', UpdateSubstanceContainerComponent, eMode.UPDATE),
    new TableElement('symptom', CreateSymptomContainerComponent, eMode.CREATE),
    new TableElement('symptom', UpdateSymptomContainerComponent, eMode.UPDATE),
    new TableElement('formfactory', CreateFormfactoryContainerComponent, eMode.CREATE),
    new TableElement('formfactory', UpdateFormfactoryContainerComponent, eMode.UPDATE),
    new TableElement('taxrate', CreateTaxrateContainerComponent, eMode.CREATE),
    new TableElement('taxrate', UpdateTaxrateContainerComponent, eMode.UPDATE),
  ];

  constructor() { }

  getCreateTypeModal(routeName: string): Type<any> {
    return this.table?.filter(f => f.name === routeName && f.mode === eMode.CREATE)[0]?.type ?? CreateDefaultContainerComponent;
  }

  getUpdateTypeModal(routeName: string): Type<any> {
    return this.table?.filter(f => f.name === routeName && f.mode === eMode.UPDATE)[0]?.type ?? UpdateDefaultContainerComponent;
  }

  getDeleteTypeModal(routeName: string): Type<any> {
    return this.table?.filter(f => f.name === routeName && f.mode === eMode.DELETE)[0]?.type ?? DeleteDefaultContainerComponent;
  }
}

class TableElement {
  name: string;
  type: Type<any>;
  mode: eMode;

  constructor(name, type, mode) {
    this.name = name;
    this.type = type;
    this.mode = mode;
  }
}

export enum eMode {
  CREATE,
  UPDATE,
  DELETE
}
