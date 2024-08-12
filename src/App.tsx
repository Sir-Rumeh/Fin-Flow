import { Suspense } from "react";
import LoadingIndicator from "components/common/LoadingIndicator";
import { ThemeProvider } from "@mui/system";
import { theme } from "./theme";
import ApplicationRoutes from "./routes";

function App() {
	// const { isLoading } = useAppSelector((state: RootState) => state.loading);
	return (
		<Suspense fallback={<LoadingIndicator />}>
			{/* {isLoading && <LoadingIndicator />} */}
			<ThemeProvider theme={theme}>
				<ApplicationRoutes />
			</ThemeProvider>
		</Suspense>
	);
}

export default App;
