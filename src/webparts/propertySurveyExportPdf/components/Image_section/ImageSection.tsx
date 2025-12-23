import * as React from "react";
// import { useEffect, useState } from "react";
import styles from "./ImageSection.module.scss";
// import { fetchDocuments } from "../../Utility/SPService";
// import Loader from "../loder/Loader";

interface ImageSectionProps {
  SPLibraryName: string | undefined;
  form_Id: number;
  listitems: any;
  property_subject_Data: any;
  columnIndex: number | undefined;
  filterDocForImage: any;
}
interface PropertySubjectItem {
  Area: unknown;
  Subject: any;
  Chapter: string;
  Order0: string | number;
  frequencylpId: any;
  columnIndex: number | undefined
  property_subject_Data?: any
}


const ImageBlock = ({
  title,
  label,
  docs,
  header,
  dataKey,
  listitems,
  columnIndex,
  property_subject_Data
}: {
  title: string;
  label: string;
  docs: any[];
  header?: string;
  dataKey?: any
  listitems?: any
  columnIndex?: number | undefined
  property_subject_Data?: any
}) => {
 
  // Filter Images matching the given label
  const matchingDocs = docs.filter((doc) => {
    if (!doc.FileLeafRef) return false;

    const fileName = doc.FileLeafRef;

    // Special case for 2.7 Plan or Photo
    if (label === "-2,7-||Plan" || label === "-2,7-||Photo") {
      const [prefix, suffix] = label.split("||"); // prefix: "-2,7-", suffix: "Plan" or "Photo"

      const hasPrefix = fileName.includes(prefix);
      const endsWithSuffix = new RegExp(`${suffix}\\.(jpg|jpeg|png|webp|gif)$`, 'i').test(fileName);

      return hasPrefix && endsWithSuffix;
    }

    // Default matching
    return fileName.includes(label);
  });


  if (matchingDocs.length === 0) return null;

  
  function extractRowIndex(fileName: string): number | null {
    const match = fileName.match(/-(\d+)\.(jpg|png|jpeg|webp|gif)$/i);
    return match ? parseInt(match[1], 10) - 1 : null; // -1 for 0-based index
  }


  function parsePropertyDataField(fieldValue: string): { rows: string[][] } {
    const rows = fieldValue ? fieldValue.split('||,')?.map((item: string) => item.split('||')) : [];
    return { rows };
  }

  const buildPropertyData = (
    fieldValue: string,
  ): { data: ReturnType<typeof parsePropertyDataField> } => {
    const data = parsePropertyDataField(fieldValue);
    return {
      data
    };
  };

  const propertyData = {
    '2.4.1': buildPropertyData(listitems?.Payments1),
    '2.4.2': buildPropertyData(listitems?.Payments2),
    '2.4.3': buildPropertyData(listitems?.Payments3),
    '2.4.4': buildPropertyData(listitems?.Payments4),
    '2.4.5': buildPropertyData(listitems?.Payments5),
    '2.4.6': buildPropertyData(listitems?.Payments6),
    '2.4.7': buildPropertyData(listitems?.Payments7),
    '2.4.8': buildPropertyData(listitems?.Payments8),
    '2.6': buildPropertyData(listitems?.PropertyPlans),
    '2.7': buildPropertyData(listitems?.SystemProperty),
    '3.1': buildPropertyData(listitems?.EngagementAgreements),
    '3.2': buildPropertyData(listitems?.CorrectnessTests),
    '3.3': buildPropertyData(listitems?.PeriodicExaminations),
    '3.4': buildPropertyData(listitems?.OperationalTests),
  };


  const chapterList = ["2,7", "3,1", "3,2", "3,3", "3,4"];
  const chapterDataMap: Record<string, Array<PropertySubjectItem>> = chapterList.reduce(
    (acc, chapter) => {
      acc[chapter] = property_subject_Data.filter((x: PropertySubjectItem) => x.Chapter === chapter);
      return acc;
    },
    {} as Record<string, Array<PropertySubjectItem>>
  );

  return (
    <div className="page-section01">
      <div className={styles.section}>
        {header && <div className={styles["header-section"]}>{header}</div>}
        {/* <div className={styles.heading}>{title}</div> */}
        <div className={`${styles.heading} pdf_lbl`}>{title}</div>
        <div className={styles.imagecontent}>

          {matchingDocs?.map((doc, index) => {
            let rowValue: string = doc.FileLeafRef;

            // Special handling for chapters in chapterList
            if (dataKey && dataKey == '2,7' || dataKey == '3,1' || dataKey == '3,2' || dataKey == '3,3' || dataKey == '3,4') {
              const chapterItems = chapterDataMap[dataKey];
              // const match = chapterItems.find((item: { Subject: any; }) => doc.FileLeafRef.includes(item.Subject));
              let match = null;
              for (let i = 0; i < chapterItems.length; i++) {
                const item = chapterItems[i];
                if (doc.FileLeafRef.includes(item.Subject)) {
                  match = item;
                  break;
                }
              }
              if (match) {
                rowValue = match.Subject;
              }
            } else {
              const rowIndex = extractRowIndex(doc.FileLeafRef);
              if (
                rowIndex !== null &&
                typeof columnIndex === 'number' &&
                dataKey &&
                dataKey in propertyData &&
                propertyData[dataKey as keyof typeof propertyData]?.data?.rows?.[rowIndex]?.[columnIndex] !== undefined
              ) {
                rowValue = propertyData[dataKey as keyof typeof propertyData]!?.data?.rows[rowIndex][columnIndex];
              }
            }


            return (
              <div key={index} className={styles.img_Title_container}>
                <p>{rowValue}</p>
                <img src={`${window.origin}${doc.FileRef}`} alt={doc.Title || ""} />
              </div>
            )
          })}


        </div>
      </div>
    </div>
  );
};


