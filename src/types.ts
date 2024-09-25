type Link = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

interface ReduxProviderProps {
  children: React.ReactNode;
}

interface ExampleState {
  value: number;
}

type ReportCardProps = {
  title: string;
  value: number;
};
