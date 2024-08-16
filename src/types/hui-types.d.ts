export {};

declare global {
  interface RoutesChildren {
    name: string;
    path: string;
    component: JSX.Element;
  }

  interface RoutesType {
    name: string;
    layout: string;
    component: JSX.Element;
    icon: JSX.Element | string;
    path: string;
    secondary?: booleant;
    hasChildren?: boolean;
    rolesWithAccess?: string[];
    willChildLinkShow: boolean;
    children?: RoutesChildren[];
  }
}
