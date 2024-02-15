import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    ModalHeader,
    ModalFooter,
} from "@chakra-ui/modal";
import { useDisclosure } from "@chakra-ui/hooks";
import {
    Text,
    theme as chakraTheme,
} from '@chakra-ui/react'

const { Button } = chakraTheme.components

export const ModalExample = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <button
                onClick={onOpen}
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 rounded-md text-white px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Save
            </button>

            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text fontWeight='bold' mb='1rem'>
                            You can scroll the content behind the modal
                        </Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>Confirm</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};