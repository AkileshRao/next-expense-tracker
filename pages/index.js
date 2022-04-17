import { Menu, MenuButton, MenuList, MenuItem, Button, Flex, Box, Heading, Text } from '@chakra-ui/react';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { AiOutlinePlus } from 'react-icons/ai'
import { useEffect } from 'react';

import prisma from '../lib/prisma'

export default function Dashboard({ expenses, incomes }) {
  const router = useRouter()

  useEffect(() => {
    console.log(expenses, incomes);
  }, [expenses, incomes])
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

      <Flex direction={'column'} bgColor={'white'} mt={'4'} rounded={'md'} p={3}>
        {
          expenses.map(exp => (
            <Box key={exp.id}>
              <Flex mb={2}>
                <Text fontSize={'xs'}>{exp.date.slice(0, 10)}</Text>
              </Flex>
              <Heading size={'md'} color={'red.500'}>-{exp.amount}</Heading>
              <Text >{exp.description}</Text>
            </Box>
          ))
        }
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
    </div >
  )
}

export async function getServerSideProps() {
  const expenses = await prisma.expense.findMany();
  const incomes = await prisma.income.findMany()

  return {
    props: {
      expenses: JSON.parse(JSON.stringify(expenses)),
      incomes: JSON.parse(JSON.stringify(incomes))
    }
  }
};