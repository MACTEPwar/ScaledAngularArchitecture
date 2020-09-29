import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DragDropModule } from 'primeng/dragdrop';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TreeTableModule } from 'primeng/treetable';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BreadcrumbModule } from 'primeng/breadcrumb';


import { BanksComponent } from './components/banks/banks.component';
import { ContractorComponent } from './components/contractor/contractor.component';
import { CurrencyComponent } from './components/currency/currency.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { LocationComponent } from './components/location/location.component';
import { NaclListComponent } from './components/naclList/naclList.component';
import { PostComponent } from './components/post/post.component';
import { StoreComponent } from './components/store/store.component';
import { UnitComponent } from './components/unit/unit.component';
import { StoreFrameComponent } from './components/storeFrame/storeFrame.component';
import { CashboxComponent } from './components/cashbox/cashbox.component';
import { CashboxPermitComponent } from './components/cashboxPermit/cashboxPermit.component';
import { CashboxPermitActionComponent } from './components/cashboxPermitAction/cashboxPermitAction.component';
import { FirmGroupComponent } from './components/firmGroup/firmGroup.component';
import { FirmComponent } from './components/firm/firm.component';
import { StructureComponent } from './components/structure/structure.component';
import { FirmAccauntComponent } from './components/firmAccount/firmAccount.component';
import { FirmEmployeeComponent } from './components/firmEmployee/firmEmployee.component';
import { FirmSettingComponent } from './components/firmSetting/firmSetting.component';
import { DeviceComponent } from './components/device/device.component';
import { DeviceModelComponent } from './components/deviceModel/deviceModel.component';
import { FormFactoryComponent } from './components/formFactory/formFactory.component';
import { FormOwnComponent } from './components/formOwn/formOwn.component';
import { ProductBarComponent } from './components/product-bar/product-bar.component';
import { ProductBrandComponent } from './components/product-brand/product-brand.component';
import { ProductCategoryComponent } from './components/product-category/product-category.component';
import { ProductGroupComponent } from './components/product-group/product-group.component';
import { ProductKindComponent } from './components/product-kind/product-kind.component';
import { ProductSubstanceComponent } from './components/product-substance/product-substance.component';
import { ProductSymptomComponent } from './components/product-symptom/product-symptom.component';
import { ProductTransformComponent } from './components/product-transform/product-transform.component';
import { StoreConditionComponent } from './components/store-condition/store-condition.component';
import { SubstanceComponent } from './components/substance/substance.component';
import { SymptomComponent } from './components/symptom/symptom.component';
import { GroupFirmComponent } from './components/group-firm/group-firm.component';
import { GroupPriceComponent } from './components/group-price/group-price.component';
import { NationRegulPriceComponent } from './components/nation-regul-price/nation-regul-price.component';
import { ProductComponent } from './components/product/product.component';
import { TaxRateComponent } from './components/tax-rate/tax-rate.component';

import { ParseDatePipe } from './pipes/parse-date/parse-date.pipe';
import { DataFormatPipe } from './pipes/data-format/data-format.pipe';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CudDataTableModule } from '../cud-data-table/cud-data-table.module';
import { FaIconPipe } from './pipes/fa-icon/fa-icon.pipe';
import { DeviceLinkComponent } from './components/device-link/device-link.component';
import { CreateFirmComponent } from './components/create-firm/create-firm.component';


@NgModule({
  declarations: [
    BanksComponent,
    ContractorComponent,
    CurrencyComponent,
    EmployeeComponent,
    LocationComponent,
    NaclListComponent,
    PostComponent,
    StoreComponent,
    UnitComponent,
    StoreFrameComponent,
    CashboxComponent,
    CashboxPermitComponent,
    CashboxPermitActionComponent,
    FirmGroupComponent,
    FirmComponent,
    StructureComponent,
    FirmAccauntComponent,
    FirmEmployeeComponent,
    FirmSettingComponent,
    DeviceComponent,
    DeviceModelComponent,
    FormFactoryComponent,
    FormOwnComponent,
    ProductBarComponent,
    ProductBrandComponent,
    ProductCategoryComponent,
    ProductGroupComponent,
    ProductKindComponent,
    ProductSubstanceComponent,
    ProductSymptomComponent,
    ProductTransformComponent,
    StoreConditionComponent,
    SubstanceComponent,
    SymptomComponent,
    GroupFirmComponent,
    GroupPriceComponent,
    NationRegulPriceComponent,
    ProductComponent,
    TaxRateComponent,

    ParseDatePipe,
    DataFormatPipe,
    ToolbarComponent,
    FaIconPipe,
    DeviceLinkComponent,
    CreateFirmComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    TabViewModule,
    CardModule,
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
    MultiSelectModule,
    OverlayPanelModule,
    TreeTableModule,
    AutoCompleteModule,
    BreadcrumbModule,

    CudDataTableModule,
    FontAwesomeModule
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
    UnitComponent,
    StoreFrameComponent,
    CashboxComponent,
    CashboxPermitComponent,
    CashboxPermitActionComponent,
    FirmGroupComponent,
    FirmComponent,
    StructureComponent,
    FirmAccauntComponent,
    FirmEmployeeComponent,
    FirmSettingComponent,
    DeviceComponent,
    DeviceModelComponent,
    FormFactoryComponent,
    FormOwnComponent,
    ProductBarComponent,
    ProductBrandComponent,
    ProductCategoryComponent,
    ProductGroupComponent,
    ProductKindComponent,
    ProductSubstanceComponent,
    ProductSymptomComponent,
    ProductTransformComponent,
    StoreConditionComponent,
    SubstanceComponent,
    SymptomComponent,
    GroupFirmComponent,
    GroupPriceComponent,
    NationRegulPriceComponent,
    ProductComponent,
    TaxRateComponent,
  ]
})
export class DataTableModule { }
