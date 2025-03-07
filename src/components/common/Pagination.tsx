import { HStack, VStack } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
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
        page={page}
        count={count}
        pageSize={pageSize}
        onPageChange={(e) => onPageChange(e.page)}
        size={{ smDown: "sm", md: "md" }}
      >
        <HStack>
          <PaginationPrevTrigger />
          <PaginationItems />
          <PaginationNextTrigger />
        </HStack>
      </PaginationRoot>
    </VStack>
  )
}
