import { HStack, Stack } from "@chakra-ui/react";
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
    <Stack gap="4">
      <PaginationRoot
        page={page}
        count={count}
        pageSize={pageSize}
        onPageChange={(e) => onPageChange(e.page)}
      >
        <HStack>
          <PaginationPrevTrigger />
          <PaginationItems />
          <PaginationNextTrigger />
        </HStack>
      </PaginationRoot>
    </Stack>
  )
}
