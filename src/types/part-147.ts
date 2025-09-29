export interface IInstructorsData {
  name: string;
  positions: string[];
  competencies: string[];
}

export type Part147PageLink = {
  title: string;
  href: string;
  description: string;
  icon: React.ReactNode;
  isInDevelopment?: boolean;
};

export type SectionTitleProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export type Part147PageContent = SectionTitleProps & {
  links: Part147PageLink[];
};
