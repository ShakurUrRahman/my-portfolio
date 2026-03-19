import PortfolioMain from "./components/portfolio-main";
import { getData } from "@/lib/getData";

export const dynamic = "force-dynamic";

export default async function Page() {
	const data = await getData();

	return <PortfolioMain data={data} />;
}
