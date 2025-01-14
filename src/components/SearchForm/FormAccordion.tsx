import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { ReactNode } from "react";

export const FormAccordion = ({
  id,
  isExpanded = false,
  onChange,
  children,
  title,
}: {
  id: string;
  isExpanded?: boolean;
  onChange: () => void;
  children: ReactNode;
  title: ReactNode;
}) => {
  const accordionSummarySx = {
    "&": { minHeight: "1em" },
    ".MuiAccordionSummary-content": {
      my: 1,
    },
    "&.Mui-expanded": { minHeight: "1em" },
    ".MuiAccordionSummary-content.Mui-expanded": {
      my: 1,
    },
  };

  return (
    <Accordion expanded={isExpanded} onChange={onChange}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${id}-content`}
        id={`${id}-header`}
        sx={accordionSummarySx}
      >
        {title}
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};
