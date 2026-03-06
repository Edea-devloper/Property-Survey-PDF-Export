import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "PropertySurveyExportPdfWebPartStrings";
import PropertySurveyExportPdf from "./components/PropertySurveyExportPdf";
import { IPropertySurveyExportPdfProps } from "./components/IPropertySurveyExportPdfProps";
import { initializeSP } from "./Utility/SPService";
import { LIBRARY_NAME, LIST_NAME, LIST_NAME_SUBJECT,List_Frequency, AppSurvey_SiteDetail } from "./Utility/ConstantList";

export interface IPropertySurveyExportPdfWebPartProps {
  SPListName_For_Frequency: string | undefined;
  SPListName_For_Subject_Data: string | undefined;
  SPListName: string | undefined;
  SPLibraryName: string | undefined;
  SPListName_For_AppSurvey_SiteDetail: string | undefined;
}

export default class PropertySurveyExportPdfWebPart extends BaseClientSideWebPart<IPropertySurveyExportPdfWebPartProps> {
  public async onInit(): Promise<void> {
    console.log('property-survey-export-pdf-and-excel-v27 Jan 21, 2026')
    await super.onInit();
    await initializeSP(this.context);
  }

  public render(): void {
    const element: React.ReactElement<IPropertySurveyExportPdfProps> =
      React.createElement(PropertySurveyExportPdf, {
        context: this.context,
        SPListName: this.properties.SPListName || LIST_NAME,
        SPLibraryName: this.properties.SPLibraryName ||  LIBRARY_NAME,
        SPListName_For_Subject_Data: this.properties.SPListName_For_Subject_Data || LIST_NAME_SUBJECT,
        SPListName_For_Frequency: this.properties.SPListName_For_Frequency || List_Frequency,
        SPListName_For_AppSurvey_SiteDetail: this.properties.SPListName_For_AppSurvey_SiteDetail || AppSurvey_SiteDetail
      });

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "",
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("SPListName", {
                  label: "Enter List Name For AppSurvey SiteData",
                  value: this.properties.SPListName,
                }),
                PropertyPaneTextField("SPLibraryName", {
                  label: "Enter Library Name For AppSurvey Documents",
                  value: this.properties.SPLibraryName,
                }),
                PropertyPaneTextField("SPListName_For_Subject_Data", {
                  label: "Enter List Name For AppSurvey Subjects",
                  value: this.properties.SPListName_For_Subject_Data,
                }),
                PropertyPaneTextField("SPListName_For_Frequency", {
                  label: "Enter List Name For AppSurvey Frequency",
                  value: this.properties.SPListName_For_Frequency,
                }),
                PropertyPaneTextField("SPListName_For_AppSurvey_SiteDetail", {
                  label: "Enter List Name For AppSurvey SiteDetail",
                  value: this.properties.SPListName_For_AppSurvey_SiteDetail,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
