import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import ourTheme from '@/Styles/chakra/ourTheme';
import Layout from '@/components/layouts/Layout';
import { RecoilRoot } from 'recoil';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<RecoilRoot>
		 <ChakraProvider theme={ourTheme}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		 </ChakraProvider>
		</RecoilRoot>
	);
}
