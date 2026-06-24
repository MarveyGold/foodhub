
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/(app)" | "/(admin)" | "/" | "/(admin)/add-menu" | "/(app)/cart" | "/(admin)/delete" | "/(admin)/manage" | "/(app)/menu" | "/(app)/orders";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/(app)": Record<string, never>;
			"/(admin)": Record<string, never>;
			"/": Record<string, never>;
			"/(admin)/add-menu": Record<string, never>;
			"/(app)/cart": Record<string, never>;
			"/(admin)/delete": Record<string, never>;
			"/(admin)/manage": Record<string, never>;
			"/(app)/menu": Record<string, never>;
			"/(app)/orders": Record<string, never>
		};
		Pathname(): "/" | "/add-menu" | "/cart" | "/delete" | "/manage" | "/menu" | "/orders";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/10-2.png" | "/10-3.png" | "/83.png" | "/IMG-20260503-WA0013.jpg" | "/background.png" | "/background1.png" | "/background2.png" | "/background3.png" | "/background4.png" | "/cake.png" | "/chef.png" | "/chops.png" | "/images/10-2.png" | "/images/10-3.png" | "/images/83.png" | "/images/IMG-20260503-WA0013.jpg" | "/images/background.png" | "/images/background1.png" | "/images/background2.png" | "/images/background3.png" | "/images/background4.png" | "/images/cake.png" | "/images/chef.png" | "/images/chops.png" | "/images/logo.png" | "/images/meatpie.png" | "/images/military.png" | "/images/null.png" | "/images/pickup.png" | "/images/premium.png" | "/images/rice.png" | "/images/soup.png" | "/logo.png" | "/meatpie.png" | "/military.png" | "/null.png" | "/pickup.png" | "/premium.png" | "/rice.png" | "/robots.txt" | "/soup.png" | string & {};
	}
}