
import * as React from 'react';
import styles from './Section_31_32_33_34_35.module.scss';
import { formatDateToDDMMYYYY } from '../../Utility/utils';


interface Section32Props {
    section_32_data: any;
    chapter_data_32: any;
    property_Frequency_Data: any
}

const Section_32: React.FC<Section32Props> = ({
    section_32_data,
    chapter_data_32,
    property_Frequency_Data
}) => {

    return (
        <>
            <div>
                <div className={styles['container-section']}>
                    <div className={`${styles.header} ${styles.h_direction_32} chunkrowTitle`}>3.2 - בדיקות כשירות ותקינות מערכות בטיחות</div>

                    <table id='table32' className={styles['custom-table']}>
                        <thead className='chunkrowHeader'>
                            <tr>
                                <th style={{ paddingRight: '26px' }}>סעיף</th>
                                <th>נושא</th>
                                {/* <th>תחום מקצועי</th> */}
                                <th>שם  ספק או האחראי - בדיקות כשירות </th>
                                <th>ל־תאריך ביצוע הבדיקה </th>
                                <th>תדירות - בדיקות כשירות </th>
                                {/* <th>מועד הבדיקה הבאה - בדיקות כשירות </th> */}
                                {/* <th> סטטוס - בדיקות כשירות</th> */}
                                <th>הערות - בדיקות כשירות </th>
                                {/* <th>המלצות לתיקון </th> */}
                            </tr>
                        </thead>
                        <tbody className='chunkrow'>
                            {section_32_data?.data?.flags?.map((isChecked: any, index: any) => {
                                const currentOrder = Number(section_32_data?.data?.rows[index][0]);
                                let matchedChapter = null;
                                for (let i = 0; i < chapter_data_32.length; i++) {
                                    if (chapter_data_32[i]?.Order0 === currentOrder) {
                                        matchedChapter = chapter_data_32[i];
                                        break;
                                    }
                                }

                                // Additional logic: Find the Title from property_Frequency_Data using matchedChapter?.frequencylpId
                                let frequencyTitle = '';
                                if (matchedChapter?.frequencylpId) {
                                    for (let j = 0; j < property_Frequency_Data?.length; j++) {
                                        if (property_Frequency_Data[j]?.ID === matchedChapter?.frequencylpId) {
                                            frequencyTitle = property_Frequency_Data[j]?.Title;
                                            break;
                                        }
                                    }
                                }

                                const row = section_32_data?.data?.rows[index];
                                // const isRowEmpty =
                                //     [row[1], row[2], row[4], row[5], row[6], row[7], row[8]]
                                //         .every(val => !val || val.toString().trim() === '') &&
                                //     (!matchedChapter ||
                                //         [matchedChapter.Chapter, matchedChapter.Subject, matchedChapter.Area]
                                //             .every(val => !val || val.toString().trim() === ''));

                                const isRowEmpty =
                                    [row[1], row[2], row[4], row[6], row[7], row[8]]
                                        .every(val => !val || val?.toString()?.trim() === '');

                                if (isRowEmpty) return null;
                                return (
                                    <tr key={index} className={styles['section3_2']}>
                                        <td style={{ paddingRight: '26px', direction: 'ltr' }}>{matchedChapter ? `${matchedChapter.Chapter},${matchedChapter.Order0 - 177}` : '-'}</td>
                                        <td>{matchedChapter ? matchedChapter.Subject : '-'}</td>
                                        {/* <td>{matchedChapter ? matchedChapter.Area : '-'}</td> */}
                                        <td style={{ width: '150px' }}><input type="text" value={section_32_data?.data?.rows[index][2]} readOnly /></td>
                                        <td style={{ width: '150px' }}><input type="text" value={formatDateToDDMMYYYY(section_32_data?.data?.rows[index][4])} readOnly /></td>
                                        <td style={{ width: '125px' }}>
                                            <input
                                                type="text"
                                                value={
                                                    section_32_data?.data?.rows[index][5] !== ''
                                                        ? section_32_data?.data?.rows[index][5]
                                                        : frequencyTitle
                                                }
                                                readOnly
                                            />
                                        </td>
                                        {/* <td style={{ width: '150px' }}><input type="text" value={formatDateToDDMMYYYY(section_32_data?.data?.rows[index][6])} readOnly /></td> */}
                                        {/* <td style={{ width: '135px' }}><input type="text" value={section_32_data?.data?.rows[index][7]} readOnly /></td> */}
                                        <td style={{ width: '360px' }}><textarea rows={2} readOnly style={{ height: '90px', direction: 'rtl' }}>{section_32_data?.data?.rows[index][8]}</textarea></td>
                                        {/* <td style={{ paddingLeft: '24px' }}><textarea rows={2} readOnly style={{ height: '90px', direction: 'rtl' }}>{section_32_data?.data?.rows[index][1]}</textarea></td> */}
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

export default Section_32;
