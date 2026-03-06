
import * as React from 'react';
import styles from './Section_31_32_33_34_35.module.scss';
import { formatDateToDDMMYYYY } from '../../Utility/utils';


interface Section33Props {
    section_33_data: any;
    chapter_data_33: any;
    property_Frequency_Data: any
}

const AvivAppLogologo = require('../Image/AvivAppLogo.jpg')
const AvivLogo = require('../Image/AvivLogo.png')

const Section_33: React.FC<Section33Props> = ({
    section_33_data,
    chapter_data_33,
    property_Frequency_Data
}) => {

    return (
        <>
            <div>
                <div className="header-main">
                    <img src={AvivAppLogologo} alt="AVIV Logo" className="logo" />
                    <div className="center-info">
                        מינהלת הנכסים<br />
                        <a href="#">משרד הבריאות</a><br />
                        <span>אגף הנכסים</span>
                    </div>
                    <img src={AvivLogo} alt="Ministry Logo" className="logo" />
                </div>
                <div className={styles['container-section']}>
                    <div className={`${styles.header} ${styles.h_direction_33} chunkrowTitle`}>3.3 - .בדיקות טיפולים תקופתיים למערכות</div>
                    <table id='table33' className={styles['custom-table']}>
                        <thead className='chunkrowHeader'>
                            <tr>
                                <th style={{ paddingRight: '26px' }}>סעיף</th>
                                <th>נושא</th>
                                {/* <th>תחום מקצועי</th> */}
                                <th>שם ספק או אחראי</th>
                                <th>מועד הבדיקה האחרונה</th>
                                <th>תדירות</th>
                                {/* <th>מועד הבדיקה הבאה</th> */}
                                {/* <th>סטטוס</th> */}
                                {/* <th>טיב השירות</th> */}
                                <th>הערות </th>
                                {/* <th>המלצות לתיקון</th> */}
                            </tr>
                        </thead>
                        <tbody className='chunkrow'>
                            {section_33_data?.data?.flags?.map((isChecked: any, index: any) => {

                                const currentOrder = Number(section_33_data?.data?.rows[index][0]);
                                let matchedChapter = null;
                                for (let i = 0; i < chapter_data_33.length; i++) {
                                    if (chapter_data_33[i]?.Order0 === currentOrder) {
                                        matchedChapter = chapter_data_33[i];
                                        break;
                                    }
                                }

                                let frequencyTitle = '';
                                if (matchedChapter?.frequencylpId) {
                                    for (let j = 0; j < property_Frequency_Data?.length; j++) {
                                        if (property_Frequency_Data[j]?.ID === matchedChapter.frequencylpId) {
                                            frequencyTitle = property_Frequency_Data[j].Title;
                                            break;
                                        }
                                    }
                                }

                                const row = section_33_data?.data?.rows[index];

                                const isRowEmpty =
                                    [row[1], row[2], row[4], row[6], row[7], row[8], row[9]]
                                        .every(val => !val || val?.toString()?.trim() === '');

                                if (isRowEmpty) return null

                                return (
                                    // <tr key={index} className={styles['section3_3']}>
                                    //     <td style={{ paddingRight: '26px', direction: 'ltr' }}>{matchedChapter ? `${matchedChapter.Chapter},${matchedChapter.Order0}` : '-'}</td>
                                    //     <td>{matchedChapter ? matchedChapter.Subject : '-'}</td>
                                    //     <td style={{ width: '150px' }}><input type="text" value={section_33_data?.data?.rows[index][2]} readOnly /></td>
                                    //     <td style={{ width: '150px' }}><input type="text" value={formatDateToDDMMYYYY(section_33_data?.data?.rows[index][4])} readOnly /></td>
                                    //     <td style={{ width: '125px' }}>
                                    //         <input type="text"
                                    //             value={
                                    //                 section_33_data?.data?.rows[index][5] !== ''
                                    //                     ? section_33_data?.data?.rows[index][5]
                                    //                     : frequencyTitle
                                    //             }
                                    //             readOnly />
                                    //     </td>
                                    //     <td style={{ width: '360px' }}><textarea rows={2} readOnly style={{ height: '90px', direction: 'rtl' }}>{section_33_data?.data?.rows[index][9]}</textarea></td>
                                    //     <input
                                    //         type="checkbox"
                                    //         checked={isChecked}
                                    //         aria-label="בחר שורה"
                                    //         value={isChecked.toString()}
                                    //         onChange={() => { }}
                                    //         readOnly
                                    //     />
                                    // </tr>

                                    <tr key={index} className={styles['section3_3']}>
                                        <td style={{ paddingRight: '26px', direction: 'ltr' }}>
                                            {matchedChapter ? `${matchedChapter.Chapter},${matchedChapter.Order0}` : '-'}
                                        </td>

                                        <td>
                                            {matchedChapter ? matchedChapter.Subject : '-'}
                                        </td>

                                        <td style={{ width: '150px' }}>
                                            <div className={styles.readOnlyField}>
                                                {section_33_data?.data?.rows[index][2]}
                                            </div>
                                        </td>

                                        <td style={{ width: '150px' }}>
                                            <div className={styles.readOnlyField}>
                                                {formatDateToDDMMYYYY(section_33_data?.data?.rows[index][4])}
                                            </div>
                                        </td>

                                        <td style={{ width: '125px' }}>
                                            <div className={styles.readOnlyField}>
                                                {
                                                    section_33_data?.data?.rows[index][5] !== ''
                                                        ? section_33_data?.data?.rows[index][5]
                                                        : frequencyTitle
                                                }
                                            </div>
                                        </td>

                                        <td style={{ width: '360px' }}>
                                            <div className={styles.readOnlyFieldTextarea}>
                                                {section_33_data?.data?.rows[index][9]}
                                            </div>
                                        </td>

                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            aria-label="בחר שורה"
                                            value={isChecked.toString()}
                                            onChange={() => { }}
                                            readOnly
                                        />
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

export default Section_33;
