
import * as React from 'react';
import styles from './Section_51_521.module.scss';


interface Section521Props {
    section_56_data: any;
    chapter_data_56: any;
    property_Frequency_Data: any
}

const Section_56: React.FC<Section521Props> = ({
    section_56_data,
    chapter_data_56,
    property_Frequency_Data
}) => {

    return (
        <>
            <div>
                <div className={styles['container-section']}>
                    <div className={`${styles.header} ${styles.h_direction_51} chunkrowTitle`}>5.6 - חדירות מים/ נזילות</div>
                    <table id='table56' className={styles['custom-table']}>
                        <thead className='chunkrowHeader'>
                            <tr>
                                <th style={{ paddingRight: '25px' }}>פרק</th>
                                <th>נושא</th>
                                <th>תחום מקצועי</th>
                                {/* <th colSpan={1}>קיים / לא קיים</th> */}
                                <th colSpan={1}>רמת התחזוקה/ שירות</th>
                                <th colSpan={4}>ממצאים</th>
                                <th colSpan={4}>המלצות לתיקון</th>
                                <th>סטטוס</th>
                            </tr>
                        </thead>
                        <tbody className='chunkrow'>
                            {section_56_data?.data?.flags?.map((isChecked: any, index: any) => {

                                const currentOrder = Number(section_56_data?.data?.rows[index][0]);
                                let matchedChapter = null;
                                for (let i = 0; i < chapter_data_56.length; i++) {
                                    if (chapter_data_56[i]?.Order0 === currentOrder) {
                                        matchedChapter = chapter_data_56[i];
                                        break;
                                    }
                                }

                                const row = section_56_data?.data?.rows[index];
                                
                                const isRowEmpty =
                                    [row[1], row[2], row[3], row[4], row[6]]
                                        .every(val => !val || val?.toString()?.trim() === '');

                                if (isRowEmpty) return null;

                                return (
                                    <tr key={index} className={styles['section5_2_1']}>
                                        <td style={{ paddingRight: '25px' }}>{matchedChapter ? matchedChapter.Chapter : '-'}</td>
                                        <td>{matchedChapter ? matchedChapter.Subject : '-'}</td>
                                        <td>{matchedChapter ? matchedChapter.Area : '-'}</td>
                                        {/* <td style={{ width: '150px' }}><input type="text" value={section_56_data?.data?.rows[index][4]} readOnly /></td> */}
                                        <td style={{ width: '150px' }}><input type="text" value={section_56_data?.data?.rows[index][3]} readOnly /></td>
                                        <td colSpan={4} style={{ width: '350px' }}><textarea style={{ height: '90px', direction: 'rtl' }} rows={4} readOnly>{section_56_data?.data?.rows[index][5]}</textarea></td>
                                        <td colSpan={4} style={{ width: '350px' }}><textarea style={{ height: '90px', direction: 'rtl' }} rows={4} readOnly>{section_56_data?.data?.rows[index][1]}</textarea></td>
                                        <td colSpan={2} style={{ width: '140px', paddingLeft: '21px' }}><input type="text" value={section_56_data?.data?.rows[index][2]} readOnly /></td>
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

export default Section_56;
