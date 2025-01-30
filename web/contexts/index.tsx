import { CanvaProvider } from "./canva";

export function AppProvider({ children }: { children: React.ReactNode }) {
	return (
		<CanvaProvider>
			{children}
		</CanvaProvider>
	)
}