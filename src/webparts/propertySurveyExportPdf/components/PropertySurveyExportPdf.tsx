import * as React from "react";
import type { IPropertySurveyExportPdfProps } from "./IPropertySurveyExportPdfProps";
import FirstSection from "./Section01/FirstSection";
import { fetchDocuments, getListItemById, getListItems, getListItemsByBusinessEntity } from "../Utility/SPService";
import { getQueryStringValue } from "../Utility/utils";
import { ImageSection } from "./Image_section/ImageSection";
import MainCoverPage from "./MainPage/MainCoverPage";
import Loader from "./loder/Loader";

const PropertySurveyExportPdf: React.FC<IPropertySurveyExportPdfProps> = ({
  context,
  SPListName,
  SPLibraryName,
  SPListName_For_Subject_Data,
  SPListName_For_Frequency,
  SPListName_For_AppSurvey_SiteDetail
}) => {

  const [formdata, setFormdata] = React.useState<any>({
    propertyData: null,
    property_subject_Data: [],
    property_Frequency_Data: [],
    siteDetailsData: null,
    imageUrl: '',
    filteredDocuments: [],
    isdataLoaded: false
  });

  const [loading, setLoading] = React.useState<boolean>(true);
  const [triggerExport, setTriggerExport] = React.useState<string>('');

  const fetchPropertyData = async () => {
    const idParam = getQueryStringValue("ItemId");
    const reportType = getQueryStringValue("ReportType");
    const id = Number(idParam);

    if (!idParam || isNaN(id)) {
      console.error("Invalid or missing 'ItemId' in query string.");
      setLoading(false);
      return;
    }

    if (!SPListName) {
      console.error("Invalid or missing SharePoint List Name.");
      setLoading(false);
      return;
    }

    if (!SPListName_For_Subject_Data) {
      console.error("SPListName_For_Subject_Data is undefined.");
      setLoading(false);
      return;
    }

    if (!SPListName_For_Frequency) {
      console.error("SPListName_For_Frequency is undefined.");
      setLoading(false);
      return;
    }

    try {
      // Fetch all data including property, subject, and frequency
      const [propertyItem, subjectListItems, FrequencyListItems] = await Promise.all([
        getListItemById(SPListName, id),
        getListItems(SPListName_For_Subject_Data),
        getListItems(SPListName_For_Frequency),
      ]);

      // Fetch business entity data
      let businessEntityData = null;
      const businessEntityValue = propertyItem?.BusinessEntity;
      businessEntityData = await getListItemsByBusinessEntity(
        SPListName_For_AppSurvey_SiteDetail || 'AppSurvey_SiteDetails',
        businessEntityValue
      );

      // Fetch cover image
      let imageUrl = '';
      if (propertyItem?.Form_ID && SPLibraryName) {
        imageUrl = await fetchCoverImage(propertyItem.Form_ID);
      }

      // Fetch filtered documents
      let filteredDocuments = [];
      if (propertyItem?.Form_ID && SPLibraryName) {
        filteredDocuments = await fetchFilteredDocuments(propertyItem.Form_ID);
      }

      // Update formdata with all fetched data
      setFormdata({
        propertyData: propertyItem,
        property_subject_Data: subjectListItems,
        property_Frequency_Data: FrequencyListItems,
        siteDetailsData: businessEntityData,
        imageUrl: imageUrl,
        filteredDocuments: filteredDocuments,
        isdataLoaded: true
      });

      // Handle report type for export
      // if (reportType) {
      //   const lowerReportType = reportType.toLowerCase();
      //   if (lowerReportType === "pdf") {
      //     document.querySelector<HTMLButtonElement>("#ExportPDF")?.click();
      //   } else if (lowerReportType === "excel") {
      //     document.querySelector<HTMLButtonElement>("#ExportExcel")?.click();
      //   }
      // }
      // Set trigger for export instead of clicking immediately
      if (reportType) {
        const lowerReportType = reportType.toLowerCase();
        if (lowerReportType === "pdf" || lowerReportType === "excel") {
          setTriggerExport(lowerReportType);
        }
      }

    } catch (error) {
      console.error("Error fetching item:", error);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to fetch cover image
  const fetchCoverImage = async (formId: number): Promise<string> => {
    const extensions = ['png', 'jpg', 'jpeg', 'webp', 'gif'];

    try {
      const items = await fetchDocuments(SPLibraryName || 'AppSurvey_Documents');
      const getFileName = (item: { FileLeafRef: any }) => (item.FileLeafRef || "").toLowerCase();

      // Step 1: Try to find a matching CoverImage_{Form_ID} with supported extensions
      for (const ext of extensions) {
        const expectedFileName = `coverimage_${formId}.${ext}`.toLowerCase();

        for (let i = 0; i < items.length; i++) {
          if (getFileName(items[i]) === expectedFileName) {
            return items[i].FileRef;
          }
        }
      }

      // Step 2: If not found, try finding the default image (coverimage_00.{ext})
      for (const ext of extensions) {
        const defaultFileName = `coverimage_00.${ext}`.toLowerCase();

        for (let i = 0; i < items.length; i++) {
          if (getFileName(items[i]) === defaultFileName) {
            return items[i].FileRef;
          }
        }
      }
    } catch (error) {
      console.error("Failed to fetch cover image:", error);
    }

    return '';
  };

  // Helper function to fetch filtered documents
  const fetchFilteredDocuments = async (formId: number): Promise<any[]> => {
    if (!SPLibraryName) {
      console.warn("Missing SPLibraryName.");
      return [];
    }

    try {
      const items = await fetchDocuments(SPLibraryName);

      const filtered = items.filter((obj: { FileLeafRef: string }) => {
        const match = obj.FileLeafRef.match(/^\(\d+\)\d+_\d+_\d+-(\d+)-/);
        return match && parseInt(match[1]) === formId;
      });

      return filtered;
    } catch (error) {
      console.error("Error fetching filtered documents:", error);
      return [];
    }
  };


  // Handle export after data is loaded and components are rendered
  React.useEffect(() => {
    if (triggerExport && formdata.isdataLoaded) {
      const timer = setTimeout(() => {
        if (triggerExport === "pdf") {
          console.log("Triggering PDF export...");
          document.querySelector<HTMLButtonElement>("#ExportPDF")?.click();
        } else if (triggerExport === "excel") {
          console.log("Triggering Excel export...");
          document.querySelector<HTMLButtonElement>("#ExportExcel")?.click();
        }
        setTriggerExport(''); // Reset after click
      }, 3000); // Delay to ensure all components are rendered

      return () => clearTimeout(timer);
    }
  }, [triggerExport]);

  React.useEffect(() => {
    fetchPropertyData();
  }, []);

  if (loading) return <Loader />;

  return (
    <section className='parent-container'>
      {formdata.isdataLoaded &&
        <>
          <div className="only-print">
            <MainCoverPage
              listitems={formdata.propertyData}
              SPLibraryName={SPLibraryName}
              siteDetails={formdata.siteDetailsData}
              coverPageImageURL={formdata.imageUrl}
            />
          </div>
          <FirstSection
            listitems={formdata.propertyData}
            property_subject_Data={formdata.property_subject_Data}
            property_Frequency_Data={formdata.property_Frequency_Data}
            SPLibraryName={SPLibraryName}
            form_Id={formdata.propertyData?.Form_ID}
          />
          <ImageSection
            SPLibraryName={SPLibraryName}
            form_Id={formdata.propertyData?.Form_ID}
            listitems={formdata.propertyData}
            property_subject_Data={formdata.property_subject_Data}
            columnIndex={undefined}
            filterDocForImage={formdata.filteredDocuments}
          />
        </>
      }
    </section>
  );
}

export default PropertySurveyExportPdf;








// import * as React from "react";
// import type { IPropertySurveyExportPdfProps } from "./IPropertySurveyExportPdfProps";
// import FirstSection from "./Section01/FirstSection";
// import { fetchDocuments, getListItemById, getListItems, getListItemsByBusinessEntity } from "../Utility/SPService";
// import { getQueryStringValue } from "../Utility/utils";;
// import { ImageSection } from "./Image_section/ImageSection";
// import MainCoverPage from "./MainPage/MainCoverPage";


// const PropertySurveyExportPdf: React.FC<IPropertySurveyExportPdfProps> = ({ context, SPListName, SPLibraryName, SPListName_For_Subject_Data, SPListName_For_Frequency, SPListName_For_AppSurvey_SiteDetail }) => {


//   const [formdata, setFormdata] = React.useState<any>({
//     propertyData: null,
//     property_subject_Data: [],
//     property_Frequency_Data: [],
//     isdataLoaded: false
//   });


//   const fetchPropertyData = async () => {
//     const idParam = getQueryStringValue("ItemId");
//     const reportType = getQueryStringValue("ReportType");
//     const id = Number(idParam);


//     if (!idParam || isNaN(id)) {
//       console.error("Invalid or missing 'ItemId' in query string.");
//       return;
//     }

//     if (!SPListName) {
//       console.error("Invalid or missing SharePoint List Name.");
//       return;
//     }

//     if (!SPListName_For_Subject_Data) {
//       console.error("SPListName_For_Subject_Data is undefined.");
//       return;
//     }

//     if (!SPListName_For_Frequency) {
//       console.error("SPListName_For_Frequency is undefined.");
//       return;
//     }

//     try {
//       const [propertyItem, subjectListItems, FrequencyListItems] = await Promise.all([
//         getListItemById(SPListName, id),
//         getListItems(SPListName_For_Subject_Data),
//         getListItems(SPListName_For_Frequency),
//       ]);


//       let businessEntityData = null;
//       const businessEntityValue = propertyItem?.BusinessEntity;
//       businessEntityData = await getListItemsByBusinessEntity(SPListName_For_AppSurvey_SiteDetail || 'AppSurvey_SiteDetails', businessEntityValue);


//       // ===============================================

//       // Fetch image logic
//       let imageUrl = '';
//       if (propertyItem?.Form_ID && SPLibraryName) {
//         const extensions = ['png', 'jpg', 'jpeg', 'webp', 'gif'];

//         try {
//           const items = await fetchDocuments(SPLibraryName || 'AppSurvey_Documents');
//           const getFileName = (item: { FileLeafRef: any; }) => (item.FileLeafRef || "").toLowerCase();

//           // Step 1: Try to find a matching CoverImage_{Form_ID} with supported extensions
//           for (const ext of extensions) {
//             const expectedFileName = `coverimage_${propertyItem.Form_ID}.${ext}`.toLowerCase();

//             for (let i = 0; i < items.length; i++) {
//               if (getFileName(items[i]) === expectedFileName) {
//                 imageUrl = items[i].FileRef;
//                 break;
//               }
//             }

//             if (imageUrl) break;
//           }

//           // Step 2: If not found, try finding the default image (coverimage_00.{ext})
//           if (!imageUrl) {
//             for (const ext of extensions) {
//               const defaultFileName = `coverimage_00.${ext}`.toLowerCase();

//               for (let i = 0; i < items.length; i++) {
//                 if (getFileName(items[i]) === defaultFileName) {
//                   imageUrl = items[i].FileRef;
//                   break;
//                 }
//               }

//               if (imageUrl) break;
//             }
//           }
//         } catch (error) {
//           console.error("Failed to fetch images:", error);
//         }
//       }

//       // ===============================================



//       setFormdata({
//         propertyData: propertyItem,
//         property_subject_Data: subjectListItems,
//         property_Frequency_Data: FrequencyListItems,
//         siteDetailsData: businessEntityData,
//         imageUrl: imageUrl,
//         isdataLoaded: true
//       })

// if (reportType) {
//   const lowerReportType = reportType.toLowerCase();
//   if (lowerReportType === "pdf") {
//     document.querySelector<HTMLButtonElement>("#ExportPDF")?.click();
//   } else if (lowerReportType === "excel") {
//     document.querySelector<HTMLButtonElement>("#ExportExcel")?.click();
//   }
// }

//     } catch (error) {
//       console.error("Error fetching item:", error);
//     }
//   };


//   React.useEffect(() => {
//     fetchPropertyData();
//   }, []);


//   return (
//     <section className='parent-container'>
//       {formdata.isdataLoaded &&
//         <>
//           <div className="only-print">
//             <MainCoverPage listitems={formdata.propertyData} SPLibraryName={SPLibraryName} siteDetails={formdata.siteDetailsData} coverPageImageURL={formdata.imageUrl} />
//           </div>
//           <FirstSection listitems={formdata.propertyData} property_subject_Data={formdata.property_subject_Data} property_Frequency_Data={formdata.property_Frequency_Data} SPLibraryName={SPLibraryName} form_Id={formdata.propertyData?.Form_ID} />
//           <ImageSection SPLibraryName={SPLibraryName} form_Id={formdata.propertyData?.Form_ID} listitems={formdata.propertyData} property_subject_Data={formdata.property_subject_Data} columnIndex={undefined} />
//         </>
//       }
//     </section>
//   );
// }

// export default PropertySurveyExportPdf;
