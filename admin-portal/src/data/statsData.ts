export interface StatItem {
  readonly id: string;
  readonly title: string;
  readonly value: string;
  readonly icon: string;
  readonly iconClass: string;
  readonly trendIcon: string;
  readonly trendIconClass: string;
  readonly trendText: string;
  readonly trendTextClass: string;
}

export const statsData: StatItem[] = [
  {
    id: 'total-orders',
    title: 'Total Orders',
    value: '12,384',
    icon: "https://c.animaapp.com/mdgb88he08nuIz/assets/icon-13.svg",
    iconClass: "text-[oklch(0.546_0.245_262.881)] box-border h-3.5 outline-[oklab(0.708_0_0_/_0.5)] w-3.5",
    trendIcon: "https://c.animaapp.com/mdgb88he08nuIz/assets/icon-14.svg",
    trendIconClass: "text-[oklch(0.723_0.219_149.579)] box-border h-[10.5px] outline-[oklab(0.708_0_0_/_0.5)] w-[10.5px] mr-[3.5px]",
    trendText: '+12.5% from last month',
    trendTextClass: "text-[oklch(0.723_0.219_149.579)] text-[10.5px] box-border leading-[14px] outline-[oklab(0.708_0_0_/_0.5)]"
  },
  {
    id: 'revenue',
    title: 'Revenue',
    value: '$45,231.89',
    icon: "https://c.animaapp.com/mdgb88he08nuIz/assets/icon-15.svg",
    iconClass: "text-[oklch(0.627_0.194_149.214)] box-border h-3.5 outline-[oklab(0.708_0_0_/_0.5)] w-3.5",
    trendIcon: "https://c.animaapp.com/mdgb88he08nuIz/assets/icon-14.svg",
    trendIconClass: "text-[oklch(0.723_0.219_149.579)] box-border h-[10.5px] outline-[oklab(0.708_0_0_/_0.5)] w-[10.5px] mr-[3.5px]",
    trendText: '+8.2% from last month',
    trendTextClass: "text-[oklch(0.723_0.219_149.579)] text-[10.5px] box-border leading-[14px] outline-[oklab(0.708_0_0_/_0.5)]"
  },
  {
    id: 'active-users',
    title: 'Active Users',
    value: '3,847',
    icon: "https://c.animaapp.com/mdgb88he08nuIz/assets/icon-16.svg",
    iconClass: "text-[oklch(0.558_0.288_302.321)] box-border h-3.5 outline-[oklab(0.708_0_0_/_0.5)] w-3.5",
    trendIcon: "https://c.animaapp.com/mdgb88he08nuIz/assets/icon-17.svg",
    trendIconClass: "text-[oklch(0.637_0.237_25.331)] box-border h-[10.5px] outline-[oklab(0.708_0_0_/_0.5)] w-[10.5px] mr-[3.5px]",
    trendText: '-2.1% from last month',
    trendTextClass: "text-[oklch(0.637_0.237_25.331)] text-[10.5px] box-border leading-[14px] outline-[oklab(0.708_0_0_/_0.5)]"
  },
  {
    id: 'active-cooks',
    title: 'Active Cooks',
    value: '284',
    icon: "https://c.animaapp.com/mdgb88he08nuIz/assets/icon-18.svg",
    iconClass: "text-[oklch(0.646_0.222_41.116)] box-border h-3.5 outline-[oklab(0.708_0_0_/_0.5)] w-3.5",
    trendIcon: "https://c.animaapp.com/mdgb88he08nuIz/assets/icon-14.svg",
    trendIconClass: "text-[oklch(0.723_0.219_149.579)] box-border h-[10.5px] outline-[oklab(0.708_0_0_/_0.5)] w-[10.5px] mr-[3.5px]",
    trendText: '+5.7% from last month',
    trendTextClass: "text-[oklch(0.723_0.219_149.579)] text-[10.5px] box-border leading-[14px] outline-[oklab(0.708_0_0_/_0.5)]"
  }
] as const;
