
import * as React from 'react';
import styles from './Section_51_521.module.scss';


interface Section521Props {
    section_54_data: any;
    chapter_data_54: any;
    property_Frequency_Data: any
}

const AvivAppLogologo = require('../Image/AvivAppLogo.jpg')
const AvivLogo = require('../Image/AvivLogo.png')

const Section_54: React.FC<Section521Props> = ({
    section_54_data,
    chapter_data_54,
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
                    {/* <div className={`${styles.header} ${styles.h_direction_51} chunkrowTitle`}>5.4 - דלתות ומשקופים</div> */}
                    <div className={`${styles.header} ${styles.h_direction_51} chunkrowTitle`}>5.4 - חניות</div>
                    <table id='table54' className={styles['custom-table']}>
                        <thead className='chunkrowHeader'>
                            <tr>
                                <th style={{ paddingRight: '25px' }}>סעיף</th>
                                <th>נושא</th>
                                {/* <th>תחום מקצועי</th> */}
                                <th colSpan={1}>קיים / לא קיים</th>
                                <th colSpan={1}>רמת התחזוקה/ שירות</th>
                                <th colSpan={4}>ממצאים</th>
                                {/* <th colSpan={4}>המלצות לתיקון</th> */}
                                <th>סטטוס</th>
                            </tr>
                        </thead>
                        <tbody className='chunkrow'>
                            {section_54_data?.data?.flags?.map((isChecked: any, index: any) => {

                                const currentOrder = Number(section_54_data?.data?.rows[index][0]);
                                let matchedChapter = null;
                                for (let i = 0; i < chapter_data_54.length; i++) {
                                    if (chapter_data_54[i]?.Order0 === currentOrder) {
                                        matchedChapter = chapter_data_54[i];
                                        break;
                                    }
                                }

                                const row = section_54_data?.data?.rows[index];

                                const isRowEmpty =
                                    [row[1], row[2], row[3], row[4], row[6]]
                                        .every(val => !val || val?.toString()?.trim() === '');

                                if (isRowEmpty) return null;

                                return (
                                    // <tr key={index} className={styles['section5_2_1']}>
                                    //     <td style={{ paddingRight: '25px', direction: 'ltr' }}>{matchedChapter ? `${matchedChapter.Chapter},${matchedChapter.Order0}` : '-'}</td>
                                    //     <td>{matchedChapter ? matchedChapter.Subject : '-'}</td>

                                    //     <td style={{ width: '224px' }}><input type="text" value={section_54_data?.data?.rows[index][6]} readOnly /></td>
                                    //     <td style={{ width: '224px' }}><input type="text" value={section_54_data?.data?.rows[index][3]} readOnly /></td>
                                    //     <td colSpan={4} style={{ width: '350px' }}><textarea style={{ height: '90px', direction: 'rtl' }} rows={4} readOnly>{section_54_data?.data?.rows[index][5]}</textarea></td>

                                    //     <td colSpan={2} style={{ width: '140px', paddingLeft: '21px' }}><input type="text" value={section_54_data?.data?.rows[index][2]} readOnly /></td>
                                    //     <input
                                    //         type="checkbox"
                                    //         checked={isChecked}
                                    //         aria-label="בחר שורה"
                                    //         value={isChecked.toString()}
                                    //         onChange={() => { }}
                                    //         readOnly
                                    //     />
                                    // </tr>


                                    <tr key={index} className={styles['section5_2_1']}>

                                        <td style={{ paddingRight: '25px', direction: 'ltr' }}>
                                           {matchedChapter ? `${matchedChapter.Chapter},${matchedChapter.Order0}` : '-'}
                                        </td>

                                        <td>
                                            {matchedChapter ? matchedChapter.Subject : '-'}
                                        </td>

                                        <td style={{ width: '224px' }}>
                                            <div className={styles.readOnlyField}>
                                                {section_54_data?.data?.rows[index][6]}
                                            </div>
                                        </td>

                                        <td style={{ width: '224px' }}>
                                            <div className={styles.readOnlyField}>
                                                {section_54_data?.data?.rows[index][3]}
                                            </div>
                                        </td>

                                        <td colSpan={4} style={{ width: '350px' }}>
                                            <div className={styles.readOnlyFieldTextarea}>
                                                {section_54_data?.data?.rows[index][5]}
                                            </div>
                                        </td>

                                        <td colSpan={2} style={{ width: '140px', paddingLeft: '21px' }}>
                                            <div className={styles.readOnlyField}>
                                                {section_54_data?.data?.rows[index][2]}
                                            </div>
                                        </td>

                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            aria-label="בחר שורה"
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

export default Section_54;
