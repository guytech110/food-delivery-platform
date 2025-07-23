export interface BaseItem {
  readonly id: string;
}

export interface IconItem extends BaseItem {
  readonly icon: string;
}

export interface LabeledItem extends BaseItem {
  readonly label: string;
}

export interface TimestampedItem extends BaseItem {
  readonly time: string;
}
