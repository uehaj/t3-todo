import { IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm, useSelect } from "@refinedev/mantine";
import { Select, TextInput } from "@mantine/core";
import { MantineInferencer } from "@refinedev/inferencer/mantine";

export const UserCreate: React.FC<IResourceComponentsProps> = () => {
  const {
    getInputProps,
    saveButtonProps,
    setFieldValue,
    refineCore: { formLoading },
  } = useForm({
    initialValues: { contractId: "", createdAt: "", updatedAt: "" },
  });

  const { selectProps: contractSelectProps } = useSelect({
    resource: "contract",
  });

  return (
    <>
      <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
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
    </>
  );
};

export default UserCreate;
