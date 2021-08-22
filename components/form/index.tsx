import { Prisma } from '.prisma/client';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Select } from '@chakra-ui/select';
import { Button } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import { FC, useState } from 'react';
import { fetcher } from '../../utils/fetcher';

interface IProps {
  initialUsers: [];
}

const options = [
  { key: 'd', text: 'DEVELOPER', value: 'DEVELOPER' },
  { key: 'u', text: 'USER', value: 'USER' },
  { key: 'a', text: 'ADMIN', value: 'ADMIN' },
];

const Form: FC<IProps> = (props: IProps) => {
  const { initialUsers } = props;

  const [users, setUsers] =
    useState<Prisma.UserUncheckedCreateInput[]>(initialUsers);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [role, setRole] = useState(undefined);

  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setAvatar('');
    setRole(undefined);
  };

  const handleSelectChange = (e: any) => setRole(e.target.value);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const body: Prisma.UserCreateInput = {
      firstName,
      lastName,
      role,
      email,
      avatar,
    };
    await fetcher('/api/create', { user: body });
    await setUsers([...users, body]);
    clearForm();
  };

  return (
    <Box mt={8} p={4}>
      <form onSubmit={handleSubmit}>
        <FormControl id='firstName' mb={4}>
          <FormLabel>First Name</FormLabel>
          <Input
            type='text'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            focusBorderColor='purple.500'
          />
        </FormControl>
        <FormControl id='lastName' mb={4}>
          <FormLabel>Last Name</FormLabel>
          <Input
            type='text'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            focusBorderColor='purple.500'
          />
        </FormControl>
        <FormControl id='email' mb={4}>
          <FormLabel>Email</FormLabel>
          <Input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            focusBorderColor='purple.500'
          />
        </FormControl>
        <FormControl id='avatar' mb={4}>
          <FormLabel>Avatar</FormLabel>
          <Input
            type='text'
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            focusBorderColor='purple.500'
          />
        </FormControl>
        <FormControl id='role' mb={4}>
          <FormLabel>Select Role</FormLabel>
          <Select
            value={role}
            variant='filled'
            onChange={handleSelectChange}
            focusBorderColor='purple.500'
          >
            <option hidden>Choose</option>
            {options.map((option) => (
              <option key={option.key} value={option.value}>
                {option.text}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl mt={8}>
          <Button type='submit' colorScheme='purple' w='full'>
            Add {role || 'New Person'}
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default Form;
