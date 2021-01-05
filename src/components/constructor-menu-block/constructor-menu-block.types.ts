export interface ConstructorMenuBlockProps {
  title: string;
  titleIconUrl: string;
  options: { name: string; action: () => any }[];
  isDataFetched: boolean;
}
