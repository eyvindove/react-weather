import { memo } from 'react'
import { Breadcrumbs, Group, Text } from '@mantine/core'
import { NavLink } from 'react-router-dom'

import type { MantineBreadcrumbsItem } from '@src/types'

interface MantineBreadcrumbsProps {
  items: MantineBreadcrumbsItem[]
}

const MantineBreadcrumbs = memo(function MantineBreadcrumbs({
  items,
}: MantineBreadcrumbsProps) {
  const breadcrumbsItems = items.map(
    (item: MantineBreadcrumbsItem, index: number) => (
      <Group
        key={index}
        my={8}
      >
        {items.length === index + 1 ? (
          <Text size='sm'>{item.title}</Text>
        ) : (
          <NavLink
            to={item.href}
            style={{ fontSize: '14px', textDecoration: 'none' }}
          >
            {item.title}
          </NavLink>
        )}
      </Group>
    )
  )

  return (
    <>
      <Breadcrumbs>{breadcrumbsItems}</Breadcrumbs>
    </>
  )
})

export default MantineBreadcrumbs
