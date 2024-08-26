import { FormConstraint, FormSchemaValidation } from '@libs/types/form.type';

export const anamnesisFormValidator: FormSchemaValidation = {
  title: {
    [FormConstraint.Required]: true,
  },
  description: {
    [FormConstraint.Required]: true,
  },
  sections: {
    [FormConstraint.Each]: {
      id: {
        [FormConstraint.Required]: true,
      },
      name: {
        [FormConstraint.Required]: true,
      },
      questions: {
        [FormConstraint.Required]: true,
        [FormConstraint.Each]: {
          id: {
            [FormConstraint.Required]: true,
          },
          type: {
            [FormConstraint.Required]: true,
          },
          question: {
            [FormConstraint.Required]: true,
          },
        },
      },
    },
  },
};
