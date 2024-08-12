/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				"circular-std": ["Circular Std", "sans-serif"],
			},
			colors: {
				white: "#ffffff",
				purplePrimary: "#2F0248",
				purpleSecondary: "#D597F817",
				yellowPrimary: "#FFB81C",
				backgroundColor: "#F4F4F4",
				purpleGradient: "linear-gradient(89.92deg, #60088C 0.07%, #A11E90 92.22%)",
				// lightPurpleGradient: "linear-gradient(89.92deg, #60088C 0.07%, #A11E90 92.22%)"",
				blackPrimary: "#222823",
				redSecondary: "#F34E4E",
				modalBackground: "#808080",
				grayText: "rgb(107 114 128)",
				blackSecondary: "#262833",
				blackInput: "#535353",
				greenPrimary: "#09B47C",
				redPrimary: "#F34E4E",
				brownPrimary: "#B87E00",
				shadow: {
					500: "rgba(112, 144, 176, 0.08)",
				},
			},
			boxShadow: {
				"3xl": "14px 17px 40px 4px",
				inset: "inset 0px 18px 22px",
				darkinset: "0px 4px 4px inset",
			},
			borderRadius: {
				primary: "20px",
			},
		},
		screens: {
			sm: "576px",
			"sm-max": { max: "576px" },
			md: "768px",
			"md-max": { max: "768px" },
			lg: "992px",
			"lg-max": { max: "992px" },
			xl: "1200px",
			"xl-max": { max: "1200px" },
			"2xl": "1320px",
			"2xl-max": { max: "1320px" },
			"3xl": "1600px",
			"3xl-max": { max: "1600px" },
			"4xl": "1850px",
			"4xl-max": { max: "1850px" },
		},
	},
};
