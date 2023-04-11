import { useRef } from "react";
import PlaylistBlock from "../components/PlaylistBlock"
import Navbar from "../components/Navbar"
import ambientURIs from "../data/appData/embedsAmbient.json";
import descriptions from "../data/appData/flavorDescAmbience.json";
import images from "../data/appData/imagesAmbience.json";
import colorRef from '../data/format/colorRef.json';
import {
    Box,
    useColorMode,
    useColorModeValue
} from '@chakra-ui/react';

const darkTheme = colorRef.darkTheme;
const lightTheme = colorRef.lightTheme;

export default function Ambient() {
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
                {PlaylistBlock(ambientURIs.embeds, descriptions.flavorDesc, images.images)}
            </Box>
        </>
    )
}
