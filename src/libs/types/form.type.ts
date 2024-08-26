export enum FormConstraint {
  Required = 'required',
  Each = 'each',
}

export type FormFieldSchema = {
  [key in Partial<FormConstraint>]?:
    | Partial<FormFieldSchema>
    | { [key: string]: Partial<FormFieldSchema> }
    | boolean
    | (() => boolean);
};

export type FormFieldError = {
  [key in Partial<FormConstraint>]?: Partial<FormFieldSchema> | string;
};

export type FormArrayElError = {
  [key: number]: FormError;
};

export type FormSchemaValidation = {
  [key: string]: FormFieldSchema | FormSchemaValidation;
};

export type FormError = {
  [key: string]: FormFieldError | FormError | FormArrayElError | undefined;
};
