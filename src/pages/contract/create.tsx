import { IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm } from "@refinedev/mantine";
import { TextInput, NumberInput } from "@mantine/core";

export const ContractCreate: React.FC<IResourceComponentsProps> = () => {
  const {
    getInputProps,
    saveButtonProps,
    setFieldValue,
    refineCore: { formLoading },
  } = useForm({
    initialValues: {
      userRepresentativeName: "",
      userRepresentativeEmail: "",
      openAIAccountEmail: "",
      openAIAccountBillingURL: "",
      openAIAccountPassword: "",
      openAIApiKey: "",
      monthlyBillingLimit: "",
      createdAt: "",
      updatedAt: "",
    },
  });

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <TextInput
        mt="sm"
        label="User Representative Name"
        {...getInputProps("userRepresentativeName")}
      />
      <TextInput
        mt="sm"
        label="User Representative Email"
        {...getInputProps("userRepresentativeEmail")}
      />
      <TextInput
        mt="sm"
        label="Open AIAccount Email"
        {...getInputProps("openAIAccountEmail")}
      />
      <TextInput
        mt="sm"
        label="Open AIAccount Billing URL"
        {...getInputProps("openAIAccountBillingURL")}
      />
      <TextInput
        mt="sm"
        label="Open AIAccount Password"
        {...getInputProps("openAIAccountPassword")}
      />
      <TextInput
        mt="sm"
        label="Open AIApi Key"
        {...getInputProps("openAIApiKey")}
      />
      <NumberInput
        mt="sm"
        label="Monthly Billing Limit"
        {...getInputProps("monthlyBillingLimit")}
      />
      {/* 
                    DatePicker component is not included in "@refinedev/mantine" package.
                    To use a <DatePicker> component, you can follow the official documentation for Mantine.
                    
                    Docs: https://mantine.dev/dates/date-picker/
                */}
      <TextInput mt="sm" label="Created At" {...getInputProps("createdAt")} />
      {/* 
                    DatePicker component is not included in "@refinedev/mantine" package.
                    To use a <DatePicker> component, you can follow the official documentation for Mantine.
                    
                    Docs: https://mantine.dev/dates/date-picker/
                */}
      <TextInput mt="sm" label="Updated At" {...getInputProps("updatedAt")} />
    </Create>
  );
};

export default ContractCreate;
