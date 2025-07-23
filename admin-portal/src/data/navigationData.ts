export interface NavigationItem {
  readonly id: string;
  readonly label: string;
  readonly icon: string;
}

export const navigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: "https://c.animaapp.com/mdgb88he08nuIz/assets/icon-2.svg"
  },
  {
    id: 'user-management',
    label: 'User Management',
    icon: "https://c.animaapp.com/mdgb88he08nuIz/assets/icon-3.svg"
  },
  {
    id: 'cook-management',
    label: 'Cook Management',
    icon: "https://c.animaapp.com/mdgb88he08nuIz/assets/icon-4.svg"
  },
  {
    id: 'order-management',
    label: 'Order Management',
    icon: "https://c.animaapp.com/mdgb88he08nuIz/assets/icon-5.svg"
  },
  {
    id: 'analytics-reports',
    label: 'Analytics & Reports',
    icon: "https://c.animaapp.com/mdgb88he08nuIz/assets/icon-6.svg"
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: "https://c.animaapp.com/mdgb88he08nuIz/assets/icon-7.svg"
  }
] as const;
