import { IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm } from "@refinedev/mantine";
import { Checkbox, TextInput } from "@mantine/core";

export const TodoCreate: React.FC<IResourceComponentsProps> = () => {
  const {
    getInputProps,
    saveButtonProps,
    setFieldValue,
    refineCore: { formLoading },
  } = useForm({
    initialValues: { done: "", text: "", createdAt: "", updatedAt: "" },
  });

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Checkbox
        mt="sm"
        label="Done"
        {...getInputProps("done", { type: "checkbox" })}
      />
      <TextInput mt="sm" label="Text" {...getInputProps("text")} />
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

export default TodoCreate;