export const ImageSection: React.FC<ImageSectionProps> = ({
  SPLibraryName,
  form_Id,
  listitems,
  property_subject_Data,
  filterDocForImage
}) => {
  // const [filteredDocuments, setFilteredDocuments] = useState<any[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);

  // const loadDocuments = async () => {
  //   if (!SPLibraryName || form_Id === undefined || form_Id === null) {
  //     console.warn("Missing SPLibraryName or form_Id.");
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //     const items = await fetchDocuments(SPLibraryName);

  //     const filtered = items.filter((obj: { FileLeafRef: string }) => {
  //       const match = obj.FileLeafRef.match(/^\(\d+\)\d+_\d+_\d+-(\d+)-/);
  //       return match && parseInt(match[1]) === form_Id;
  //     });

  //     setFilteredDocuments(filtered);
  //   } catch (error) {
  //     console.error("Error fetching documents:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (SPLibraryName && form_Id) {
  //     loadDocuments();
  //   }
  // }, [SPLibraryName, form_Id]);

  // if (loading) return <Loader />;

  const imageSections = [
    {
      title: "2.4.1 -  עירייה  ארנונה",
      label: "תשלומים על הנכ_ מיסי עירייה ארנונה",
      header: "2.4 - תשלומים על הנכס",
      dataKey: "2.4.1",
      columnIndex: 7,
    },
    {
      title: "2.4.2 - תאגיד המים",
      label: "תשלומים על הנכ_ מיסי עירייה מים",
      dataKey: "2.4.2",
      columnIndex: 7,
    },
    {
      title: "2.4.3 - חברת חשמל",
      label: "תשלומים על הנכ_חברת חשמל",
      dataKey: "2.4.3",
      columnIndex: 7,
    },
    {
      title: "2.4.4 - ניקיון",
      label: "תשלומים על הנכ_ניקיון",
      dataKey: "2.4.4",
      columnIndex: 7,
    },
    {
      title: "2.4.5 - אבטחה",
      label: "תשלומים על הנכ_שמירה_ סדרן",
      dataKey: "2.4.5",
      columnIndex: 7,
    },
    {
      title: "2.4.6 - ועד הביניין",
      label: "תשלומים על הנכ_ועד הבניין",
      dataKey: "2.4.6",
      columnIndex: 7,
    },
    {
      title: "2.4.7 - חניות",
      label: "תשלומים על הנכ_חניות",
      dataKey: "2.4.7",
      columnIndex: 7,
    },
    {
      title: "להוסיף אחר... - 2.4.8",
      label: "תשלומים על הנכ_לכתוב כאן",
      dataKey: "2.4.8",
      columnIndex: 7,
    },
    {
      title: "2.6 - תכניות של הנכס",
      label: "תכניות של הנכס",
      dataKey: "2.6",
      columnIndex: 5,
    },
    {
      title: "2.7 - המערכות בנכס(Plan)",
      // label: "חשמל-לוח חשמל מתח גבוהPlan",
      label: "-2,7-||Plan",
      dataKey: "2,7",
    },
    {
      title: "2,7 - המערכות בנכס(Photo)",
      // label: "חשמל-לוח חשמל מתח גבוהPhoto",
      label: "-2,7-||Photo",
      dataKey: "2,7",
    },
    {
      title: "3.1 - הסכמי התקשרות עם נותני שירות",
      // label: "ביטחון-מערכת",
      label: "-3,1-",
      dataKey: "3,1",
    },
    {
      title: "3.2 - בדיקות כשירות ותקינות מערכות בטיחות",
      label: "-3,2-",
      dataKey: "3,2",
    },
    {
      title: "3.3 - .בדיקות טיפולים תקופתיים למערכות",
      // label: "מתח גבוה-חשמל",
      label: "-3,3-",
      dataKey: "3,3",
    },
    {
      title: "3.4 - .בדיקות תפעוליות של המערכות",
      label: "-3,4-",
      dataKey: "3,4",
    },
  ];

  return (
    <div className={styles.mainContainer}>
      {imageSections?.map((section, idx) => (
        <ImageBlock
          key={idx}
          title={section.title}
          label={section.label}
          header={section.header}
          docs={filterDocForImage}
          dataKey={section.dataKey}
          listitems={listitems}
          columnIndex={section.columnIndex}
          property_subject_Data={property_subject_Data}
        />
      ))}
    </div>
  );
};
