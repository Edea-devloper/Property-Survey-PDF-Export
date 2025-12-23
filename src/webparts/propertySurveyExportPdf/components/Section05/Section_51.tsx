
import * as React from 'react';
import styles from './Section_51_521.module.scss';
// import { formatDateToDDMMYYYY } from '../../Utility/utils';


interface Section51Props {
    section_51_data: any;
    chapter_data_51: any;
    property_Frequency_Data: any
}

const AvivAppLogologo = require('../Image/AvivAppLogo.jpg')
const AvivLogo = require('../Image/AvivLogo.png')

const Section_51: React.FC<Section51Props> = ({
    section_51_data,
    chapter_data_51,
    property_Frequency_Data
}) => {

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
                    <div className={`${styles['header-section']} chunkrowTitle`}>תחזוקת המבנה</div>
                    {/* <div className={`${styles['sub-header-section']} ${styles.h_direction_51} chunkrowTitle`}>5.1 - קירות פנים ותקרה</div> */}
                    <div className={`${styles['sub-header-section']} ${styles.h_direction_51} chunkrowTitle`}>5.1 - סקר מבנה פנים</div>
                    <table id='table51' className={styles['custom-table']}>
                        <thead className='chunkrowHeader'>
                            <tr>
                                <th style={{ paddingRight: '25px' }}>סעיף</th>
                                <th>נושא</th>
                                {/* <th>תחום מקצועי</th> */}
                                <th>  קיים/ לא קיים</th>
                                <th colSpan={2}>רמת התחזוקה/ שירות</th>
                                <th colSpan={3}>ממצאים</th>
                                {/* <th colSpan={4}>המלצות לתיקון</th> */}
                                <th>סטטוס</th>
                            </tr>
                        </thead>
                        <tbody className='chunkrow'>
                            {section_51_data?.data?.flags?.map((isChecked : any, index : any) => {
                                const currentOrder = Number(section_51_data?.data?.rows[index][0]);
                                let matchedChapter = null;
                                for (let i = 0; i < chapter_data_51.length; i++) {
                                    if (chapter_data_51[i]?.Order0 === currentOrder) {
                                        matchedChapter = chapter_data_51[i];
                                        break;
                                    }
                                }

                                const row = section_51_data?.data?.rows[index];

                                const isRowEmpty =
                                    [row[1], row[2], row[3], row[5]]
                                        .every(val => !val || val?.toString()?.trim() === '');

                                if (isRowEmpty) return null;

                                return (
                                    <tr key={index} className={styles['section5_1']}>
                                        <td style={{ paddingRight: '25px', direction: 'ltr' }}>{matchedChapter ? `${matchedChapter.Chapter},${matchedChapter.Order0 - 449}` : '-'}</td>
                                        <td style={{ width: '200px' }}>{matchedChapter ? matchedChapter.Subject : '-'}</td>
                                        {/* <td style={{ width: '150px' }}>{matchedChapter ? matchedChapter.Area : '-'}</td> */}
                                        <td style={{ width: '254px' }}><input type="text" value={section_51_data?.data?.rows[index][6]} readOnly /></td>
                                        <td style={{ width: '159px' }}><input type="text" value={section_51_data?.data?.rows[index][3]} readOnly /></td>
                                        <td colSpan={4} style={{ width: '350px' }}><textarea style={{ height: '90px', direction: 'rtl' }} rows={4} readOnly>{section_51_data?.data?.rows[index][5]}</textarea></td>
                                        {/* <td colSpan={4} style={{ width: '350px' }}><textarea style={{ height: '90px', direction: 'rtl' }} rows={4} readOnly>{section_51_data?.data?.rows[index][1]}</textarea></td> */}
                                        <td colSpan={2} style={{ paddingLeft: '21px' }}><input type="text" value={section_51_data?.data?.rows[index][2]} readOnly /></td>
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

export default Section_51;
