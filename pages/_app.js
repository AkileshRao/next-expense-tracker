import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { AppContextProvider } from '../state/context'

function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </AppContextProvider>
  )
}

export default MyApp
