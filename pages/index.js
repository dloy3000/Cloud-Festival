import { useRef } from "react";
import Navbar from "../components/Navbar";
import colorRef from '../data/format/colorRef.json';
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
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text
} from '@chakra-ui/react';

const darkTheme = colorRef.darkTheme;
const lightTheme = colorRef.lightTheme;

export default function Home() {
  // enable smooth scrolling effect
  const scrollToDiv = (ref) =>
    window.scrollTo({
      top: ref.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  const myRef = useRef();

  return (
    <>
      <Navbar></Navbar>
      <Box minHeight='800' bgColor={useColorModeValue(darkTheme.bgColor, lightTheme.bgColor)}>
      </Box>
    </>
  )
}
