import { Box, Button, Flex, Heading, Input, Textarea, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BsArrowLeft } from 'react-icons/bs'
import { useState } from "react";


export default function Expense() {
    const router = useRouter()
    const toast = useToast()

    const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('');

    const addExpense = () => {
        if (!amount) {
            toast({
                title: "Warning",
                description: "Please enter a valid amount.",
                status: 'warning',
                duration: '5000',
                isClosable: true,
                position: 'top'
            })
            return false;
        };

        //does api call
        toast({
            title: "Success",
            description: "Expense added successfully!",
            status: 'success',
            duration: '5000',
            isClosable: true,
            position: 'top'
        })

        resetForm()
    }

    const resetForm = () => {
        setDate(new Date().toISOString().slice(0, 10));
        setAmount('');
        setDescription('')
    }

    return (
        <Box>
            <Flex mb={4} justifyContent={'space-between'}>
                <Button leftIcon={<BsArrowLeft />} onClick={() => router.push('/')} colorScheme={'teal'} bgColor={'white'} variant={'outline'}>Dashboard</Button>
                <Button onClick={() => router.push('/income')} colorScheme={'teal'}>Income</Button>
            </Flex>
            <Box bgColor={'white'} p='6' rounded={'lg'}>
                <Heading size={'md'} mb={'6'}>Enter your expense</Heading>

                <Flex gap={3} mb={'6'}>
                    <Input type={'date'} value={date} onChange={e => setDate(e.target.value)} />
                    <Input type='number' value={amount} onChange={e => setAmount(e.target.value)} placeholder='Enter expense amount' />
                </Flex>

                <Textarea placeholder="Expense description" mb={'6'} onChange={e => setDescription(e.target.value)} value={description} />
                <Button colorScheme={'green'} width={'full'} onClick={addExpense}>Add expense</Button>
            </Box>
        </Box>
    )
}