export type NavigationLink = {
  title: string;
  href: string;
  description?: string;
  isExternal?: boolean;
  isInDevelopment?: boolean;
  isNeedsLink?: boolean;
};

export type NavigationCategory = {
  title: string;
  description: string;
  icon: React.ReactNode;
  links: NavigationLink[];
  defaultExpanded?: boolean;
};
