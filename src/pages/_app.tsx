import Globalstyles from '@/styles/Globalstyles';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Globalstyles />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
