import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Button,
  Text,
  Link,
  Flex,
  Code,
  Grid,
  theme,
  GridItem,
  Heading,
  VStack,
  Progress,
} from '@chakra-ui/react';
import { motion } from "framer-motion";
import { questoes } from "./questoes";
import useSound from 'use-sound';
import hit from "./hit.wav";
import hurt from "./hurt.wav";

function App() {

  const [questaoAtual, setQuestaoAtual] = useState(Math.floor(Math.random()*questoes.length));
  const [vidaJogador, setVidaJogador] = useState(400);
  const [vidaInimigo, setVidaInimigo] = useState(600);
  
  const passo = 100;

  let audioHit = new Audio(hit);
  let audioHurt = new Audio(hurt);

  const verificaAlternativa = (isCorrect) => {
    if(isCorrect){
      setVidaInimigo(vidaInimigo - passo);
      audioHit.play();
      if((vidaInimigo-passo) <= 0){
        if(!alert("Você venceu! Parabéns! (clique em ok para tentar de novo)")){window.location.reload();};
      }
    }else{
      setVidaJogador(vidaJogador - passo);
      audioHurt.play();
      if((vidaJogador-passo) <= 0){
        if(!alert("Você perdeu... Estude mais! (clique em ok para tentar de novo)")){window.location.reload();};
      }
    }
    questoes.splice(questaoAtual, 1);
    const proximaQuestao = Math.floor(Math.random()*questoes.length);
    setQuestaoAtual(proximaQuestao);
  }

  const MotionHeading = motion(Heading);
  const MotionText = motion(Text);
  const MotionGridItem = motion(GridItem);

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid 
          templateColumns="repeat(5, 1fr)"
          templateRows="repeat(2, 1fr)" 
          minH="100vh"
          maxH="100vh" 
          p={3}
          gap={4}
        >
          <MotionGridItem 
            colSpan={5} 
            bg="blue.600"
            p={3}
            animate={{
              rotate: [0, -0.1, 0, 0.1, 0],
              scale: [1, 0.995, 1]
            }}
            transition={{
              repeat: Infinity,
              type: 'spring',
            }}
          >
            <Grid
              templateColumns="repeat(5, 1fr)"
              templateRows="repeat(5, 1fr)"
              minH="100%"
              maxH="100%"
              gap={4}
            >
              <MotionGridItem 
                colSpan={1}
                animate={{
                  scale: [1, 0.9, 1],
                }}
                transition={{
                  repeat: Infinity,
                  type: 'spring'
                }}
              >
                <Progress 
                  min={0} 
                  max={400} 
                  value={vidaJogador}
                  height="100%"
                  colorScheme="green"
                />
              </MotionGridItem>
              <GridItem colStart={3} colEnd={4}>
                <MotionHeading     
                animate={{
                  scale: [1, 0.9, 1],
                  y: [20, 0, 20]
                }}
                transition={{
                  repeat: Infinity,
                  type: 'spring'
                }}>
                  BATALHA ENEM
                </MotionHeading>
              </GridItem>
              <MotionGridItem 
                animate={{
                  scale: [1, 0.9, 1],
                }}
                transition={{
                  repeat: Infinity,
                  type: 'spring'
                }}
                colStart={5} 
                colEnd={6}
              >
                <Progress 
                  min={0} 
                  max={600} 
                  value={vidaInimigo}
                  height="100%"
                  colorScheme="red"
                />
              </MotionGridItem>
              <MotionGridItem
                colStart={1}
                colEnd={2}
                rowStart={2}
                rowEnd={6}
                bg="green.600"
                animate={{
                  scale: [0.8, 0.7, 0.8],
                  rotate: [0, 10, 0],
                  x: [0, 50, 0]
                }}
                transition={{
                  repeat: Infinity,
                  type: 'spring'
                }}
              >

              </MotionGridItem>
              <MotionGridItem
                colStart={5}
                colEnd={6}
                rowStart={2}
                rowEnd={6}
                bg="red.600"
                animate={{
                  scale: [0.8, 0.7, 0.8],
                  rotate: [0, -10, 0],
                  x: [0, -50, 0]
                }}
                transition={{
                  repeat: Infinity,
                  type: 'spring'
                }}
              >
              </MotionGridItem>
            </Grid>
          </MotionGridItem>
          <MotionGridItem 
            colSpan={4} 
            textAlign="start"
            bg="gray.700" 
            p={3}
            overflowY="auto"
            animate={{
              rotate: [0, 0.1, 0, -0.1, 0],
              scale: [1, 0.995, 1]
            }}
            transition={{
              repeat: Infinity,
              type: 'spring',
            }}
          >
            <VStack 
              align="start"
              spacing={6}
            >
              <MotionHeading
                animate={{
                  rotate: [0, 0.5, 0, -0.5, 0],
                  scale: [1, 0.97, 1]
                }}
                transition={{
                  repeat: Infinity,
                  type: 'spring',
                }}
              >
                (ENEM - {questoes[questaoAtual].ano})
              </MotionHeading>
              <MotionHeading 
                id="titulo" 
                whiteSpace="pre-wrap"
                animate={{
                  rotate: [0, -0.2, 0, 0.2, 0],
                  scale: [1, 0.99, 1]
                }}
                transition={{
                  repeat: Infinity,
                  type: 'spring',
                }}
              >
                {questoes[questaoAtual].titulo}
              </MotionHeading>
              <MotionText 
                id="texto" 
                whiteSpace="pre-wrap"
                animate={{
                  rotate: [0, -0.2, 0, 0.2, 0],
                  scale: [1, 0.99, 1]
                }}
                transition={{
                  repeat: Infinity,
                  type: 'spring',
                }}
              >
                {questoes[questaoAtual].texto}
              </MotionText>
              <MotionText 
                id="fonte" 
                whiteSpace="pre-wrap" 
                alignSelf="end"
                animate={{
                  rotate: [0, 0.2, 0, -0.2, 0],
                  scale: [1, 0.99, 1]
                }}
                transition={{
                  repeat: Infinity,
                  type: 'spring',
                }}
              >
                {questoes[questaoAtual].fonte}
              </MotionText>
              <MotionText 
                id="enunciado"
                animate={{
                  rotate: [0, -0.2, 0, 0.2, 0],
                  scale: [1, 0.99, 1]
                }}
                transition={{
                  repeat: Infinity,
                  type: 'spring',
                }}
              >
                {questoes[questaoAtual].enunciado}
              </MotionText>
              {questoes[questaoAtual].alternativas.map((alternativa) => (
                <MotionText
                animate={{
                  rotate: [0, 0.2, 0, -0.2, 0],
                  scale: [1, 0.99, 1]
                }}
                transition={{
                  repeat: Infinity,
                  type: 'spring',
                }}
                >
                  {alternativa.texto}
                </MotionText>
              ))}
            </VStack>
          </MotionGridItem>
          <GridItem colSpan={1}>
            <Grid
              templateRows="repeat(5, 1fr)"
              minH="100%"
              p={3}
              gap={4}
            >
              <MotionGridItem
                animate={{
                  rotate: [0, 0.4, 0, -0.4, 0],
                  scale: [1, 0.99, 1]
                }}
                transition={{
                  repeat: Infinity,
                  type: 'spring',
                }}
                whileHover={{ 
                  scale: [1.02, 1.01, 1.02],
                  rotate: [0, -1, 0, 1, 0] 
                }}
              >
                <Button 
                  minH="100%" 
                  minW="100%" 
                  colorScheme="pink" 
                  variant="solid"
                  onClick={() => verificaAlternativa(questoes[questaoAtual].alternativas[0].isCorrect)}
                >
                  <MotionText
                    animate={{
                      rotate: [0, -2, 0, 2, 0],
                      scale: [1, 1.3, 1]
                    }}
                    transition={{
                      repeat: Infinity,
                      type: 'spring',
                    }}
                  >
                    A
                  </MotionText>
                </Button>
              </MotionGridItem>
              <MotionGridItem
                animate={{
                  rotate: [0, -0.4, 0, 0.4, 0],
                  scale: [1, 0.99, 1]
                }}
                transition={{
                  repeat: Infinity,
                  type: 'spring',
                }}
                whileHover={{ 
                  scale: [1.02, 1.01, 1.02],
                  rotate: [0, 1, 0, -1, 0] 
                }}
              >
                <Button 
                  minH="100%" 
                  minW="100%" 
                  colorScheme="purple" 
                  variant="solid"
                  onClick={() => verificaAlternativa(questoes[questaoAtual].alternativas[1].isCorrect)}
                >
                  <MotionText
                    animate={{
                      rotate: [0, 2, 0, -2, 0],
                      scale: [1, 1.3, 1]
                    }}
                    transition={{
                      repeat: Infinity,
                      type: 'spring',
                    }}
                  >
                    B
                  </MotionText>
                </Button>
              </MotionGridItem>
              <MotionGridItem
                animate={{
                  rotate: [0, 0.4, 0, -0.4, 0],
                  scale: [1, 0.99, 1]
                }}
                transition={{
                  repeat: Infinity,
                  type: 'spring',
                }}
                whileHover={{ 
                  scale: [1.02, 1.01, 1.02],
                  rotate: [0, -1, 0, 1, 0] 
                }}
              >
                <Button 
                  minH="100%" 
                  minW="100%" 
                  colorScheme="pink" 
                  variant="solid"
                  onClick={() => verificaAlternativa(questoes[questaoAtual].alternativas[2].isCorrect)}
                >
                  <MotionText
                    animate={{
                      rotate: [0, -2, 0, 2, 0],
                      scale: [1, 1.3, 1]
                    }}
                    transition={{
                      repeat: Infinity,
                      type: 'spring',
                    }}
                  >
                    C
                  </MotionText>
                </Button>
              </MotionGridItem>
              <MotionGridItem
                animate={{
                  rotate: [0, -0.4, 0, 0.4, 0],
                  scale: [1, 0.99, 1]
                }}
                transition={{
                  repeat: Infinity,
                  type: 'spring',
                }}
                whileHover={{ 
                  scale: [1.02, 1.01, 1.02],
                  rotate: [0, 1, 0, -1, 0] 
                }}
              >
                <Button 
                  minH="100%" 
                  minW="100%" 
                  colorScheme="purple" 
                  variant="solid"
                  onClick={() => verificaAlternativa(questoes[questaoAtual].alternativas[3].isCorrect)}
                >
                  <MotionText
                    animate={{
                      rotate: [0, 2, 0, -2, 0],
                      scale: [1, 1.3, 1]
                    }}
                    transition={{
                      repeat: Infinity,
                      type: 'spring',
                    }}
                  >
                    D
                  </MotionText>
                </Button>
              </MotionGridItem>
              <MotionGridItem
                animate={{
                  rotate: [0, 0.4, 0, -0.4, 0],
                  scale: [1, 0.99, 1]
                }}
                transition={{
                  repeat: Infinity,
                  type: 'spring',
                }}
                whileHover={{ 
                  scale: [1.02, 1.01, 1.02],
                  rotate: [0, -1, 0, 1, 0] 
                }}
              >
                <Button 
                  minH="100%" 
                  minW="100%" 
                  colorScheme="pink" 
                  variant="solid"
                  onClick={() => verificaAlternativa(questoes[questaoAtual].alternativas[4].isCorrect)}
                >
                  <MotionText
                    animate={{
                      rotate: [0, -2, 0, 2, 0],
                      scale: [1, 1.3, 1]
                    }}
                    transition={{
                      repeat: Infinity,
                      type: 'spring',
                    }}
                  >
                    E
                  </MotionText>
                </Button>
              </MotionGridItem>

            </Grid>
          </GridItem>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
