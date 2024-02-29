import { RoutePaths } from '@/router/routes'
import { Menu } from '@/types/menu'

export const menu: Menu = [
  {
    id: 1,
    groupTitle: 'Messages',
    items: [
      {
        id: 1,
        title: 'Inbox',
        icon: '/img/icons/inbox.svg',
        link: RoutePaths.Inbox,
      },
      {
        id: 2,
        title: 'Outbound',
        icon: '/img/icons/outbound.svg',
        link: RoutePaths.Outbound,
      },
      {
        id: 3,
        title: 'Contacts',
        icon: '/img/icons/contacts.svg',
        link: RoutePaths.Contacts,
      },
      {
        id: 4,
        title: 'Statistic',
        icon: '/img/icons/statistic.svg',
        link: RoutePaths.Statistic,
      },
    ],
  },
  {
    id: 2,
    groupTitle: 'Tools',
    items: [
      {
        id: 1,
        title: 'Chat editor',
        icon: '/img/icons/chat-editor.svg',
        link: RoutePaths.ChatEditor,
      },
      {
        id: 2,
        title: 'Automation',
        icon: '/img/icons/automation.svg',
        link: RoutePaths.Automation,
      },
      {
        id: 3,
        title: 'Site tools',
        icon: '/img/icons/site-tools.svg',
        link: RoutePaths.SiteTools,
      },
    ],
  },
  {
    id: 3,
    groupTitle: 'Settings',
    items: [
      {
        id: 1,
        title: 'General',
        icon: '/img/icons/general.svg',
        link: RoutePaths.Settings,
      },
      {
        id: 2,
        title: 'Account',
        icon: '/img/icons/account.svg',
        link: RoutePaths.Profile,
      },
      {
        id: 3,
        title: 'Billing',
        icon: '/img/icons/billing.svg',
        link: RoutePaths.Billing,
      },
    ],
  },
]
