import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm, useSelect } from "@refinedev/mantine";
import { Select, TextInput } from "@mantine/core";
import { User } from "~/server/api/routers/user";

export const UserEdit: React.FC<IResourceComponentsProps> = () => {
  const {
    getInputProps,
    saveButtonProps,
    setFieldValue,
    refineCore: { queryResult },
  } = useForm<User>({
    initialValues: { contractId: "", id: "", createdAt: "", updatedAt: "" },
  });

  const userData = queryResult?.data?.data;

  const { selectProps: contractSelectProps } = useSelect({
    resource: "contract",
    defaultValue: userData?.contractId,
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      {JSON.stringify(contractSelectProps)}
      <Select
        mt="sm"
        label="Contract"
        {...getInputProps("contractId")}
        {...contractSelectProps}
        filter={() => true}
        // eslint-disable-next-line
        data={contractSelectProps.data.map((elem: any) => ({
          // eslint-disable-next-line
          ...elem,
          // eslint-disable-next-line
          label: elem.value,
        }))}
      />
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
