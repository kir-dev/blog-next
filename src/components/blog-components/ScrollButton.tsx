import { Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FaChevronUp } from 'react-icons/fa'

const scrollToTop = (): void => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const ScrollButton: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const [fromTop, setFromTop] = useState(0)
  const [fromBottom, setFromBottom] = useState(0)

  const onScroll = () => {
    setFromTop(window.scrollY)
    setFromBottom(document.body.offsetHeight - window.innerHeight - window.scrollY)
    setVisible(fromTop > 200 && fromBottom > 200)
  }

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  })

  return (
    <Button
      position="fixed"
      w="2.5rem"
      h="2.5rem"
      right="2.5rem"
      bottom={visible ? '1.5rem' : '0.5rem'}
      colorScheme="orange"
      transition="all .5s"
      shadow="lg"
      opacity={visible ? 1 : 0}
      p={0}
      textAlign="center"
      onClick={scrollToTop}
    >
      <FaChevronUp style={{ display: 'inline-block' }} />
    </Button>
  )
}

export default ScrollButton
