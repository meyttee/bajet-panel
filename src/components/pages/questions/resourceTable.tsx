import { cn } from "@/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components";
import { IRetrievedDoc } from "@/services";

interface DataTableSkeletonProps extends React.ComponentProps<"div"> {
  column: IRetrievedDoc[];
  rowCount?: number;
  filterCount?: number;
  cellWidths?: string[];
  withViewOptions?: boolean;
  withPagination?: boolean;
  shrinkZero?: boolean;
}

function ResourceTable({
  column,
  cellWidths = ["auto"],
  shrinkZero = false,
}: DataTableSkeletonProps) {
  const cozyCellWidths = Array.from(
    { length: column.length },
    (_, index) => cellWidths[index % cellWidths.length] ?? "auto",
  );

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          {["doc_name", "doc_title", "start_page", "chunk_text"].map(
            (title, cellIndex) => (
              <TableHead
                key={cellIndex}
                style={{
                  width: cozyCellWidths[cellIndex],
                  minWidth: shrinkZero ? cozyCellWidths[cellIndex] : "auto",
                  textAlign: "center",
                }}
              >
                {title}
              </TableHead>
            ),
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {column.map((c, i) => (
          <TableRow key={i} className="hover:bg-transparent">
            <TableCell
              style={{
                width: cozyCellWidths[i],
                minWidth: shrinkZero ? cozyCellWidths[i] : "auto",
              }}
              className="truncate text-center"
            >
              {c.metadata.doc_name}
            </TableCell>
            <TableCell
              style={{
                width: cozyCellWidths[i],
                minWidth: shrinkZero ? cozyCellWidths[i] : "auto",
              }}
              className="truncate text-center"
            >
              {c.document_title}
            </TableCell>
            <TableCell
              style={{
                width: cozyCellWidths[i],
                minWidth: shrinkZero ? cozyCellWidths[i] : "auto",
              }}
              className="truncate text-center"
            >
              {c.metadata.start_page}
            </TableCell>
            <TableCell
              style={{
                width: cozyCellWidths[i],
                maxWidth: "400px",
              }}
              className="truncate text-center"
            >
              {c.chunk_text}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ResourceTable;
