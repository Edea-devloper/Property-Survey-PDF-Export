
import * as React from 'react';
import styles from './Section_41_42_43_44.module.scss';
// import { formatDateToDDMMYYYY } from '../../Utility/utils';


interface Section44Props {
    section_44_data: any;
    chapter_data_44: any;
    property_Frequency_Data: any
}

const Section_45: React.FC<Section44Props> = ({
    section_44_data,
    chapter_data_44,
    property_Frequency_Data
}) => {

    function stripHtmlTags(html: string) {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    }

    return (
        <>
            <div>
                <div className={styles['container-section']}>
                    <div className={`${styles.header} ${styles.h_direction_41} chunkrowTitle`}>4.5 - ביטחון</div>
                    <table id='table45' className={styles['custom-table']}>
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
                            {section_44_data?.data?.flags?.map((isChecked : any, index : any) => {

                                const currentOrder = Number(section_44_data?.data?.rows[index][0]);
                                let matchedChapter = null;
                                for (let i = 0; i < chapter_data_44.length; i++) {
                                    if (chapter_data_44[i]?.Order0 === currentOrder) {
                                        matchedChapter = chapter_data_44[i];
                                        break;
                                    }
                                }

                                const row = section_44_data?.data?.rows[index];
    
                                const isRowEmpty =
                                    [row[1], row[2], row[5], row[6]]
                                        .every(val => !val || val?.toString()?.trim() === '');

                                if (isRowEmpty) return null;

                                return (
                                    <tr key={index} className={styles['section4_4']}>
                                        <td style={{ paddingRight: '25px', direction: 'ltr' }}>{matchedChapter ? `${matchedChapter.Chapter},${matchedChapter.Order0 - 438}` : '-'}</td>
                                        <td style={{ width: '200px' }}>{matchedChapter ? matchedChapter.Subject : '-'}</td>
                                        {/* <td style={{ width: '150px' }}>{matchedChapter ? matchedChapter.Area : '-'}</td> */}
                                        <td style={{ width: '254px' }}><input type="text" value={section_44_data?.data?.rows[index][6]} readOnly /></td>
                                        <td colSpan={4} style={{ width: '350px' }}><textarea style={{ height: '90px', direction: 'rtl' }} rows={4} readOnly>{stripHtmlTags(section_44_data?.data?.rows[index][5])}</textarea></td>
                                        {/* <td colSpan={4} style={{ width: '350px' }}><textarea style={{ height: '90px', direction: 'rtl' }} rows={4} readOnly>{stripHtmlTags(section_44_data?.data?.rows[index][1])}</textarea></td> */}
                                        <td colSpan={2} style={{ paddingLeft: '21px' }}><input type="text" value={section_44_data?.data?.rows[index][2]} readOnly /></td>
                                        <input
                                            type="checkbox"
                                            // dangerouslySetInnerHTML={}
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

export default Section_45;
