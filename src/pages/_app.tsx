import AppProvider from '@/hooks';
import Globalstyles from '@/styles/Globalstyles';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Globalstyles />
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </>
  );
}

export default MyApp;
