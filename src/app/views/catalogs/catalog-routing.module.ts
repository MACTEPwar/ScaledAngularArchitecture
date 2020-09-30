import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { LocationComponent } from '../../features/data-table/components/location/location.component';
import { BanksComponent } from '@features/data-table/components/banks/banks.component';
import { StoreComponent } from '@features/data-table/components/store/store.component';
import { CurrencyComponent } from '@features/data-table/components/currency/currency.component';
import { ContractorComponent } from '@features/data-table/components/contractor/contractor.component';
import { EmployeeComponent } from '@features/data-table/components/employee/employee.component';
import { PostComponent } from '@features/data-table/components/post/post.component';
import { NaclListComponent } from '@features/data-table/components/naclList/naclList.component';
import { UnitComponent } from '@features/data-table/components/unit/unit.component';
import { StoreFrameComponent } from '@features/data-table/components/storeFrame/storeFrame.component';
import { CashboxComponent } from '@features/data-table/components/cashbox/cashbox.component';
import { CashboxPermitComponent } from '@features/data-table/components/cashboxPermit/cashboxPermit.component';
import { CashboxPermitActionComponent } from '@features/data-table/components/cashboxPermitAction/cashboxPermitAction.component';
import { FirmComponent } from '@features/data-table/components/firm/firm.component';
import { StructureComponent } from '@features/data-table/components/structure/structure.component';
import { FirmGroupComponent } from '@features/data-table/components/firmGroup/firmGroup.component';
import { FirmAccauntComponent } from '@features/data-table/components/firmAccount/firmAccount.component';
import { FirmEmployeeComponent } from '@features/data-table/components/firmEmployee/firmEmployee.component';
import { FirmSettingComponent } from '@features/data-table/components/firmSetting/firmSetting.component';
import { DeviceComponent } from '@features/data-table/components/device/device.component';
import { DeviceModelComponent } from '@features/data-table/components/deviceModel/deviceModel.component';
import { FormFactoryComponent } from '@features/data-table/components/formFactory/formFactory.component';
import { FormOwnComponent } from '@features/data-table/components/formOwn/formOwn.component';
import { ProductBarComponent } from '@features/data-table/components/product-bar/product-bar.component';
import { ProductBrandComponent } from '@features/data-table/components/product-brand/product-brand.component';
import { ProductCategoryComponent } from '@features/data-table/components/product-category/product-category.component';
import { ProductGroupComponent } from '@features/data-table/components/product-group/product-group.component';
import { ProductKindComponent } from '@features/data-table/components/product-kind/product-kind.component';
import { ProductSubstanceComponent } from '@features/data-table/components/product-substance/product-substance.component';
import { ProductSymptomComponent } from '@features/data-table/components/product-symptom/product-symptom.component';
import { ProductTransformComponent } from '@features/data-table/components/product-transform/product-transform.component';
import { StoreConditionComponent } from '@features/data-table/components/store-condition/store-condition.component';
import { SubstanceComponent } from '@features/data-table/components/substance/substance.component';
import { SymptomComponent } from '@features/data-table/components/symptom/symptom.component';
import { GroupPriceComponent } from '@features/data-table/components/group-price/group-price.component';
import { TaxRateComponent } from '@features/data-table/components/tax-rate/tax-rate.component';
import { CreateFirmComponent } from '@features/data-table/components/create-firm/create-firm.component';

const routes: Routes = [
    {
        path: '', component: CatalogComponent, children: [
            { path: 'banks', component: BanksComponent },
            { path: 'store', component: StoreComponent },
            { path: 'currency', component: CurrencyComponent },
            { path: 'location', component: LocationComponent },
            { path: 'contractor', component: ContractorComponent }, // ? нету в роутах
            { path: 'employee', component: EmployeeComponent },
            { path: 'posts', component: PostComponent },
            { path: 'nacllist', component: NaclListComponent }, // ? нету в роутах

            { path: 'unit', component: UnitComponent },
            { path: 'storeframe', component: StoreFrameComponent },
            { path: 'cashbox', component: CashboxComponent },
            { path: 'cashboxpermit', component: CashboxPermitComponent },
            { path: 'cashboxpermitaction', component: CashboxPermitActionComponent },
            { path: 'firm', component: FirmComponent },
            { path: 'structure', component: StructureComponent },
            { path: 'firmgroup', component: FirmGroupComponent },

            { path: 'firmaccount', component: FirmAccauntComponent },
            { path: 'firmemployee', component: FirmEmployeeComponent }, // ? нету в роутах
            { path: 'firmsetting', component: FirmSettingComponent }, // ? нету в роутах
            { path: 'device', component: DeviceComponent },
            { path: 'devicemodel', component: DeviceModelComponent },
            { path: 'formfactory', component: FormFactoryComponent }, // ? нету в роутах
            { path: 'formown', component: FormOwnComponent },

            { path: 'productbar', component: ProductBarComponent },
            { path: 'productbrand', component: ProductBrandComponent }, // ? нету в роутах
            { path: 'productcategory', component: ProductCategoryComponent }, // ? нету в роутах
            { path: 'productgroup', component: ProductGroupComponent },
            { path: 'productkind', component: ProductKindComponent }, // ? нету в роутах
            { path: 'productsubstance', component: ProductSubstanceComponent }, // ? нету в роутах
            { path: 'productsymptom', component: ProductSymptomComponent }, // ? нету в роутах
            { path: 'producttransform', component: ProductTransformComponent }, // ? нету в роутах
            { path: 'storecondition', component: StoreConditionComponent }, // ? нету в роутах
            { path: 'substance', component: SubstanceComponent }, // ? нету в роутах
            { path: 'symptom', component: SymptomComponent }, // ? нету в роутах
            { path: 'groupprice', component: GroupPriceComponent },
            { path: 'taxrate', component: TaxRateComponent },

            { path: 'firm/create', component: CreateFirmComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CatalogRoutingModule { }
