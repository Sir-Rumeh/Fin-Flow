import { Suspense } from "react";
import LoadingIndicator from "components/LoadingIndicator";
// import { ThemeProvider } from "@mui/system";
// import { theme } from "./theme";
// import { useAppSelector } from "./store";
// import { RootState } from "./store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Route } from "react-router-dom";
// import ApplicationRoutes from "./routes/index";
import appRoutes from "utils/constants/routes";
import LoginPage from "pages/Auth/Login";
import AdminLogin from "pages/Auth/AdminLogin";
import MerchantLogin from "pages/Auth/MerchantLogin";
import AdminLayout from "layouts/AdminLayout";
import MerchantLayout from "layouts/MerchantLayout";

// const Routes = lazy(() => import("./routes"));

function App() {
	// const { isLoading } = useAppSelector((state: RootState) => state.loading);
	return (
		<Suspense fallback={<LoadingIndicator />}>
			{/* {isLoading && <LoadingIndicator />} */}
			{/* <ThemeProvider theme={theme}> */}
			<BrowserRouter>
				<Routes>
					<Route path={appRoutes.login} element={<LoginPage />} />
					<Route path={`${appRoutes.adminLogin}`} element={<AdminLogin />} />
					<Route path={`${appRoutes.merchantLogin}`} element={<MerchantLogin />} />
					<Route path={`/${appRoutes.adminDashboard.index}/*`} element={<AdminLayout />} />
					<Route path={`${appRoutes.merchantDashboard.index}/*`} element={<MerchantLayout />} />
				</Routes>
			</BrowserRouter>
			{/* </ThemeProvider> */}
		</Suspense>
	);
}

export default App;
