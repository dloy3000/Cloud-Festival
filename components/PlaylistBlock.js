import {
    Box,
    VStack,
    Text,
    Flex,
    useColorMode,
    useColorModeValue,
    HStack,
    ChakraProvider,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Fonts from './Fonts';
import theme from './Theme';
import colorRef from '../data/format/colorRef.json';

const darkTheme = colorRef.darkTheme;
const lightTheme = colorRef.lightTheme;

function colorSwitch(colorA, colorB, fade, index) {
    let color = "";

    if (index % 2 === 0) {
        color = colorA;
    }

    else {
        color = colorB;
    }

    console.log(color);

    return "linear(to-r,".concat(color, ", ", colorA, " 78%, ", fade);
}

export default function PlaylistBlock(URIs, descriptions, images) {
    const fgColorLight = useColorModeValue(darkTheme.fgColorLight, lightTheme.fgColorLight);
    const fgColorDark = useColorModeValue(darkTheme.fgColorDark, lightTheme.fgColorDark);
    const fgColorFade = useColorModeValue("rgba(0,0,0,0.68))", "rgba(255,255,255,0.68))");
    const textColor = useColorModeValue(darkTheme.textColor, lightTheme.textColor);

    const [embeds, setEmbeds] = useState(URIs);
    const [desc, setDesc] = useState(descriptions);
    const [img, setIMG] = useState(images);

    return (
        <ChakraProvider theme={theme}>
            <Fonts />
            <Box bgColor={fgColorLight}>
                {embeds && embeds.map((embeds, id) => (
                    <VStack key={id}
                        backgroundImage={img[id]}
                        backgroundSize="contain"
                        backgroundPosition='right'
                        backgroundRepeat='no-repeat'
                        minWidth='100%'>
                        <Flex bgGradient={colorSwitch(fgColorDark, fgColorLight, fgColorFade, id)} p='24px' minWidth='100%'>
                            <HStack >
                                <Box boxSize='300' borderRadius='4' overflow='hidden' align='left'>
                                    <iframe
                                        src={embeds}
                                        width="100%"
                                        height="100%"
                                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture">
                                    </iframe>
                                </Box>
                                <Box w='600px' align='left' px='40px'>
                                    <Text color={textColor} textAlign='justify' fontSize='28'>
                                        {desc[id]}
                                    </Text>
                                </Box>
                            </HStack>
                        </Flex>
                    </VStack>
                ))
                }
            </Box >
        </ChakraProvider>
    )
}
