import PortfolioMain from "./components/portfolio-main";
import { getData } from "@/lib/getData";

export default async function Page() {
	const data = await getData();

	return <PortfolioMain data={data} />;
}
