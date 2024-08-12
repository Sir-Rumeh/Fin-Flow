import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Children } from "react";

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

interface BasicTabsProps {
	tabList: string[];
	tabPanel: React.ReactNode | React.ReactNode[];
	initialIndex?: number;
}

function CustomTabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			className=""
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <div className="bg-purpleSecondary">{children}</div>}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

export default function BasicTabs({ tabList, tabPanel, initialIndex }: BasicTabsProps) {
	const childrenNode = Children.toArray(tabPanel);

	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
		return event;
	};

	React.useEffect(() => {
		initialIndex && setValue(initialIndex);
	}, []);

	return (
		<>
			<Box sx={{ width: "100%" }}>
				<Box
					sx={{
						borderBottom: 1,
						borderColor: "divider",
					}}
				>
					<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
						{tabList.map((item, index) => (
							<Tab
								label={item}
								{...a11yProps(index)}
								key={item}
								sx={{
									borderRadius: "0.5rem",
								}}
							/>
						))}
					</Tabs>
				</Box>
				{childrenNode.map((item, index) => (
					<CustomTabPanel value={value} index={index} key={Math.random() * childrenNode.length}>
						{item}
					</CustomTabPanel>
				))}
			</Box>
		</>
	);
}
