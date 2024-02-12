import logoImg from '@/assets/logo.svg'
import type { AppProps } from 'next/app'
import { globalStyles } from '@/styles/global'
import { Container, Header } from '@/styles/pages/app';
import Image from 'next/image';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image 
          alt='' 
          src={logoImg.src} 
          width={logoImg.width} 
          height={logoImg.height}
        />
      </Header>

      <Component {...pageProps} />
      
    </Container>
  )
}
