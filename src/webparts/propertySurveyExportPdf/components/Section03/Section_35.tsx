
import * as React from 'react';
import styles from './Section_31_32_33_34_35.module.scss';
// import { formatDateToDDMMYYYY } from '../../Utility/utils';


interface Section35Props {
    section_35_data: any;
    chapter_data_35: any;
    property_Frequency_Data: any
}

const Section_35: React.FC<Section35Props> = ({
    section_35_data,
    chapter_data_35,
    property_Frequency_Data
}) => {

    return (
        <>
            <div>
                <div className={styles['container-section']}>
                    <div className={`${styles.header} ${styles.h_direction_35} chunkrowTitle`}>3.5 - .מידע בתפעול ואחזקה יזומה /תפעולית / שבר</div>

                    <table id='table35' className={styles['custom-table']}>
                        <thead className='chunkrowHeader'>
                            <tr>
                                <th style={{ paddingRight: '25px' }}>סעיף</th>
                                <th>נושא</th>
                                {/* <th>תחום מקצועי</th> */}
                                <th>קיים/לא קיים</th>
                                <th>סטטוס</th>
                                <th>הערות</th>
                                {/* <th colSpan={2}>המלצות לתיקון</th> */}
                            </tr>
                        </thead>
                        <tbody className='chunkrow'>
                            {section_35_data?.data?.flags?.map((isChecked : any, index : any) => {

                                const currentOrder = Number(section_35_data?.data?.rows[index][0]);
                                let matchedChapter = null;
                                for (let i = 0; i < chapter_data_35.length; i++) {
                                    if (chapter_data_35[i]?.Order0 === currentOrder) {
                                        matchedChapter = chapter_data_35[i];
                                        break;
                                    }
                                }

                                const row = section_35_data?.data?.rows[index];
                                // const isRowEmpty =
                                //     [row[1], row[2], row[3], row[4]]
                                //         .every(val => !val || val.toString().trim() === '') &&
                                //     (!matchedChapter ||
                                //         [matchedChapter.Chapter, matchedChapter.Subject, matchedChapter.Area]
                                //             .every(val => !val || val.toString().trim() === ''));

                                const isRowEmpty =
                                    [row[1], row[2], row[3], row[4]]
                                        .every(val => !val || val?.toString()?.trim() === '');

                                if (isRowEmpty) return null;

                                return (
                                    <tr key={index} className={styles['section3_5']}>
                                        <td style={{ paddingRight: '25px', direction: 'ltr' }}>{matchedChapter ? `${matchedChapter.Chapter},${matchedChapter.Order0 - 395}` : '-'}</td>
                                        <td style={{ width: '350px' }}>{matchedChapter ? matchedChapter.Subject : '-'}</td>
                                        {/* <td style={{ width: '130px' }}>{matchedChapter ? matchedChapter.Area : '-'}</td> */}

                                        <td style={{ width: '265px' }}><input type="text" value={section_35_data?.data?.rows[index][4]} readOnly /></td>
                                        <td style={{ width: '273px' }}><input type="text" value={section_35_data?.data?.rows[index][2]} readOnly /></td>
                                        <td colSpan={2} style={{width: '330px'}}><textarea style={{ height: '90px' }} rows={3} readOnly>{section_35_data?.data?.rows[index][3]}</textarea></td>
                                        {/* <td colSpan={1} style={{ paddingLeft: '23px' }}><textarea style={{ height: '90px', direction: 'rtl' }} rows={3} readOnly>{section_35_data?.data?.rows[index][1]}</textarea></td> */}
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

export default Section_35;
