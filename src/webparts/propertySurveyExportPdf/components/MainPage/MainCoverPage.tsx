import * as React from 'react';
import styles from './MainCoverPage.module.scss';
import { formatDateToDDMMYYYY, getQueryStringValue } from '../../Utility/utils';
// import { fetchDocuments } from '../../Utility/SPService';


const Left_Side_Image = require('./Aviv(jpg).jpg')
const Right_Side_Image = require('./Right.jpg')

interface MainCoverPageProps {
  listitems: ListItem;
  SPLibraryName: string | undefined | any;
  siteDetails: any | null | undefined;
  coverPageImageURL: any;
}
interface ListItem {
  SealStructure: any;
  BusinessEntity: string | number | readonly string[] | undefined;
  QuantitativeData: any;
  PropertyDetails: any;
  OData__x0037__x002e_2: string;
  OData__x0037__x002e_1: string;
  OData__x0036__x002e_1: string;
  OData__x0035__x002e_2: string;
  OData__x0035__x002e_1: string;
  OData__x0034__x002e_4: string;
  OData__x0034__x002e_3: string;
  OData__x0034__x002e_2: string;
  Environmental: string;
  InformationOperation: string;
  OperationalTests: string;
  PeriodicExaminations: string;
  CorrectnessTests: string;
  PropertyPlans: string;
  EngagementAgreements: string;
  Payments8: any;
  Payments7: any;
  Payments6: any;
  Payments5: any;
  Payments4: any;
  Payments3: any;
  Payments2: any;
  Payments1: any;
  Form_ID: string | number | readonly string[] | undefined;
  Date: any;
  Names1: string;
  Names2: string;
  ResponsibleOps: string;
  NumberofOps: string;
  SystemProperty: string;
  District: string;
}


function stripHtmlTags(html: string) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}


