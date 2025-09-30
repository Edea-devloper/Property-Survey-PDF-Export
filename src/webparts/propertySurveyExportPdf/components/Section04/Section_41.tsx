
import * as React from 'react';
import styles from './Section_41_42_43_44.module.scss';
// import { formatDateToDDMMYYYY } from '../../Utility/utils';


interface Section41Props {
    section_41_data: any;
    chapter_data_41: any;
    property_Frequency_Data: any
}

const Section_41: React.FC<Section41Props> = ({
    section_41_data,
    chapter_data_41,
    property_Frequency_Data
}) => {

    return (
        <>
            <div>
                <div className={styles['container-section']}>
                    <div className={`${styles['header-section']} chunkrowTitle`}>איכות סביבה, בטיחות, נגישות וביטחון</div>
                    <div className={`${styles['sub-header-section']} ${styles.h_direction_41} chunkrowTitle`}>4.1 - איכות הסביבה – הפרדה במקור </div>
                    <table id='table41' className={styles['custom-table']}>
                        <thead className='chunkrowHeader'>
                            <tr>
                                <th style={{ paddingRight: '25px' }}>סעיף</th>
                                <th>נושא</th>
                                {/* <th>תחום מקצועי</th> */}
                                <th>קיים / לא קיים</th>
                                {/* <th>אמצעי אצירה</th> */}
                                <th>תדירות פינוי/ אספקה</th>
                                <th>הערות</th>
                                {/* <th colSpan={2}>המלצות לתיקון</th> */}
                                <th>סטטוס</th>
                            </tr>
                        </thead>
                        <tbody className='chunkrow'>
                            {section_41_data?.data?.flags?.map((isChecked : any, index : any) => {

                                const currentOrder = Number(section_41_data?.data?.rows[index][0]);
                                let matchedChapter = null;
                                for (let i = 0; i < chapter_data_41.length; i++) {
                                    if (chapter_data_41[i]?.Order0 === currentOrder) {
                                        matchedChapter = chapter_data_41[i];
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

                                const row = section_41_data?.data?.rows[index];
                                // const isRowEmpty =
                                //     [row[1], row[2], row[3], row[4], row[8], row[9]]
                                //         .every(val => !val || val.toString().trim() === '') &&
                                //     (!matchedChapter ||
                                //         [matchedChapter.Chapter, matchedChapter.Subject, matchedChapter.Area]
                                //             .every(val => !val || val.toString().trim() === ''));

                                const isRowEmpty =
                                    [row[1], row[2], row[3], row[8], row[9]]
                                        .every(val => !val || val?.toString()?.trim() === '');

                                if (isRowEmpty) return null;

                                return (
                                    <tr key={index} className={styles['section4_1']}>
                                        <td style={{ paddingRight: '25px', direction: 'ltr' }}>{matchedChapter ? `${matchedChapter.Chapter},${matchedChapter.Order0 - 412}` : '-'}</td>
                                        <td style={{ width: '160px' }}>{matchedChapter ? matchedChapter.Subject : '-'}</td>
                                        {/* <td style={{ width: '160px' }}>{matchedChapter ? matchedChapter.Area : '-'}</td> */}
                                        <td style={{ width: '145px' }}><input type="text" value={section_41_data?.data?.rows[index][3]} readOnly /></td>
                                        {/* <td style={{ width: '145px' }}><input type="text" value={section_41_data?.data?.rows[index][2]} readOnly /></td> */}
                                        <td style={{ width: '145px' }}>
                                            <input type="text"
                                                value={
                                                    section_41_data?.data?.rows[index][4] !== ''
                                                        ? section_41_data?.data?.rows[index][4]
                                                        : frequencyTitle
                                                }
                                                readOnly />
                                        </td>
                                        <td style={{width: '347px'}}><textarea rows={3} readOnly style={{ height: '90px', direction: 'rtl' }}>{section_41_data?.data?.rows[index][9]}</textarea></td>
                                        {/* <td colSpan={2} style={{ width: '177px' }}><textarea rows={3} readOnly style={{ height: '90px', direction: 'rtl' }}>{section_41_data?.data?.rows[index][1]}</textarea></td> */}
                                        <td style={{ width: '150px', paddingLeft: '21px' }}><input type="text" value={section_41_data?.data?.rows[index][8]} readOnly /></td>
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

export default Section_41;
