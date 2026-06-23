interface FlowingMenuItem {
  link: string;
  text: string;
  image?: string;
}

interface FlowingMenuProps {
  items?: FlowingMenuItem[];
  textColor?: string;
  bgColor?: string;
  hoverColor?: string;
  borderColor?: string;
  onItemClick?: () => void;
  onItemHover?: (image: string | null) => void;
}

declare function FlowingMenu(props: FlowingMenuProps): JSX.Element;
export default FlowingMenu;
