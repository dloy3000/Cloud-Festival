import { useRef } from "react";
import PlaylistBlock from "../components/PlaylistBlock"
import Navbar from "../components/Navbar"
import curatedURIs from "../data/appData/embedsCurated.json";
import descriptions from "../data/appData/flavorDescCurated.json";
import images from "../data/appData/imagesCurated.json";
import colorRef from '../data/format/colorRef.json';
import {
    Box,
    useColorMode,
    useColorModeValue
} from '@chakra-ui/react';

const darkTheme = colorRef.darkTheme;
const lightTheme = colorRef.lightTheme;

export default function Curated() {
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
                {PlaylistBlock(curatedURIs.embeds, descriptions.flavorDesc, images.images)}
            </Box>
        </>
    )
}
