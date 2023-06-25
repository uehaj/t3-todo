import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/mantine";
import { TextInput, Checkbox } from "@mantine/core";

export const TodoEdit: React.FC<IResourceComponentsProps> = () => {
  const {
    getInputProps,
    saveButtonProps,
    setFieldValue,
    refineCore: { queryResult },
  } = useForm({
    initialValues: {
      id: "",
      done: "",
      text: "",
      createdAt: "",
      updatedAt: "",
    },
  });

  const todoData = queryResult?.data?.data;

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <TextInput mt="sm" disabled label="Id" {...getInputProps("id")} />
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
    </Edit>
  );
};

export default TodoEdit;
