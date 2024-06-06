import { Group, Text, Breadcrumbs, Anchor } from "@mantine/core";

type AppBreadcrumbProps = {
  items: AppBreadcrumbsItem[];
};

export default function AppBreadcrumb({ items }: AppBreadcrumbProps) {
  const breadcrumbsItems = items.map(
    (item: AppBreadcrumbsItem, index: number) => (
      <Group key={`${index * 1}`} my={8}>
        {items.length === index + 1 ? (
          <Text size="sm">{item.title}</Text>
        ) : (
          <Anchor
            href={item.href}
            style={{ fontSize: "14px", textDecoration: "none" }}
          >
            {item.title}
          </Anchor>
        )}
      </Group>
    )
  );

  return <Breadcrumbs>{breadcrumbsItems}</Breadcrumbs>;
}
