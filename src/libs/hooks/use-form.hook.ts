/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useCallback, useEffect, useState } from 'react';

import { FormConstraint, FormError, FormSchemaValidation } from '@libs/types/form.type';
import { getTitleCase } from '@libs/utils/string.util';

interface IParams<T> {
  initialData: T;
  validator: FormSchemaValidation;
}

const useForm = <T>({ initialData, validator }: IParams<T>) => {
  const [form, setForm] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormError>({});
  const [hasValidate, setHasValidate] = useState(false);

  const validateForm = useCallback(
    (_value: any, validator: FormSchemaValidation, formErrors: Record<string, any> = {}) => {
      if (!validator || typeof _value !== 'object') return formErrors;

      for (const field in validator) {
        const value = _value[field];
        const validation = validator[field];
        formErrors[field] = {};
        for (const key in validation) {
          const isIterator = key === FormConstraint.Each;
          if (!isIterator) {
            if (key === FormConstraint.Required)
              if (Array.isArray(value) ? value.length === 0 : !value)
                formErrors[field].required = `${getTitleCase(field)} is required!`;
              else delete formErrors[field];

            continue;
          }

          for (const index in value) {
            const subValue = value[parseInt(index)];

            if (!formErrors[field]) formErrors[field] = {};
            formErrors[field][index] = {};
            const error = validateForm(
              subValue,
              validator[field][FormConstraint.Each] as any,
              formErrors[field][index],
            );

            if (Object.keys(error || {}).length === 0) {
              delete formErrors[field][index];

              if (
                formErrors &&
                formErrors[field] &&
                Object.keys(formErrors[field] || {}).length === 0
              )
                delete formErrors[field];
            }
          }
        }
      }

      return formErrors;
    },
    [],
  );

  // Validate on change after first validate
  useEffect(() => {
    if (hasValidate) {
      const formErrors = validateForm(form, validator);
      setErrors(formErrors);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, hasValidate, validateForm]);

  const handleSubmit = useCallback(
    (onSubmit: (payload: T) => Promise<void>) => async (e: FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();
        setIsLoading(true);
        const formErrors = validateForm(form, validator);
        if (formErrors && Object.keys(formErrors).length > 0) {
          setHasValidate(true);
          setErrors(formErrors);
          return;
        }

        await onSubmit(form);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [form, validateForm, validator],
  );

  return {
    form,
    isLoading,
    errors,
    setForm,
    handleSubmit,
  };
};

export default useForm;
