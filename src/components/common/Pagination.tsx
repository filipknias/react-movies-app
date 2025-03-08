import { HStack, VStack } from "@chakra-ui/react";
import {
  PaginationNextTrigger,
  PaginationPageText,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";

type PaginationProps = {
  page: number;
  pageSize: number;
  count: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ page, count, pageSize, onPageChange }: PaginationProps) {
  return (
    <VStack gap="4">
      <PaginationRoot 
        count={count} 
        pageSize={pageSize} 
        defaultPage={1} 
        onPageChange={(e) => onPageChange(e.page)} 
        page={page}
      >
        <HStack gap="4">
          <PaginationPrevTrigger />
          <PaginationPageText />
          <PaginationNextTrigger />
        </HStack>
      </PaginationRoot>
    </VStack>
  )
}
