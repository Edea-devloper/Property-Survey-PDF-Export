import * as React from 'react';
import styles from './MainCoverPage.module.scss';
import { formatDateToDDMMYYYY, getQueryStringValue } from '../../Utility/utils';
import { fetchDocuments } from '../../Utility/SPService';


const Left_Side_Image = require('./Aviv(jpg).jpg')
const Right_Side_Image = require('./Right.jpg')

interface MainCoverPageProps {
  listitems: ListItem;
  SPLibraryName: string | undefined | any;
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
}


export const MainCoverPage: React.FC<MainCoverPageProps> = ({ listitems, SPLibraryName }) => {

  const Lookup_Field_Section_1 = listitems?.PropertyDetails?.split('||') || []
  const [imageUrl, setImageUrl] = React.useState<string>('');
  const idParam = getQueryStringValue("ItemId");
  const id = Number(idParam);

  React.useEffect(() => {
    const fetchImage = async () => {
      // Validate query param
      if (!idParam || isNaN(id)) {
        console.error("Invalid or missing 'ItemId' in query string.");
        return;
      }

      // Possible image file extensions to check
      const extensions = ['png', 'jpg', 'jpeg', 'webp', 'gif'];

      try {
        // Fetch all documents from the given SharePoint library
        const items = await fetchDocuments(SPLibraryName);
        const getFileName = (item: any) => (item.FileLeafRef || "").toLowerCase();

        let selectedImageUrl = '';

        // Step 1: Try to find a matching CoverImage_{Form_ID} with supported extensions
        for (const ext of extensions) {
          const expectedFileName = `coverimage_${listitems?.Form_ID}.${ext}`.toLowerCase();

          for (let i = 0; i < items.length; i++) {
            if (getFileName(items[i]) === expectedFileName) {
              selectedImageUrl = items[i].FileRef;
              break;
            }
          }

          if (selectedImageUrl) break; // Exit outer loop early if image found
        }

        // Step 2: If not found, try finding the default image (coverimage_00.{ext})
        if (!selectedImageUrl) {
          for (const ext of extensions) {
            const defaultFileName = `coverimage_00.${ext}`.toLowerCase();

            for (let i = 0; i < items.length; i++) {
              if (getFileName(items[i]) === defaultFileName) {
                selectedImageUrl = items[i].FileRef;
                break;
              }
            }

            if (selectedImageUrl) break;
          }
        }

        // Update the image URL state (if found)
        setImageUrl(selectedImageUrl);
      } catch (error) {
        console.error("Failed to fetch images:", error);
      }
    };

    fetchImage(); // Run on mount or whenever dependencies change
  }, [listitems?.Form_ID, SPLibraryName]);


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
            <p style={{ color: '#a6c441', fontWeight: '700' }}>אביב ניהול נכסים ולוגיסטיקה</p>
          </div>
          <img src={Right_Side_Image} className={styles.logoLeft} alt="AVIV Logo" />
        </div>

        <div className={styles.formSection}>
          <div className={styles.fieldRow}>
            <label style={{ fontWeight: '700' }}>תחנה :</label>
            <div style={{ display: 'block', textAlign: 'right' }}>
              <label style={{ background: 'none', paddingRight: '15px', width: '100%', fontSize: '37px', }}>{Lookup_Field_Section_1[6] || ''}</label>
              <div className={styles.underline}></div>
            </div>
          </div>
          <div className={styles.fieldRow}>
            <label>רחוב :</label>
            <div style={{ display: 'block', textAlign: 'right' }}>
              <label style={{ background: 'none', paddingRight: '15px', width: '100%', fontSize: '37px', }}>{Lookup_Field_Section_1[10] || ''}</label>
              <div className={styles.underline} style={{ width: '1285px' }}></div>
            </div>
          </div>
          <div className={styles.fieldRow}>
            <label>עיר :</label>
            <div className={styles.underline} style={{ marginTop: '80px', width: '1316px' }}></div>
          </div>
          <div className={styles.fieldRow} style={{ paddingRight: '0px' }}>
            <label>יישות עסקית מספר :</label>
            <div style={{ display: 'block', textAlign: 'right' }}>
              <label style={{ background: 'none', paddingRight: '15px', width: '100%', fontSize: '37px', }}>{listitems?.BusinessEntity}</label>
              <div className={styles.underline} style={{ width: '1015px' }}></div>
            </div>
          </div>
        </div>

        <div className={styles.imageSection}>
          <img src={`${window.location.origin}${imageUrl}`} alt="House" className={styles.houseImage} />
        </div>

        <div className={styles.footercontainer}>
          <label style={{ background: 'none', width: '100%', fontSize: '37px', marginTop: '53px', textAlign: 'right' }}>
            {formatDateToDDMMYYYY(listitems?.Date?.split('T')[0])}
          </label>
          <div className={styles.footer}>
            הסקר/הסיור בוצע בתאריך
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCoverPage;


