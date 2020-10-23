export interface ActionButtonProps {
  mdiIconPath: string;
  size: number;
  action: (...args: any[]) => void;
  margin?: string;
}
