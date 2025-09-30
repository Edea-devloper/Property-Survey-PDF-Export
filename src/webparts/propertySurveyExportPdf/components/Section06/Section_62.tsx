
import * as React from 'react';
import styles from './Section_61_.module.scss';
// import { formatDateToDDMMYYYY } from '../../Utility/utils';


interface Section61Props {
    section_62_data: any;
    chapter_data_62: any;
    property_Frequency_Data: any
}

const Section_62: React.FC<Section61Props> = ({
    section_62_data,
    chapter_data_62,
    property_Frequency_Data
}) => {

    return (
        <>
            <div>
                <div className={styles['container-section']}>
                    <div className={`${styles.header} ${styles.h_direction_51} chunkrowTitle`}>6.2 - גינון וחצר</div>
                    <table id='table62' className={styles['custom-table']}>
                        <thead className='chunkrowHeader'>
                            <tr>
                                <th style={{ paddingRight: '25px' }}>פרק</th>
                                <th>נושא</th>
                                <th>תחום מקצועי</th>
                                <th>רמת התחזוקה</th>
                                {/* <th colSpan={1}>רמת ניקיון וסדר</th> */}
                                <th colSpan={4}>ממצאים</th>
                                <th colSpan={2}>סטטוס</th>
                                <th colSpan={4}>המלצות לתיקון</th>
                                <th colSpan={4}>הערות</th>
                            </tr>
                        </thead>
                        <tbody className='chunkrow'>
                            {section_62_data?.data?.flags?.map((isChecked: any, index: any) => {

                                const currentOrder = Number(section_62_data?.data?.rows[index][0]);
                                let matchedChapter = null;
                                for (let i = 0; i < chapter_data_62.length; i++) {
                                    if (chapter_data_62[i]?.Order0 === currentOrder) {
                                        matchedChapter = chapter_data_62[i];
                                        break;
                                    }
                                }

                                const row = section_62_data?.data?.rows[index];
                                
                                const isRowEmpty =
                                    [row[1], row[2], row[4], row[8], row[10]]
                                        .every(val => !val || val?.toString()?.trim() === '');

                                if (isRowEmpty) return null;

                                return (
                                    <tr key={index} className={styles['section6_1']}>
                                        <td style={{ paddingRight: '25px' }}>{matchedChapter ? matchedChapter.Chapter : '-'}</td>
                                        <td>{matchedChapter ? matchedChapter.Subject : '-'}</td>
                                        <td>{matchedChapter ? matchedChapter.Area : '-'}</td>
                                        <td><input type="text" value={section_62_data?.data?.rows[index][2]} readOnly /></td>
                                        {/* <td><input type="text" value={section_62_data?.data?.rows[index][2]} readOnly /></td> */}
                                        <td colSpan={4} style={{ width: '175px' }}><textarea rows={4} style={{ direction: 'rtl' }} readOnly>{section_62_data?.data?.rows[index][4]}</textarea></td>
                                        <td colSpan={2}><input type="text" value={section_62_data?.data?.rows[index][1]} readOnly /></td>
                                        <td colSpan={4}><textarea rows={4} style={{ direction: 'rtl' }} readOnly>{section_62_data?.data?.rows[index][8]}</textarea></td>
                                        <td colSpan={4} style={{ width: '175px', paddingLeft: '21px' }}><textarea rows={4} style={{ direction: 'rtl' }} readOnly>{section_62_data?.data?.rows[index][10]}</textarea></td>
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

export default Section_62;
