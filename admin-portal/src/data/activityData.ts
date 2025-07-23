export interface ActivityItem {
  readonly id: string;
  readonly title: string;
  readonly time: string;
  readonly icon: string;
  readonly iconClass: string;
  readonly status: string;
  readonly statusClass: string;
}

export interface QuickAction {
  readonly id: string;
  readonly label: string;
  readonly icon: string;
}

export const recentActivities: ActivityItem[] = [
  {
    id: 'order-12384',
    title: 'New order #12384',
    time: '2 minutes ago',
    icon: "https://c.animaapp.com/mdgb88he08nuIz/assets/icon-19.svg",
    iconClass: "text-[oklch(0.795_0.184_86.047)] box-border h-3.5 outline-[oklab(0.708_0_0_/_0.5)] w-3.5",
    status: 'pending',
    statusClass: "text-gray-950 text-[10.5px] font-medium items-center bg-[oklch(0.95_0.0058_264.53)] box-border gap-x-[3.5px] flex shrink-0 justify-center leading-[14px] outline-[oklab(0.708_0_0_/_0.5)] gap-y-[3.5px] text-nowrap w-fit border overflow-hidden px-[7px] py-[1.75px] rounded-[6.75px] border-solid border-transparent"
  },
  {
    id: 'cook-verification',
    title: 'Cook verification approved',
    time: '5 minutes ago',
    icon: "https://c.animaapp.com/mdgb88he08nuIz/assets/icon-20.svg",
    iconClass: "text-[oklch(0.723_0.219_149.579)] box-border h-3.5 outline-[oklab(0.708_0_0_/_0.5)] w-3.5",
    status: 'success',
    statusClass: "text-[oklch(1_0_0)] text-[10.5px] font-medium items-center bg-gray-950 box-border gap-x-[3.5px] flex shrink-0 justify-center leading-[14px] outline-[oklab(0.708_0_0_/_0.5)] gap-y-[3.5px] text-nowrap w-fit border overflow-hidden px-[7px] py-[1.75px] rounded-[6.75px] border-solid border-transparent"
  },
  {
    id: 'payment-dispute',
    title: 'Payment dispute resolved',
    time: '12 minutes ago',
    icon: "https://c.animaapp.com/mdgb88he08nuIz/assets/icon-21.svg",
    iconClass: "text-[oklch(0.705_0.213_47.604)] box-border h-3.5 outline-[oklab(0.708_0_0_/_0.5)] w-3.5",
    status: 'warning',
    statusClass: "text-white text-[10.5px] font-medium items-center bg-rose-600 box-border gap-x-[3.5px] flex shrink-0 justify-center leading-[14px] outline-[oklab(0.708_0_0_/_0.5)] gap-y-[3.5px] text-nowrap w-fit border overflow-hidden px-[7px] py-[1.75px] rounded-[6.75px] border-solid border-transparent"
  },
  {
    id: 'menu-update',
    title: 'Menu item updated',
    time: '18 minutes ago',
    icon: "https://c.animaapp.com/mdgb88he08nuIz/assets/icon-22.svg",
    iconClass: "text-[oklch(0.623_0.214_259.815)] box-border h-3.5 outline-[oklab(0.708_0_0_/_0.5)] w-3.5",
    status: 'info',
    statusClass: "text-[10.5px] font-medium items-center box-border gap-x-[3.5px] flex shrink-0 justify-center leading-[14px] outline-[oklab(0.708_0_0_/_0.5)] gap-y-[3.5px] text-nowrap w-fit border overflow-hidden px-[7px] py-[1.75px] rounded-[6.75px] border-solid border-black/10"
  },
  {
    id: 'user-registration',
    title: 'User registration',
    time: '25 minutes ago',
    icon: "https://c.animaapp.com/mdgb88he08nuIz/assets/icon-20.svg",
    iconClass: "text-[oklch(0.723_0.219_149.579)] box-border h-3.5 outline-[oklab(0.708_0_0_/_0.5)] w-3.5",
    status: 'success',
    statusClass: "text-[oklch(1_0_0)] text-[10.5px] font-medium items-center bg-gray-950 box-border gap-x-[3.5px] flex shrink-0 justify-center leading-[14px] outline-[oklab(0.708_0_0_/_0.5)] gap-y-[3.5px] text-nowrap w-fit border overflow-hidden px-[7px] py-[1.75px] rounded-[6.75px] border-solid border-transparent"
  }
] as const;

export const quickActions: QuickAction[] = [
  {
    id: 'add-user',
    label: 'Add New User',
    icon: "https://c.animaapp.com/mdgb88he08nuIz/assets/icon-23.svg"
  },
  {
    id: 'review-cooks',
    label: 'Review Cook Applications',
    icon: "https://c.animaapp.com/mdgb88he08nuIz/assets/icon-24.svg"
  },
  {
    id: 'process-orders',
    label: 'Process Pending Orders',
    icon: "https://c.animaapp.com/mdgb88he08nuIz/assets/icon-25.svg"
  },
  {
    id: 'handle-disputes',
    label: 'Handle Disputes',
    icon: "https://c.animaapp.com/mdgb88he08nuIz/assets/icon-26.svg"
  }
] as const;
