
import * as React from 'react';
import styles from './Section_24_25_26_27.module.scss';
// import { formatDateToDDMMYYYY } from '../../Utility/utils';


interface Section26Props {
    section_26_data: any;
}

const Section_26: React.FC<Section26Props> = ({
    section_26_data,
}) => {



    return (
        <>
            <div>
                <div className={styles['section-container']}>
                    <div className={`${styles.header} ${styles.h_direction_26} chunkrowTitle`}>2.6 - תכניות של הנכס</div>
                    <div className={styles['table-wrapper']}>
                        <table id='table26' className={styles['section-26-table']}>
                            <thead className='chunkrowHeader'>
                                <tr>
                                    <th></th>
                                    <th>תוכניות</th>
                                    <th colSpan={2}>המצאות תכנית</th>
                                    {/* <th colSpan={3}>תאריך עדכון התוכנית</th> */}
                                    <th colSpan={2}>הערות</th>
                                </tr>
                            </thead>
                            <tbody className='chunkrow'>
                                {section_26_data?.data?.flags?.map((isChecked : any, index : any) => {
                                    const row = section_26_data?.data?.rows[index];
                                    // [1, 2, 3, 4, 5, 6]
                                    const isRowEmpty = [1, 2, 4].every(colIndex => {
                                        const cellValue = row[colIndex];
                                        return cellValue === null || cellValue === undefined || cellValue?.toString()?.trim() === '';
                                    });
                                    if (isRowEmpty) return null;
                                    return (
                                        <tr className={styles['section-26-row']} key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <input className={styles['section-26-select']} value={section_26_data?.data?.rows[index][5]} readOnly />
                                            </td>
                                            <td colSpan={2}>
                                                <input
                                                    type="text"
                                                    className="section-26-date-input"
                                                    value={section_26_data?.data?.rows[index][4]}
                                                    readOnly
                                                />
                                            </td>
                                            {/* <td colSpan={3}>
                                                <div className="section-26-date-picker">
                                                    <input
                                                        type="text"
                                                        className="section-26-date-input"
                                                        value={formatDateToDDMMYYYY(section_26_data?.data?.rows[index][2])}
                                                        readOnly
                                                    />
                                                </div>
                                            </td> */}
                                            <td colSpan={2}>
                                                <textarea
                                                    className="section-26-textarea comment-area"
                                                    value={section_26_data?.data?.rows[index][1]}
                                                    readOnly
                                                    style={{ fontSize: '15px' }}
                                                />
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >

        </>
    );
};

export default Section_26;
