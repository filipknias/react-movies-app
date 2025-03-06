import { Button, Card, Heading, Highlight } from "@chakra-ui/react";

type ErrorBoxProps = {
  errorMessage: string;
  retryFunction: () => void;
  retryLoading: boolean;
}

export default function ErrorBox({ errorMessage, retryFunction, retryLoading }: ErrorBoxProps) {
  return (
    <Card.Root bg="red.200" borderColor="red.400" maxW="xl" mx="auto">
      <Card.Body textAlign="center">
        <Heading
          size="4xl"
          fontWeight="bold"
          mb={4}
        >
          <Highlight query={["Error occurred"]} styles={{ px: "4", bg: "red.500", color: 'white' }}>
            Error occurred
          </Highlight>
        </Heading>
        <Card.Title color="red.600">{errorMessage}</Card.Title>
      </Card.Body>
      <Card.Footer>
        <Button 
          mx="auto" 
          bg="red.500" 
          fontWeight="semibold"
          onClick={retryFunction}
          loading={retryLoading}
        >
          Try Again
        </Button>
      </Card.Footer>
    </Card.Root>
  )
}
