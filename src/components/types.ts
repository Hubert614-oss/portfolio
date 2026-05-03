import type { ReactElement } from 'react'

export type ServiceItem = {
  id: number
  title: string
  description: string
  Icon: () => ReactElement
}