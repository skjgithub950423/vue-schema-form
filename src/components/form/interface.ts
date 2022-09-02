export interface IFormItemProps {
    rules: any[]
    [propsName:string]: any
}

export type FieldType = 'text' | 'number' | 'select' | 'radio' | 'checkbox' | 'cascader' | 'switch' | 'slider' | 'time' | 'date' | 'datetime' | 'upload' | 'rate' | 'dependency'