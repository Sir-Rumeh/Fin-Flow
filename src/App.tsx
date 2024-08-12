import { lazy, Suspense } from "react";
import LoadingIndicator from "components/common/LoadingIndicator";
import { ThemeProvider } from "@mui/system";
import { theme } from "./theme";
const ApplicationRoutes = lazy(() => import("./routes"));

function App() {
	return (
		<Suspense fallback={<LoadingIndicator />}>
			<ThemeProvider theme={theme}>
				<ApplicationRoutes />
			</ThemeProvider>
		</Suspense>
	);
}

export default App;
