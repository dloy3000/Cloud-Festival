import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Image,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorMode,
  useColorModeValue,
  Stack,
  Text,
  ChakraProvider
} from '@chakra-ui/react';
import Fonts from './Fonts'
import theme from './Theme'
import navData from '../data/format/navRef.json'
import colorRef from '../data/format/colorRef.json';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const navRef = navData.navRef;
const darkTheme = colorRef.darkTheme;
const lightTheme = colorRef.lightTheme;

let button = "";

const NavLink = ({ children }) => (
  <Link
    px='2'
    paddingTop='1'
    _hover={{
      textDecoration: 'none',
      borderRadius: '2',
      bg: button,
    }}
    href={children.href}>
    {children.title}
  </Link>
);

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  button = useColorModeValue(darkTheme.buttonColor, lightTheme.buttonColor);

  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Box bgColor={useColorModeValue(darkTheme.navColor, lightTheme.navColor)} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            aria-label={'Open Menu'}
            icon={<Avatar
              size={'sm'}
              src={'logos/Lakansyel-Logo.png'}
            />}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box paddingLeft='4'>
              <Image
                boxSize='160'
                src={useColorModeValue("logos/Lakansyel-Logo_Dark.png", "logos/Lakansyel-Logo_Light.png")}
                objectFit='contain' />
            </Box>
            <HStack
              as={'nav'}
              display={{ base: 'none', md: 'flex' }}>
              <Text
                textColor={useColorModeValue(darkTheme.textColor, lightTheme.textColor)}
                fontSize='22'
                align='center'
                paddingTop='1'>
                {navRef.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
                ))}
              </Text>
            </HStack>
          </HStack>
          <Box align='right'>
            <Button bgColor={useColorModeValue(darkTheme.navColor, lightTheme.navColor)}
              color={useColorModeValue(darkTheme.textColor, lightTheme.textColor)}
              _hover={{ bg: button }}
              borderRadius='2'
              size='sm'
              onClick={toggleColorMode}>
              {colorMode === 'dark' ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Box>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {navRef.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </ChakraProvider>
  );
}