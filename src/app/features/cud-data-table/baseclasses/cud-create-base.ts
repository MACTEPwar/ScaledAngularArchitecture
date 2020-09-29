import { ComponentFactoryResolver, ElementRef, Type, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CudItableService } from '../services/interfaces/cud-itable.service';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';
import { getDatePickerSettingsByLocale } from '../../../core/localization/date-picker-locales';

export class CudCreateBase {
    /**
     * Показать нижний сайдбар (выбор связанных данных)
     */
    public sidebarDisplay = false;

    /**
     * Текущая локаль
     */
    protected currentLocale = environment.defaultLocale;

    /**
     * контейнер модалки
     */
    protected containerRef: any;

    /**
     * Форма
     */
    protected profileForm: FormGroup;

    /**
     * Сайдбар для связанных данныйх ViewContainerRef
     */
    protected bottomSidebarDialog: ViewContainerRef;

    /**
     * Сайдбар для связанных данныйх ElementRef
     */
    protected bottomSidebarDialogElement: ElementRef;

    /**
     * Сервис
     */
    protected service: CudItableService;

    /**
     * Выполняется при обновлении элемента
     */
    protected onCreated: () => void;

    /**
     * Настройка связей
     */
    protected contRef: Array<{ link: string, fieldId: string, type: Type<any>, key: ViewContainerRef, display: ViewContainerRef }> = [];

    /**
     * Шаблон таблицы
     */
    private template: any = {};

    /**
     * Список констант
     */
    private constants: any[] = [];

    /**
     * Ошибки
     */
    private errors = [
        {
            dateType: 'System.String',
            errorType: 'required',
            errorMessage: 'Строка обязательна к заполнению',
        },
        {
            dateType: 'System.String',
            errorType: 'minLength',
            errorMessage: 'Минимальное кол-во символов больше введенного',
        },
        {
            dateType: 'System.String',
            errorType: 'maxLength',
            errorMessage: 'Превышает лимит символов',
        },
        {
            dateType: 'System.DateTime',
            errorType: 'required',
            errorMessage: 'Дата обязательна к заполнению',
        },
        {
            dateType: 'System.Int32',
            errorType: 'required',
            errorMessage: 'Строка обязательна к заполнению',
        },
        {
            dateType: 'System.Int32',
            errorType: 'number',
            errorMessage: 'Допустимы только цифры',
        },
    ];

    /**
     * Контоейнер для отображения идентификатора
     */
    private dataKeyContainer: ViewContainerRef;

    /**
     * Котейнер для отображаемых данных связанного объекта
     */
    private dataDisplayContainer: ViewContainerRef;

    /**
     * конструктор для cud-update
     * @param componentFactoryResolver componentFactoryResolver
     * @param translateService translateService
     * @param constantsFiled константы
     */
    constructor(
        protected componentFactoryResolver: ComponentFactoryResolver,
        protected translateService: TranslateService,
        protected constantsFiled: string[] = [],
    ) { }

    /**
     * Создает новый объект
     */
    public create(): void {
        if (!this.profileForm.invalid) {
            this.service.putItem(this.profileForm.value).pipe().subscribe(s => {
                this.onCreated.call(null);
            });
        }
    }

    /**
     * Вычитывает объект по id
     */
    public readById(key: string): Observable<any> {
        return this.service.getItem(key);
    }

    /**
     * Закрывает модалку
     */
    public close(): void {
        this.containerRef.clear();
    }

    /**
     * Показывает связанные данные
     * @param link ссылка
     */
    public displayLinkedData(link: string): void {
        const obj = this.contRef.filter(f => f.link === link)[0];
        this.dataKeyContainer = obj.key;
        this.dataDisplayContainer = obj.display;
        if (!obj) { return; }
        this.bottomSidebarDialog.clear();
        const tableComponent = this.componentFactoryResolver.resolveComponentFactory(obj.type);
        const tableComponentRef = this.bottomSidebarDialog.createComponent(
            tableComponent
        );

        tableComponentRef.instance.isChildren = true;

        tableComponentRef.instance.dataKeyField = this.template?.fields?.filter(f => f.data_link === link)[0]?.data_key_field;
        tableComponentRef.instance.dataDisplayField = this.template?.fields?.filter(f => f.data_link === link)[0]?.data_field;

        tableComponentRef.instance.dataKeyContainer = obj.key;
        tableComponentRef.instance.dataDisplayContainer = obj.display;
        tableComponentRef.instance.sideBarContainerRef = this.bottomSidebarDialogElement;

        tableComponentRef.instance.onSelectedElement = () => {
            this.sidebarDisplay = false;
            this.profileForm.get(obj.fieldId).setValue(this.dataKeyContainer.element.nativeElement.value);
        };

        this.sidebarDisplay = true;
    }

    /**
     * Получает текст ошибки
     * @param dateType тип данных
     * @param errorType тип ошибки
     * @returns текс ошибки
     */
    public getErrorByDateTypeAndErrortype(dateType: string, errorType: string): string {
        return this.errors.filter(
            (f) => f.dateType === dateType && f.errorType === errorType
        )[0]?.errorMessage;
    }

    /**
     * Получает шаблон определенной колонки
     * @param name имя колонки
     */
    public getFieldByName(name: string): any {
        return this.template?.fields?.filter(f => f.field === name)[0] || null;
    }

    /**
     * Проверяет, загрузился ли шаблон
     * @returns true если загрузился
     */
    public isLoaded(): boolean {
        let flag = true;
        if (!this.template?.fields) { return false; }
        this.template?.fields?.forEach(m => {
            if (!this.getFieldByName(m.field)) { flag = false; }
        });
        return flag;
    }

    /**
     * Получает константы по имени поля
     * @param name иимя колонки
     */
    public getConstantByName(name: string): any {
        const con = this.constants.filter(f => f.hasOwnProperty(name))[0];
        return con ? con[name] : [];
    }

    /**
     * OnInitBase
     */
    protected OnInitBase(): void {
        this.currentLocale = this.translateService.currentLang;
        this.loadTemplate();
    }

    /**
     * Получает настройки для датапикера с текущей локалью
     */
    public loadDatePickerSettingWithLocale(): any {
        return getDatePickerSettingsByLocale(this.currentLocale);
    }

    /**
     * Загружает шаблон таблицы
     */
    private loadTemplate(): void {
        this.service
            .getTemplate(false)
            .pipe()
            .subscribe((template) => {
                this.template = template;
                this.getConstants();
            });
    }

    /**
     * Получает константы
     */
    private getConstants(): void {
        console.log('ALL CONSTANTS -->', this.constantsFiled);
        this.constantsFiled.forEach(con => {
            const objField = this.getFieldByName(con);
            const obj: any = {};
            this.service.getConstant(objField.type).subscribe(s => {
                obj[objField.field] = s;
                this.constants.push(obj);
            });
        });
    }
}
