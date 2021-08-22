import type { NextPage } from 'next';
import prisma from '../lib/prisma';
import { Prisma } from '.prisma/client';
import { Box, Heading } from '@chakra-ui/layout';
import Form from '../components/form';

interface IProps {
  initialUsers: [];
}

const Home: NextPage<IProps> = ({ initialUsers }) => {
  return (
    <Box>
      <Heading as='h1' fontWeight='light' textAlign='center'>
        Admin Dashboard
      </Heading>
      <Form initialUsers={initialUsers} />
    </Box>
  );
};

export async function getServerSideProps() {
  const users: Prisma.UserUncheckedCreateInput[] = await prisma.user.findMany();

  return {
    props: {
      initialUsers: users,
    },
  };
}

export default Home;
