import { store } from "@/lib/store";
import { ReactNode } from "react";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <CookiesProvider>
      <Provider store={store}>{children}</Provider>;
    </CookiesProvider>
  );
}
