/* eslint-disable @typescript-eslint/no-explicit-any */
export {};

declare global {
	/**
	 * Now declare things that go in the global namespace,
	 * or augment existing declarations in the global namespace.
	 */

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
		children?: RoutesChildren[];
		rolesWithAccess?: string[];
	}
}
