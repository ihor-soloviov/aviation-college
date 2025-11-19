export interface IInstructorsData {
  name: string;
  positions: string[];
  competencies: string[];
}

export type DefaultPageLink = {
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

export type DefaultPageContent = SectionTitleProps & {
  links: DefaultPageLink[];
};
