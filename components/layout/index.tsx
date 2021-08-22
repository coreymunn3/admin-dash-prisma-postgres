import { FC } from 'react';
import { Container, Box } from '@chakra-ui/layout';

const Layout: FC = ({ children }) => {
  return (
    <Container
      maxw='800px'
      minHeight='100vh'
      display='flex'
      flexDir='column'
      justifyContent='space-between'
      padding={4}
    >
      {children}
      <Box textAlign='center'>Powered by NextJS, ChakraUI, and Prisma</Box>
    </Container>
  );
};

export default Layout;
