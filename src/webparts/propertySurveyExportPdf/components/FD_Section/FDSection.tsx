
import * as React from 'react';
import styles from '../Section03/Section_31_32_33_34_35.module.scss';
import { fetchDocuments } from "../../Utility/SPService";

const defaultIMG = require('./DefalultIMGforFDSection.jpg')


interface Section31Props {
    chapter_data_31: any
    FDSection_data: any
    SPLibraryName: string | undefined;
    form_Id: number;
}

const Section_31: React.FC<Section31Props> = ({
    chapter_data_31,
    FDSection_data,
    SPLibraryName,
    form_Id
}) => {

    const [loading, setLoading] = React.useState<boolean>(true);
    const [filteredDocuments, setFilteredDocuments] = React.useState<any[]>([]);

    // Load documents based on form_Id
    const loadDocuments = async () => {
        if (!SPLibraryName || form_Id === undefined || form_Id === null) {
            console.warn('Missing SPLibraryName or form_Id.');
            setLoading(false);
            return;
        }

        try {
            const items = await fetchDocuments(SPLibraryName);

            // Get all file name bases from FDSection_data
            const fileNamesToMatch = FDSection_data?.data?.rows?.map((row: any[]) => row[1]);

            // Filter documents where FileLeafRef starts with one of those names
            const filtered = items.filter((item: any) => {
                return fileNamesToMatch?.some((baseName: string) =>
                    item?.FileLeafRef?.startsWith(baseName)
                );
            });

            setFilteredDocuments(filtered);
        } catch (error) {
            console.error('Error fetching documents:', error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        if (SPLibraryName && form_Id) {
            loadDocuments();
        }
    }, [SPLibraryName, form_Id]);

    console.log(loading)
    const AvivAppLogologo = require('../Image/AvivAppLogo.jpg')
    const AvivLogo = require('../Image/AvivLogo.png')

    return (
        <>
            <div>
                <div className="header-main">
                    <img src={AvivAppLogologo} alt="AVIV Logo" className="logo" />
                    <div className="center-info">
                        מינהלת נכסים<br />
                        <a href="#">משרד הבריאות</a><br />
                        <span>נכסים</span>
                    </div>
                    <img src={AvivLogo} alt="Ministry Logo" className="logo" />
                </div>
                <div className={styles['container-section']}>
                    <div className={`${styles['header-section']} ${styles.h_direction_31} chunkrowTitle`}>ממצאים</div>
                    <table id='table31' className={styles['custom-table']}>
                        <tbody className='chunkrow'>
                            {FDSection_data?.data?.flags?.map((isChecked: any, index: any) => {

                                const row = FDSection_data?.data?.rows[index];

                                const isRowEmpty = [row[0], row[1], row[2]]
                                    .every(val => !val || val?.toString()?.trim() === '');


                                if (isRowEmpty) return null;

                                let matchedDoc = null;

                                for (let i = 0; i < filteredDocuments.length; i++) {
                                    const doc = filteredDocuments[i];
                                    if (doc?.FileLeafRef?.startsWith(row[1])) {
                                        matchedDoc = doc;
                                        break; // stop after finding the first match
                                    }
                                }


                                return (
                                    <tr key={index} className={styles['FDSection']}>
                                        <div>
                                            <label>פרק</label>
                                            <td style={{ width: '190px' }}><input type="text" value={FDSection_data?.data?.rows[index][0]} readOnly /></td>
                                        </div>
                                        <div className={styles.FdsectionIMGcontainer}>
                                            <img
                                                src={matchedDoc ? `${window.location.origin}${matchedDoc.FileRef}` : defaultIMG}
                                                alt="document"
                                                style={{ maxWidth: '250px', height: 'auto' }}
                                            />

                                        </div>
                                        <div>
                                            <label>ממצאים</label>
                                            <td style={{ width: '800px' }}><textarea rows={2} readOnly style={{ height: '90px', direction: 'rtl' }}>{FDSection_data?.data?.rows[index][2]}</textarea></td>
                                            {/* <label>הועלה ב-9/16/2025</label> */}
                                        </div>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Section_31;
