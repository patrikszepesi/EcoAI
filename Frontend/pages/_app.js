import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "../context";
import Head from 'next/head';
import toast, { Toaster } from 'react-hot-toast';



function MyApp({ Component, pageProps }) {
  return (
    <>
    <Provider>
    <Head>
       <title>EcoAI</title>
       <link rel="shortcut icon" href="https://cdn-icons-png.flaticon.com/512/5278/5278402.png" />
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
       <link
      href="https://fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,400i,700,700i,900,900i&display=swap"
      rel="stylesheet"
    />
     </Head>
     <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
      <Component {...pageProps} />
    </Provider>
    </>
  );

}

export default MyApp;
