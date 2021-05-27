import { Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaChevronUp } from 'react-icons/fa'

const ScrollButton: React.FC = () => {
  const [visible, setVisible] = useState(false)

  const toggleVisible = (): void => {
    if (window.scrollY > 300) {
      if (window.innerHeight + window.scrollY < document.body.offsetHeight - 150) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    } else {
      setVisible(false)
    }
  }

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', toggleVisible)
  }

  return (
    <Button
      position="fixed"
      w="2.5rem"
      h="2.5rem"
      left="50%"
      transform="translateX(-50%)"
      bottom={visible ? '1.5rem' : '0.5rem'}
      colorScheme="orange"
      transition="all .5s"
      shadow="lg"
      opacity={visible ? 1 : 0}
      p={0}
      textAlign="center"
    >
      <FaChevronUp style={{ display: 'inline-block' }} onClick={scrollToTop} />
    </Button>
  )
}

export default ScrollButton
