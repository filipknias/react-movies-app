import { Button, Container, Heading, Highlight, Text } from "@chakra-ui/react";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <Container py={24} textAlign="center">
      <Heading
          size="6xl"
          fontWeight="bold"
          mb={8}
      >
        <Highlight query={["Not Found"]} styles={{ px: "4", bg: "teal.500", color: 'white' }}>
          Page Not Found
        </Highlight>
      </Heading>
      <Text
        fontWeight="medium"
        textStyle="xl"
        mb={12}
      >
        Sorry, the page you’re looking for doesn’t exist.
      </Text>
      <Link to="/">
        <Button
          mx="auto" 
          bg="teal.500" 
          fontWeight="semibold"
        >
          Return to dashboard
        </Button>
      </Link>
    </Container>
  )
}
