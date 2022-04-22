import { Box, Button, Flex, Heading, Input, MenuButton, MenuItem, MenuList, Textarea, useToast, Menu } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BsArrowLeft, BsChevronDown, BsTrash, BsTrash2, BsTrash2Fill } from 'react-icons/bs'
import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { AppContext } from "../state/context";

export default function Expense() {
    const router = useRouter()
    const toast = useToast()
    const state = useContext(AppContext)
    const [mode, setMode] = useState('Expense');
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (state.itemPageMode == "UPDATE") {
            setAmount(state.currentItem.amount);
            setDescription(state.currentItem.description);
            setDate(state.currentItem.date.slice(0, 10));
        }
    }, [state])

    const addItem = async () => {
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

        let data = { amount: parseInt(amount), date: new Date(date), description, mode }
        axios.post("/api/item", data).then(res => {
            toast({
                title: "Success",
                description: res.data.message,
                status: 'success',
                duration: '5000',
                isClosable: true,
                position: 'top'
            })
            resetForm()
        }).catch(err => {
            toast({
                title: "Error",
                description: err.message,
                status: 'error',
                duration: '5000',
                isClosable: true,
                position: 'top'
            })
            console.log(err);
        })

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
                {
                    state.itemPageMode == "UPDATE" &&
                    <Button leftIcon={<BsTrash2Fill />} onClick={() => console.log("Delete")} colorScheme={'red'} >Delete item</Button>
                }
            </Flex>
            <Box bgColor={'white'} p='6' rounded={'lg'}>
                <Flex alignItems={'center'} mb={'6'} justifyContent={'space-between'}>
                    <Heading size={'md'}>Enter item details</Heading>
                    <Menu>
                        <MenuButton as={Button} colorScheme='teal' variant='outline' rightIcon={<BsChevronDown />}>
                            {mode}
                        </MenuButton>
                        <MenuList value={mode}>
                            <MenuItem onClick={() => setMode('Expense')}>Expense</MenuItem>
                            <MenuItem onClick={() => setMode('Income')}>Income</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>

                <Flex gap={3} mb={'6'}>
                    <Input type={'date'} value={date} onChange={e => setDate(e.target.value)} />
                    <Input type='number' value={amount} onChange={e => setAmount(e.target.value)} placeholder='Enter item amount' />
                </Flex>

                <Textarea placeholder="Item description" mb={'6'} onChange={e => setDescription(e.target.value)} value={description} />
                <Button colorScheme={'green'} width={'full'} onClick={addItem}>Add Item</Button>
            </Box>
        </Box>
    )
}

