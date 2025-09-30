
import * as React from 'react';
import styles from './Section_31_32_33_34_35.module.scss';
import { formatDateToDDMMYYYY } from '../../Utility/utils';


interface Section31Props {
    section_31_data: any;
    chapter_data_31: any
}

const Section_31: React.FC<Section31Props> = ({
    section_31_data,
    chapter_data_31
}) => {

    return (
        <>
            <div>
                <div className={styles['container-section']}>
                    <div className={`${styles['header-section']} ${styles.h_direction_31} chunkrowTitle`}>תפעול מערכות המבנה</div>
                    <div className={styles['sub-header-section']} style={{ height: '25px', direction: 'ltr' }}>3.1 - הסכמי התקשרות עם נותני שירות</div>
                    <table id='table31' className={styles['custom-table']}>
                        <thead className='chunkrowHeader'>
                            <tr>
                                <th style={{ paddingRight: '30px' }}>סעיף</th>
                                <th>נושא</th>
                                {/* <th>תחום מקצועי</th> */}
                                <th>שם החברה</th>
                                {/* <th>סוג התקשרות</th> */}
                                {/* <th>מועד תחילת חוזה - הסכמי התקשרות</th> */}
                                {/* <th>משך החוזה - הסכמי התקשרות</th> */}
                                <th>מועד סיום חוזה - הסכמי התקשרות</th>
                                {/* <th>טיב השירות - הסכמי התקשרות</th> */}
                                <th>הערות - הסכמי התקשרות</th>
                                {/* <th>המלצות לתיקון</th> */}
                            </tr>
                        </thead>
                        <tbody className='chunkrow'>
                            {section_31_data?.data?.flags?.map((isChecked: any, index: any) => {
                                const currentOrder = Number(section_31_data?.data?.rows[index][0]);
                                let matchedChapter = null;
                                for (let i = 0; i < chapter_data_31.length; i++) {
                                    if (chapter_data_31[i]?.Order0 === currentOrder) {
                                        matchedChapter = chapter_data_31[i];
                                        break;
                                    }
                                }
                                const row = section_31_data?.data?.rows[index];

                                // const isRowEmpty =
                                //     [row[1], row[2], row[3], row[4], row[6], row[8], row[9], row[10]]
                                //         .every(val => !val || val?.toString()?.trim() === '') &&
                                //     (!matchedChapter ||
                                //         [matchedChapter.Chapter, matchedChapter.Subject, matchedChapter.Area]
                                //             .every(val => !val || val?.toString()?.trim() === ''));

                                const isRowEmpty = [row[1], row[2], row[3], row[4], row[6], row[8], row[9], row[10]]
                                    .every(val => !val || val?.toString()?.trim() === '');


                                if (isRowEmpty) return null;
                                return (
                                    <tr key={index} className={styles['Section3_1']}>
                                        <td style={{ paddingRight: '30px', direction: 'ltr' }}>{matchedChapter ? `${matchedChapter.Chapter},${matchedChapter.Order0 - 132}` : '-'}</td>
                                        <td style={{ width: '185px' }}> {matchedChapter ? matchedChapter.Subject : '-'}</td>
                                        {/* <td> {matchedChapter ? matchedChapter.Area : '-'}</td> */}
                                        <td><input type="text" value={section_31_data?.data?.rows[index][3]} readOnly /></td>
                                        {/* <td><input type="text" value={section_31_data?.data?.rows[index][4]} readOnly /></td> */}
                                        {/* <td style={{ width: '110px' }}><input type="text" value={formatDateToDDMMYYYY(section_31_data?.data?.rows[index][6])} readOnly /></td> */}
                                        {/* <td style={{ width: '150px' }}><input type="text" value={section_31_data?.data?.rows[index][1]} readOnly /></td> */}
                                        <td style={{ width: '140px' }}><input type="text" value={formatDateToDDMMYYYY(section_31_data?.data?.rows[index][8])} readOnly /></td>
                                        {/* <td style={{ width: '200px' }}><input type="text" value={section_31_data?.data?.rows[index][9]} readOnly /></td> */}
                                        <td style={{width: '448px'}}><textarea rows={2} readOnly style={{ height: '90px', direction: 'rtl' }}>{section_31_data?.data?.rows[index][10]}</textarea></td>
                                        {/* <td style={{ paddingLeft: '25px' }}><textarea rows={2} readOnly style={{ height: '90px', direction: 'rtl' }}>{section_31_data?.data?.rows[index][2]}</textarea></td> */}
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

export default Section_31;
