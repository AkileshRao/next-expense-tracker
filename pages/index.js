import { Flex, IconButton, Box, Text, Heading, Divider, Input, Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { AiOutlinePlus } from 'react-icons/ai'
import { useEffect, useContext } from 'react';
import { BsChevronDown } from 'react-icons/bs'
import prisma from '../lib/prisma'
import { AppContext } from '../state/context';

export default function Dashboard({ items, total }) {
  const router = useRouter()
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const state = useContext(AppContext)
  useEffect(() => {

  }, [])

  const editItem = (item) => {
    state.setItemPageMode("UPDATE");
    state.setCurrentItem(item);
    router.push('/item')
  }

  return (
    <div >
      <Head>
        <title>Dashboard</title>
      </Head>

      <Flex direction={'column'} gap={3}>
        <Flex justifyContent={'center'}>
          <Menu>
            <MenuButton shadow={'md'} style={{ width: "fit-content", minWidth: "100px" }} colorScheme={'teal'} rightIcon={<BsChevronDown />} as={Button}>{months[new Date().getMonth()]}</MenuButton>
            <MenuList value={months[new Date().getMonth()]}>
              {months.map(month => (
                <MenuItem key={month}>{month}</MenuItem>
              ))}
              <MenuItem></MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Flex align={'center'} gap={10} p='5' bgColor={"white"} shadow={'md'}>
          <Flex direction={'column'} align={'center'}>
            <p>Income</p>
            <p className='text-2xl'>{total.income}</p>
          </Flex>

          <Flex direction={'column'} align={'center'}>
            <p>Expenses</p>
            <p className='text-2xl'>{total.expense}</p>
          </Flex>

          <Flex direction={'column'} align={'center'}>
            <p>Balance</p>
            <p className='text-2xl'>{total.income - total.expense}</p>
          </Flex>
        </Flex>

        <Flex direction={'column'} gap={'3'}>
          {items.map((item, index) => (
            <Box key={index} shadow={'md'} bgColor={'white'}>
              <Flex ps={2} pe={2} pt={2} pb={1}>
                <Text fontSize={'xs'} color={'blackAlpha.600'}>{item[0].date.slice(0, 10)}</Text>
              </Flex>

              <Divider />
              {item.map(itemEntry => (
                <Box key={itemEntry.id} bgColor={'white'} >
                  <Flex px={3} py={2} onClick={() => editItem(itemEntry)} alignItems={'center'} justifyContent={'space-between'} className='transaction-item'>
                    <Text>{itemEntry.description}</Text>
                    <Text>{itemEntry.mode == "Expense" ? "-" : "+"}{itemEntry.amount}</Text>
                  </Flex>
                </Box>
              ))}
            </Box>
          ))}
        </Flex>

      </Flex>

      <IconButton icon={<AiOutlinePlus />} onClick={() => router.push('/item')} colorScheme='green' fontWeight={'bold'} color='white' position='fixed' bottom='1rem' right='1rem'></IconButton>
    </div >
  )
}

export async function getServerSideProps() {
  const itemList = await prisma.item.findMany({
    select: {
      date: true
    },
    distinct: ['date']
  })

  let items = await Promise.all(itemList.map(item => prisma.item.findMany({
    select: {
      description: true,
      amount: true,
      id: true,
      date: true,
      mode: true
    },
    where: {
      date: item.date
    }
  })))


  let expensesSum = await prisma.item.groupBy({
    by: ['mode'],
    _sum: {
      amount: true
    }
  })



  return {
    props: {
      items: JSON.parse(JSON.stringify(items)),
      total: {
        income: expensesSum[0]._sum.amount,
        expense: expensesSum[1]._sum.amount
      }
    }
  }

};