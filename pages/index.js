import { Menu, MenuButton, MenuList, MenuItem, Button, Flex } from '@chakra-ui/react';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { AiOutlinePlus } from 'react-icons/ai'

export default function Dashboard() {
  const router = useRouter()
  return (
    <div >
      <Head>
        <title>Dashboard</title>
      </Head>

      <Flex align={'center'} gap={10} p='5' bgColor={"white"}>
        <Flex direction={'column'} align={'center'}>
          <p>Income</p>
          <p className='text-2xl'>0</p>
        </Flex>

        <Flex direction={'column'} align={'center'}>
          <p>Expenses</p>
          <p className='text-2xl'>0</p>
        </Flex>

        <Flex direction={'column'} align={'center'}>
          <p>Balance</p>
          <p className='text-2xl'>0</p>
        </Flex>
      </Flex>

      <Flex>

      </Flex>

      <Menu>
        <MenuButton colorScheme='green' fontWeight={'bold'} color='white' position='fixed' bottom='1rem' right='1rem' as={Button} rightIcon={<AiOutlinePlus />} >
          Add item
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => router.push('/expense')}>Expense</MenuItem>
          <MenuItem onClick={() => router.push('/income')}>Income</MenuItem>
        </MenuList>

      </Menu>
    </div>
  )
}