export const MainCoverPage: React.FC<MainCoverPageProps> = ({ listitems, SPLibraryName, siteDetails, coverPageImageURL }) => {

  console.log(siteDetails)

  const Lookup_Field_Section_1 = listitems?.PropertyDetails?.split('||') || []
  const rawCity = siteDetails[0]?.OData__x05e2__x05d9__x05e8_ || '';
  const City = rawCity.replace(/<[^>]+>/g, '').trim();
  // const [imageUrl, setImageUrl] = React.useState<string>('');
  const idParam = getQueryStringValue("ItemId");
  const id = Number(idParam);

  // React.useEffect(() => {
  //   const fetchImage = async () => {
  //     // Validate query param
  //     if (!idParam || isNaN(id)) {
  //       console.error("Invalid or missing 'ItemId' in query string.");
  //       return;
  //     }

  //     // Possible image file extensions to check
  //     const extensions = ['png', 'jpg', 'jpeg', 'webp', 'gif'];

  //     try {
  //       // Fetch all documents from the given SharePoint library
  //       const items = await fetchDocuments(SPLibraryName);
  //       const getFileName = (item: any) => (item.FileLeafRef || "").toLowerCase();

  //       let selectedImageUrl = '';

  //       // Step 1: Try to find a matching CoverImage_{Form_ID} with supported extensions
  //       for (const ext of extensions) {
  //         const expectedFileName = `coverimage_${listitems?.Form_ID}.${ext}`.toLowerCase();

  //         for (let i = 0; i < items.length; i++) {
  //           if (getFileName(items[i]) === expectedFileName) {
  //             selectedImageUrl = items[i].FileRef;
  //             break;
  //           }
  //         }

  //         if (selectedImageUrl) break; // Exit outer loop early if image found
  //       }

  //       // Step 2: If not found, try finding the default image (coverimage_00.{ext})
  //       if (!selectedImageUrl) {
  //         for (const ext of extensions) {
  //           const defaultFileName = `coverimage_00.${ext}`.toLowerCase();

  //           for (let i = 0; i < items.length; i++) {
  //             if (getFileName(items[i]) === defaultFileName) {
  //               selectedImageUrl = items[i].FileRef;
  //               break;
  //             }
  //           }

  //           if (selectedImageUrl) break;
  //         }
  //       }

  //       // Update the image URL state (if found)
  //       setImageUrl(selectedImageUrl);
  //     } catch (error) {
  //       console.error("Failed to fetch images:", error);
  //     }
  //   };

  //   fetchImage();
  // }, [listitems?.Form_ID, SPLibraryName]);


  if (!listitems?.Form_ID || isNaN(id)) {
    return <div className={styles.invalidItemlbl}>Invalid item ID</div>;
  }

  return (
    <div className='page-section01'>
      <div className={styles.coverPage}>
        <div className={styles.header}>
          <img src={Left_Side_Image} className={styles.logoRight} alt="Health Ministry Logo" />
          <div className={styles.headerText}>
            <p style={{ fontWeight: '700' }}>מחלקת נכסים</p>
            <p style={{ color: '#0073c6', fontWeight: '700' }}>משרד הבריאות</p>
            {/* <p style={{ color: '#a6c441', fontWeight: '700' }}>אביב ניהול נכסים ולוגיסטיקה</p> */}
            <p style={{ color: '#a6c441', fontWeight: '700' }}>נכסים</p>
          </div>
          <img src={Right_Side_Image} className={styles.logoLeft} alt="AVIV Logo" />
        </div>

        <div className={styles.formSection}>

          <div className={styles.fieldRow}>
            <div style={{ display: 'flex', textAlign: 'right', width: '100%' }}>
              <label style={{ fontWeight: '700', width: '23%' }}>תחנה :</label>
              <p style={{
                    border: 'none',
                    borderBottom: '3px solid',
                    paddingBottom: '13px',
                    fontSize: '35px',
                    background: 'none',
                    paddingTop: '13px',
                    width: '100%'
                  }}>
                {Lookup_Field_Section_1[6] || ''}
              </p>
            </div>
          </div>

          <div className={styles.fieldRow}>
            <div style={{ display: 'flex', textAlign: 'right', width: '100%' }}>
              <label style={{ width: '25%' }}>כתובת :</label>
               <p style={{
                    border: 'none',
                    borderBottom: '3px solid',
                    paddingBottom: '13px',
                    fontSize: '35px',
                    background: 'none',
                    paddingTop: '13px',
                    width: '100%'
                  }}>
               {stripHtmlTags(Lookup_Field_Section_1[10] || '')}
              </p>
          
            </div>
          </div>

          <div className={styles.fieldRow}>
            <div style={{ display: 'flex', textAlign: 'right', width: '100%' }}>
              <label style={{ width: '23%' }}>עיר :</label>
               <p style={{
                    border: 'none',
                    borderBottom: '3px solid',
                    paddingBottom: '13px',
                    fontSize: '35px',
                    background: 'none',
                    paddingTop: '13px',
                    width: '100%'
                  }}>
               {City || ''}
              </p>
            </div>
          </div>

          <div className={styles.fieldRow} style={{ paddingRight: '0px' }}>
            <div style={{ display: 'flex', textAlign: 'right', width: '100%' }}>
              <label style={{ width: '100%' }}>יישות עסקית מספר :</label>
              <p style={{
                    border: 'none',
                    borderBottom: '3px solid',
                    paddingBottom: '13px',
                    fontSize: '35px',
                    background: 'none',
                    paddingTop: '13px',
                    width: '100%'
                  }}>
              {listitems?.BusinessEntity || ''}
              </p>
            </div>
          </div>

        </div>

        {/* <div className={styles.formSection}>
          <div className={styles.fieldRow}>
           
              <label className={styles.label}>תחנה :</label>
              <input
                type="text"
                className={styles.inputField}
                value={Lookup_Field_Section_1[6] || ''}
              />
           
          </div>

          <div className={styles.fieldRow}>
          
              <label className={styles.label}>כתובת :</label>
              <input
                type="text"
                className={styles.inputField}
                value={stripHtmlTags(Lookup_Field_Section_1[10] || '')}
              />
           
          </div>

          <div className={styles.fieldRow}>
              <label className={styles.label}>עיר :</label>
              <input
                type="text"
                className={styles.inputField}
                value={City || ''}
              />
           
          </div>

          <div className={styles.fieldRow}>
              <label className={styles.label}>יישות עסקית מספר :</label>
              <input
                type="text"
                className={styles.inputField}
                value={listitems?.BusinessEntity || ''}
              />
           
          </div>
        </div> */}

        <div className={styles.imageSection}>
          <img src={`${window.location.origin}${coverPageImageURL}`} loading="eager" alt="House" className={styles.houseImage} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <div className={styles.footercontainer} style={{ width: '100%' }}>
            <label style={{ background: 'none', fontSize: '37px', marginTop: '15px', textAlign: 'right', marginBottom: '15px' }}>
              {formatDateToDDMMYYYY(listitems?.Date?.split('T')[0])}
            </label>
            <div className={styles.footer}>
              הסקר/הסיור בוצע בתאריך
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCoverPage;


