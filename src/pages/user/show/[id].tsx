import { IResourceComponentsProps, useShow, useOne } from "@refinedev/core";
import { Show, TextField, DateField } from "@refinedev/mantine";
import { Title } from "@mantine/core";

export const UserShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: contractData, isLoading: contractIsLoading } = useOne({
    resource: "contract",
    /* eslint-disable-next-line */
    id: record?.contractId || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Title my="xs" order={5}>
        Contract
      </Title>
      {contractIsLoading ? <>Loading...</> : <>{contractData?.data.id}</>}
      <Title my="xs" order={5}>
        Id
      </Title>
      <TextField value={record?.id} />
      <Title my="xs" order={5}>
        Created At
      </Title>
      <DateField value={record?.createdAt as string} />
      <Title my="xs" order={5}>
        Updated At
      </Title>
      <DateField value={record?.updatedAt as string} />
    </Show>
  );
};

export default UserShow;
