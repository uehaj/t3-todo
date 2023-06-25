import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm, useSelect } from "@refinedev/mantine";
import { Select, TextInput } from "@mantine/core";

export const UserEdit: React.FC<IResourceComponentsProps> = () => {
  const {
    getInputProps,
    saveButtonProps,
    setFieldValue,
    refineCore: { queryResult },
  } = useForm({
    initialValues: { contractId: "", id: "", createdAt: "", updatedAt: "" },
  });

  const userData = queryResult?.data?.data;

  const { selectProps: contractSelectProps } = useSelect({
    resource: "contract",
    defaultValue: userData?.contractId,
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      {
        <Select
          mt="sm"
          label="Contract"
          {...getInputProps("contractId")}
          {...contractSelectProps}
        />
      }
      <TextInput mt="sm" disabled label="Id" {...getInputProps("id")} />
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
    </Edit>
  );
};

export default UserEdit;
