import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { appLocalizationModuleChild } from '../../core/localization/localization.module';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DragDropModule } from 'primeng/dragdrop';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToolbarModule } from 'primeng/toolbar';
import {
  BanksComponent,
  CashboxPermitComponent, ContractorComponent,
  CurrencyComponent,
  EmployeeComponent,
  FirmComponent, LocationComponent,
  NaclListComponent,
  PostComponent,
  StoreComponent,
  StructureComponent,
  CashboxComponent,
  DeviceModelComponent,
} from './components';
import {
  CreateBanksContainerComponent,
  CreateCashboxContainerComponent,
  CreateCashboxpermitactionContainerComponent, CreateCashboxpermitContainerComponent,
  CreateCurrencyContainerComponent,
  CreateDefaultContainerComponent,
  CreateEmployeeContainerComponent,
  CreateFirmContainerComponent,
  CreateFirmgroupContainerComponent,
  CreateLocationContainerComponent,
  CreatePostContainerComponent,
  CreateStoreContainerComponent,
  CreateStoreframeContainerComponent,
  CreateStructureContainerComponent,
  CreateUnitContainerComponent,
  CreateDeviceContainerComponent,
} from './CUD-containers/create-containers';
import {
  UpdateBanksContainerComponent,
  UpdateCashboxContainerComponent,
  UpdateCashboxPermitActionContainerComponent,
  UpdateCashboxPermitContainerComponent,
  UpdateCurrencyContainerComponent,
  UpdateDefaultContainerComponent,
  UpdateEmployeeContainerComponent,
  UpdatePostContainerComponent,
  UpdateStoreContainerComponent,
  UpdateUnitContainerComponent,
  UpdateFirmGroupContainerComponent,
  UpdateStructureContainerComponent,
  UpdateDeviceContainerComponent
} from './CUD-containers/update-containers';
import { DeleteDefaultContainerComponent } from './CUD-containers/delete-containers/delete-default-container/delete-default-container.component';
import { DataFormatPipe } from './pipes/data-format/data-format.pipe';
import { DatePickerSettingsWithLocalePipe } from './pipes/date-picker-settings-with-locale/date-picker-settings-with-locale.pipe';
import { CreateFormownContainerComponent } from './CUD-containers/create-containers/create-formown-container/create-formown-container.component';
import { UpdateFormownContainerComponent } from './CUD-containers/update-containers/update-formown-container/update-formown-container.component';
import { CreateGrouppriceContainerComponent } from './CUD-containers/create-containers/create-groupprice-container/create-groupprice-container.component';
import { CreateProductbarContainerComponent } from './CUD-containers/create-containers/create-productbar-container/create-productbar-container.component';
import { CreateDevicemodelContainerComponent } from './CUD-containers/create-containers/create-devicemodel-container/create-devicemodel-container.component';
import { UpdateDevicemodelContainerComponent } from './CUD-containers/update-containers/update-devicemodel-container/update-devicemodel-container.component';
import { CreateSubstanceContainerComponent } from './CUD-containers/create-containers/create-substance-container/create-substance-container.component';
import { UpdateSubstanceContainerComponent } from './CUD-containers/update-containers/update-substance-container/update-substance-container.component';
import { UpdateSymptomContainerComponent } from './CUD-containers/update-containers/update-symptom-container/update-symptom-container.component';
import { CreateSymptomContainerComponent } from './CUD-containers/create-containers/create-symptom-container/create-symptom-container.component';
import { CreateFormfactoryContainerComponent } from './CUD-containers/create-containers/create-formfactory-container/create-formfactory-container.component';
import { UpdateFormfactoryContainerComponent } from './CUD-containers/update-containers/update-formfactory-container/update-formfactory-container.component';
import { CreateTaxrateContainerComponent } from './CUD-containers/create-containers/create-taxrate-container/create-taxrate-container.component';
import {TaxRateComponent} from './components/tax-rate/tax-rate.component';
import { UpdateTaxrateContainerComponent } from './CUD-containers/update-containers/update-taxrate-container/update-taxrate-container.component';




@NgModule({
  declarations: [
    CreateDefaultContainerComponent,
    UpdateDefaultContainerComponent,
    DeleteDefaultContainerComponent,
    BanksComponent,
    ContractorComponent,
    CurrencyComponent,
    EmployeeComponent,
    LocationComponent,
    NaclListComponent,
    PostComponent,
    StoreComponent,
    FirmComponent,
    StructureComponent,
    CashboxComponent,
    DeviceModelComponent,
    DataFormatPipe,
    CreateStoreContainerComponent,
    CreateBanksContainerComponent,
    CreateUnitContainerComponent,
    CreateCashboxContainerComponent,
    CreatePostContainerComponent,
    CreateLocationContainerComponent,
    CreateCurrencyContainerComponent,
    CreateCashboxpermitContainerComponent,
    CreateEmployeeContainerComponent,
    UpdateBanksContainerComponent,
    CreateFirmContainerComponent,
    CreateCashboxpermitactionContainerComponent,
    UpdateBanksContainerComponent,
    UpdateUnitContainerComponent,
    UpdateCurrencyContainerComponent,
    CashboxPermitComponent,

    UpdateStoreContainerComponent,

    CreateFirmgroupContainerComponent,
    CreateStructureContainerComponent,
    CreateStoreframeContainerComponent,

    UpdateStoreContainerComponent,
    UpdateCashboxContainerComponent,
    UpdateCashboxPermitContainerComponent,
    UpdateEmployeeContainerComponent,
    UpdateCashboxPermitActionContainerComponent,
    UpdatePostContainerComponent,
    DatePickerSettingsWithLocalePipe,
    UpdateFirmGroupContainerComponent,
    UpdateStructureContainerComponent,
    CreateDeviceContainerComponent,
    UpdateDeviceContainerComponent,
    CreateFormownContainerComponent,
    UpdateFormownContainerComponent,
    CreateGrouppriceContainerComponent,
    CreateProductbarContainerComponent,
    CreateDevicemodelContainerComponent,
    UpdateDevicemodelContainerComponent,
    CreateSubstanceContainerComponent,
    UpdateSubstanceContainerComponent,
    UpdateSymptomContainerComponent,
    CreateSymptomContainerComponent,
    CreateFormfactoryContainerComponent,
    UpdateFormfactoryContainerComponent,
    CreateTaxrateContainerComponent,
    TaxRateComponent,
    UpdateTaxrateContainerComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TabViewModule,
    CardModule,
    InputTextareaModule,
    ButtonModule,
    SidebarModule,
    TableModule,
    CheckboxModule,
    CalendarModule,
    ToolbarModule,
    DropdownModule,
    DialogModule,
    InputTextModule,
    DragDropModule,
    ProgressSpinnerModule,
    appLocalizationModuleChild
  ],
  exports: [
    BanksComponent,
    ContractorComponent,
    CurrencyComponent,
    EmployeeComponent,
    LocationComponent,
    NaclListComponent,
    PostComponent,
    StoreComponent,
    FirmComponent,
    StructureComponent,
    TaxRateComponent
  ],
  providers: []
})
export class CudDataTableModule { }
