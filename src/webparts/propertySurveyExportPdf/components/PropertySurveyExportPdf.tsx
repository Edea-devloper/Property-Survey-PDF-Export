import * as React from "react";
import type { IPropertySurveyExportPdfProps } from "./IPropertySurveyExportPdfProps";
import FirstSection from "./Section01/FirstSection";
import { getListItemById, getListItems } from "../Utility/SPService";
import { getQueryStringValue } from "../Utility/utils";;
import { ImageSection } from "./Image_section/ImageSection";
import MainCoverPage from "./MainPage/MainCoverPage";


const PropertySurveyExportPdf: React.FC<IPropertySurveyExportPdfProps> = ({ context, SPListName, SPLibraryName, SPListName_For_Subject_Data, SPListName_For_Frequency }) => {

  const [propertyData, setPropertyData] = React.useState<any>(null);
  const [property_subject_Data, setProperty_subject_Data] = React.useState<any[]>([]);
  const [property_Frequency_Data, setProperty_Frequency_Data] = React.useState<any[]>([]);


  const fetchPropertyData = async () => {
    const idParam = getQueryStringValue("ItemId");
    const reportType = getQueryStringValue("ReportType");
    const id = Number(idParam);


    if (!idParam || isNaN(id)) {
      console.error("Invalid or missing 'ItemId' in query string.");
      return;
    }

    if (!SPListName) {
      console.error("Invalid or missing SharePoint List Name.");
      return;
    }

    if (!SPListName_For_Subject_Data) {
      console.error("SPListName_For_Subject_Data is undefined.");
      return;
    }

    if (!SPListName_For_Frequency) {
      console.error("SPListName_For_Frequency is undefined.");
      return;
    }

    try {
      const [propertyItem, subjectListItems, FrequencyListItems] = await Promise.all([
        getListItemById(SPListName, id),
        getListItems(SPListName_For_Subject_Data),
        getListItems(SPListName_For_Frequency),
      ]);

      setPropertyData(propertyItem);
      setProperty_subject_Data(subjectListItems);
      setProperty_Frequency_Data(FrequencyListItems);

      // Auto-select export button depending on ReportType
      if (reportType?.toLowerCase() === "pdf") {
        document.querySelector<HTMLButtonElement>("#ExportPDF")?.click();
      } else if (reportType?.toLowerCase() === "excel") {
        document.querySelector<HTMLButtonElement>("#ExportExcel")?.click();
      }

    } catch (error) {
      console.error("Error fetching item:", error);
    }
  };


  React.useEffect(() => {
    fetchPropertyData();
  }, []);

  return (
    <section className='parent-container'>
      <div className="only-print">
        <MainCoverPage listitems={propertyData} SPLibraryName={SPLibraryName} />
      </div>
      <FirstSection listitems={propertyData} property_subject_Data={property_subject_Data} property_Frequency_Data={property_Frequency_Data} SPLibraryName={SPLibraryName} form_Id={propertyData?.Form_ID} />
      <ImageSection SPLibraryName={SPLibraryName} form_Id={propertyData?.Form_ID} listitems={propertyData} property_subject_Data={property_subject_Data} columnIndex={undefined} />
    </section>
  );
}

export default PropertySurveyExportPdf;
