
import * as React from 'react';
import styles from './Section_41_42_43_44.module.scss';
// import { formatDateToDDMMYYYY } from '../../Utility/utils';


interface Section43Props {
    section_43_data: any;
    chapter_data_43: any;
    property_Frequency_Data: any
}

// const title = `4.3 - נגישות(מתו"ס ושירות)`;
// const title = '\u202B4.3 - נגישות(מתו"ס ושירות)\u202C';
// const quote = '\u0022';      // "
// const openParen = '\u0028';  // (
// const closeParen = '\u0029'; // )

// const title = `\u202B4.3 - נגישות${openParen}מתו${quote}ס ושירות${closeParen}\u202C`;
// const basetitle = '4.3 - נגישות(מתו"ס ושירות)';
const basetitle = '4.3 - מפגעים בטיחותיים אפשריים';
const title = encodeURIComponent(basetitle);

const AvivAppLogologo = require('../Image/AvivAppLogo.jpg')
const AvivLogo = require('../Image/AvivLogo.png')


const Section_43: React.FC<Section43Props> = ({
    section_43_data,
    chapter_data_43,
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
                    <div className={`${styles.header} ${styles.h_direction_41} chunkrowTitle pdf_lbl`}>{decodeURIComponent(title)}</div>
                    <table id='table43' className={styles['custom-table']}>
                        <thead className='chunkrowHeader'>
                            <tr>
                                <th style={{ paddingRight: '25px' }}>סעיף</th>
                                <th>נושא</th>
                                {/* <th>תחום מקצועי</th> */}
                                <th colSpan={2}>קיים / לא קיים</th>
                                <th colSpan={3}>ממצאים</th>
                                {/* <th colSpan={4}>המלצות לתיקון</th> */}
                                <th>סטטוס</th>
                            </tr>
                        </thead>
                        <tbody className='chunkrow'>
                            {section_43_data?.data?.flags?.map((isChecked: any, index: any) => {
                                const currentOrder = Number(section_43_data?.data?.rows[index][0]);
                                let matchedChapter = null;
                                for (let i = 0; i < chapter_data_43.length; i++) {
                                    if (chapter_data_43[i]?.Order0 === currentOrder) {
                                        matchedChapter = chapter_data_43[i];
                                        break;
                                    }
                                }

                                const row = section_43_data?.data?.rows[index];
                                // const isRowEmpty =
                                //     [row[1], row[2], row[5], row[6]]
                                //         .every(val => !val || val.toString().trim() === '') &&
                                //     (!matchedChapter ||
                                //         [matchedChapter.Chapter, matchedChapter.Subject, matchedChapter.Area]
                                //             .every(val => !val || val.toString().trim() === ''));

                                const isRowEmpty =
                                    [row[1], row[2], row[5], row[6]]
                                        .every(val => !val || val?.toString()?.trim() === '');

                                if (isRowEmpty) return null;

                                return (
                                    <tr key={index} className={styles['section4_3']}>
                                        <td style={{ paddingRight: '25px', direction: 'ltr' }}>{matchedChapter ? `${matchedChapter.Chapter},${matchedChapter.Order0 - 427}` : '-'}</td>
                                        <td style={{ width: '200px' }}>{matchedChapter ? matchedChapter.Subject : '-'}</td>
                                        {/* <td style={{ width: '150px' }}>{matchedChapter ? matchedChapter.Area : '-'}</td> */}
                                        <td style={{ width: '254px' }}><input type="text" value={section_43_data?.data?.rows[index][6]} readOnly /></td>
                                        <td colSpan={4} style={{ width: '350px' }}><textarea style={{ height: '90px', direction: 'rtl' }} rows={4} readOnly>{section_43_data?.data?.rows[index][5]}</textarea></td>
                                        {/* <td colSpan={4} style={{ width: '350px' }}><textarea style={{ height: '90px', direction: 'rtl' }} rows={4} readOnly>{section_43_data?.data?.rows[index][1]}</textarea></td> */}
                                        <td colSpan={2} style={{ paddingLeft: '21px' }}><input type="text" value={section_43_data?.data?.rows[index][2]} readOnly /></td>
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

export default Section_43;
