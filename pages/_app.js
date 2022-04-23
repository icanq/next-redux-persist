import { useEffect, useState } from "react";
import { useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { wrapper } from "../store/store";

function MyApp({ Component, pageProps }) {
  const store = useStore((state) => state);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return !mounted ? (
    <PersistGate persistor={store.__persistor} loading={<div>loading..</div>}>
      <Component {...pageProps} />
    </PersistGate>
  ) : (
    <PersistGate persistor={store}>
      <Component {...pageProps} />
    </PersistGate>
  );
}

export default wrapper.withRedux(MyApp);
