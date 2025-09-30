
import * as React from 'react';
import styles from './Section_24_25_26_27.module.scss';


interface Section27Props {
    section_27_data: any;
    chapter_data_27: any
}

const Section_27: React.FC<Section27Props> = ({
    section_27_data,
    chapter_data_27
}) => {


    return (
        <>
            <div>
                <div className={styles['section-container']}>
                    <div className={`${styles.header} ${styles.h_direction_27} chunkrowTitle`}>2.7 - המערכות בנכס</div>
                    <div className={styles['custom27-table-wrapper']}>
                        <table id='table27' className={styles['custom27-table']}>
                            <thead className='chunkrowHeader'>
                                <tr>
                                    <th style={{ paddingRight: '43px' }}>סעיף</th>
                                    <th>נושא</th>
                                    <th>תחום מקצועי</th>
                                    <th>המצאות מערכת</th>
                                    <th>הערות</th>
                                </tr>
                            </thead>

                            <tbody className='custom27-body chunkrow'>
                                {section_27_data?.data?.flags?.map((isChecked: any, index: any) => {

                                    const currentOrder = Number(section_27_data?.data?.rows[index][0]);
                                    let matchedChapter = null;
                                    for (let i = 0; i < chapter_data_27.length; i++) {
                                        if (chapter_data_27[i]?.Order0 === currentOrder) {
                                            matchedChapter = chapter_data_27[i];
                                            break;
                                        }
                                    }

                                    const row = section_27_data?.data?.rows[index];
                                    // const isRowEmpty =
                                    //     (!row[1] || row[1]?.toString()?.trim() === '') &&
                                    //     (!row[4] || row[4]?.toString()?.trim() === '') &&
                                    //     (!matchedChapter ||
                                    //         ([
                                    //             matchedChapter?.Chapter,
                                    //             matchedChapter?.Subject,
                                    //             matchedChapter?.Area
                                    //         ].every(val => !val || val?.toString()?.trim() === '')));

                                    const isRowEmpty =
                                        (!row[1] || row[1]?.toString()?.trim() === '') &&
                                        (!row[4] || row[4]?.toString()?.trim() === '');


                                    if (isRowEmpty) return null; // Skip this row


                                    return (
                                        <tr key={index} className={styles['custom27-row']}>

                                            <td className={styles['custom27-row-last-col']}>
                                                {matchedChapter ? `${matchedChapter.Chapter},${matchedChapter?.Order0}` : '-'}
                                            </td>
                                            <td style={{ direction: 'rtl', textAlign: 'right' }}>
                                                {matchedChapter ? matchedChapter.Subject : '-'}
                                            </td>
                                            <td style={{ direction: 'rtl', textAlign: 'right' }}>
                                                {matchedChapter ? matchedChapter.Area : '-'}
                                            </td>

                                            <td className="custom27">
                                                <input className={styles['custom27-select']} disabled
                                                    type='text'
                                                    value={section_27_data?.data?.rows[index][1]}
                                                />
                                            </td>

                                            <td className={styles['custom27-tera']}>
                                                <textarea
                                                    value={section_27_data?.data?.rows[index][4]}
                                                    rows={3}
                                                    className={styles['custom27-textarea']}
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
        </>
    );
};

export default Section_27;
