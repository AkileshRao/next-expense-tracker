import { Box, Button, Flex, Heading, Input, Textarea } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BsArrowLeft } from 'react-icons/bs'
export default function Income() {
    const router = useRouter()
    return (
        <Box>
            <Flex mb={4} justifyContent={'space-between'}>
                <Button leftIcon={<BsArrowLeft />} onClick={() => router.push('/')} colorScheme={'teal'} bgColor={'white'} variant={'outline'}>Dashboard</Button>
                <Button onClick={() => router.push('/expense')} colorScheme={'teal'}>Expenses</Button>
            </Flex>
            <Box bgColor={'white'} p='6' rounded={'lg'}>
                <Heading size={'md'} mb={'6'}>Enter your income</Heading>

                <Flex gap={3} mb={'6'}>
                    <Input type={'date'} />
                    <Input type='number' placeholder='Enter income amount' />
                </Flex>

                <Textarea placeholder="Income description" mb={'6'} />
                <Button colorScheme={'green'} width={'full'}>Add expense</Button>
            </Box>
        </Box>
    )
}