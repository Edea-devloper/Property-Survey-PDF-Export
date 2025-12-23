
import * as React from 'react';
import styles from './Section_71_72_.module.scss';
// import { formatDateToDDMMYYYY } from '../../Utility/utils';


interface Section71Props {
    section_71_data: any;
    chapter_data_71: any;
    property_Frequency_Data: any
}

const AvivAppLogologo = require('../Image/AvivAppLogo.jpg')
const AvivLogo = require('../Image/AvivLogo.png')

const Section_71: React.FC<Section71Props> = ({
    section_71_data,
    chapter_data_71,
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
                    <div className={`${styles['header-section']} chunkrowTitle`}>חסכון והתייעלות</div>
                    <div className={`${styles['sub-header-section']} ${styles.h_direction_71} chunkrowTitle`}>7.1 - התייעלות אנרגטית </div>
                    <table id='table71' className={styles['custom-table']}>
                        <thead className='chunkrowHeader'>
                            <tr>
                                <th style={{ paddingRight: '25px' }}>סעיף</th>
                                <th>נושא</th>
                                {/* <th>תחום מקצועי</th> */}
                                <th colSpan={1}>קיים חיסכון</th>
                                <th colSpan={4}>ממצאים</th>
                                <th colSpan={2}>סטטוס</th>
                                {/* <th colSpan={4}>המלצות לתיקון</th> */}
                                <th colSpan={4}>הערות</th>
                            </tr>
                        </thead>
                        <tbody className='chunkrow'>
                            {section_71_data?.data?.flags?.map((isChecked: any, index: any) => {

                                const currentOrder = Number(section_71_data?.data?.rows[index][0]);
                                let matchedChapter = null;
                                for (let i = 0; i < chapter_data_71.length; i++) {
                                    if (chapter_data_71[i]?.Order0 === currentOrder) {
                                        matchedChapter = chapter_data_71[i];
                                        break;
                                    }
                                }

                                const row = section_71_data?.data?.rows[index];
                                // const isRowEmpty =
                                //     [row[1], row[4], row[5], row[8], row[10]]
                                //         .every(val => !val || val.toString().trim() === '') &&
                                //     (!matchedChapter ||
                                //         [matchedChapter.Chapter, matchedChapter.Subject, matchedChapter.Area]
                                //             .every(val => !val || val.toString().trim() === ''));

                                const isRowEmpty =
                                    [row[1], row[4], row[5], row[8], row[10]]
                                        .every(val => !val || val?.toString()?.trim() === '');

                                if (isRowEmpty) return null;

                                return (
                                    <tr key={index} className={styles['section7_1']}>
                                        <td style={{ paddingRight: '25px', direction: 'ltr'}}>{matchedChapter ? `${matchedChapter.Chapter},${matchedChapter.Order0 - 494}` : '-'}</td>
                                        <td>{matchedChapter ? matchedChapter.Subject : '-'}</td>
                                        {/* <td>{matchedChapter ? matchedChapter.Area : '-'}</td> */}
                                        <td><input type="text" value={section_71_data?.data?.rows[index][5]} readOnly /></td>
                                        <td colSpan={4} style={{ width: '175px' }}><textarea rows={4} style={{ direction: 'rtl' }} readOnly>{section_71_data?.data?.rows[index][4]}</textarea></td>
                                        <td colSpan={2}><input type="text" value={section_71_data?.data?.rows[index][1]} readOnly /></td>
                                        {/* <td colSpan={4}><textarea rows={4} style={{ direction: 'rtl' }} readOnly>{section_71_data?.data?.rows[index][8]}</textarea></td> */}
                                        <td colSpan={4} style={{ width: '175px', paddingLeft: '21px' }}><textarea rows={4} style={{ direction: 'rtl' }} readOnly>{section_71_data?.data?.rows[index][10]}</textarea></td>
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

export default Section_71;
