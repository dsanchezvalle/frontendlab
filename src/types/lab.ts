import { ElementType } from "react";

export type LabExperiment = {
  id: string;
  title: string;
  description: string;
  icon: ElementType;
  tags: string[];
};
