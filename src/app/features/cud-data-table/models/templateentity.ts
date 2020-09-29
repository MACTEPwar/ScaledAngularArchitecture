export class TemplateEntity {
    Columns: Array<TemplateEntityColumn>;

    constructor(){
        this.Columns = new Array<TemplateEntityColumn>();
    }
}

export class TemplateEntityColumn {
    ModelName: string;
    FieldName: string;
    DisplayName: string;
    ColumnSetings: ColumnSettings;
    Type?: EDataType;
    TypeResources: Array<Resource>;

    constructor(
        modelName: string = '',
        fieldName: string = '',
        displayName: string = '',
        type: EDataType = null,
        columnSettings = new ColumnSettings(),
        typeResources = new Array<Resource>())
    {
        this.ModelName = modelName;
        this.FieldName = fieldName;
        this.DisplayName = displayName;
        this.ColumnSetings = columnSettings;
        this.Type = type;
        this.TypeResources = typeResources;
    }
}

export class ColumnSettings {
    MinLength?: number;
    MaxLength?: number;
    IsRequired: boolean;
    Precission: number;
    OnlyRead: boolean;

    constructor(maxLength: number = null, onlyRead = false, minLength: number = null, precission: number = 2){
        this.MinLength = minLength;
        this.MaxLength = maxLength;
        this.IsRequired = false;
        this.Precission = precission;
        this.OnlyRead = onlyRead;
    }
}

export class Resource {
    Key: string;
    Value: string;

    constructor(key: string, value: string){
        this.Key = key;
        this.Value = value;
    }
}

export enum EDataType {
    STRING_CONTAINS = 1,
    INT_CONTAINS,
    INT_RANGE,
    DATE_EQUAL,
    DATE_RANGE,
    DATE_TIME_EQUAL,
    DATE_TIME_RANGE,
    TIME_EQUAL,
    TIME_RANGE,
    COMBO_BOX_SINGLE,
    COMBO_BOX_MANY,
    CHECKED
}
