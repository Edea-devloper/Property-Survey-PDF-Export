import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IPropertySurveyExportPdfProps {
  SPLibraryName: string | undefined;
  context: WebPartContext;
  SPListName: string | undefined
  SPListName_For_Subject_Data: string | undefined
  SPListName_For_Frequency: any
}
