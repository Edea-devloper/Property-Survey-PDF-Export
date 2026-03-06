
import * as React from 'react';
import styles from './Section_41_42_43_44.module.scss';
// import { formatDateToDDMMYYYY } from '../../Utility/utils';


interface Section42Props {
    section_42_data: any;
    chapter_data_42: any;
    property_Frequency_Data: any
}


const AvivAppLogologo = require('../Image/AvivAppLogo.jpg')
const AvivLogo = require('../Image/AvivLogo.png')

const Section_42: React.FC<Section42Props> = ({
    section_42_data,
    chapter_data_42,
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
                <div className="header-main">
                    <img src={AvivAppLogologo} alt="AVIV Logo" className="logo" />
                    <div className="center-info">
                        מינהלת הנכסים<br />
                        <a href="#">משרד הבריאות</a><br />
                        <span>אגף הנכסים</span>
                    </div>
                    <img src={AvivLogo} alt="Ministry Logo" className="logo" />
                </div>
                <div className={styles['container-section']}>
                    <div className={`${styles.header} ${styles.h_direction_41} chunkrowTitle`}>4.2 - בטיחות</div>
                    <table id='table42' className={styles['custom-table']}>
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
                            {section_42_data?.data?.flags?.map((isChecked: any, index: any) => {

                                const currentOrder = Number(section_42_data?.data?.rows[index][0]);
                                let matchedChapter = null;
                                for (let i = 0; i < chapter_data_42.length; i++) {
                                    if (chapter_data_42[i]?.Order0 === currentOrder) {
                                        matchedChapter = chapter_data_42[i];
                                        break;
                                    }
                                }

                                const row = section_42_data?.data?.rows[index];

                                const isRowEmpty =
                                    [row[1], row[2], row[5], row[6]]
                                        .every(val => !val || val?.toString()?.trim() === '');

                                if (isRowEmpty) return null;

                                return (
                                    // <tr key={index} className={styles['section4_2']}>
                                    //     <td style={{ paddingRight: '25px', direction: 'ltr' }}>{matchedChapter ? `${matchedChapter.Chapter},${matchedChapter.Order0}` : '-'}</td>
                                    //     <td style={{ width: '170px' }}>{matchedChapter ? matchedChapter.Subject : '-'}</td>

                                    //     <td style={{ width: '280px' }}><input type="text" value={section_42_data?.data?.rows[index][6]} readOnly /></td>
                                    //     <td colSpan={4} style={{ width: '350px' }}><textarea rows={4} readOnly style={{ height: '90px', direction: 'rtl' }}>{stripHtmlTags(section_42_data?.data?.rows[index][5])}</textarea></td>
                                    //     <td colSpan={2} style={{ paddingLeft: '21px' }}><input type="text" value={section_42_data?.data?.rows[index][2]} readOnly /></td>
                                    //     <input
                                    //         type="checkbox"
                                    //         checked={isChecked}
                                    //         aria-label="בחר שורה"
                                    //         value={isChecked.toString()}
                                    //         onChange={() => { }}
                                    //         readOnly
                                    //     />
                                    // </tr>

                                    <tr key={index} className={styles['section4_2']}>

                                        <td style={{ paddingRight: '25px', direction: 'ltr' }}>
                                            {matchedChapter ? `${matchedChapter.Chapter},${matchedChapter.Order0}` : '-'}
                                        </td>

                                        <td style={{ width: '170px' }}>
                                            {matchedChapter ? matchedChapter.Subject : '-'}
                                        </td>

                                        <td style={{ width: '280px' }}>
                                            <div className={styles.readOnlyField}>
                                                {section_42_data?.data?.rows[index][6]}
                                            </div>
                                        </td>

                                        <td colSpan={4} style={{ width: '350px' }}>
                                            <div className={styles.readOnlyFieldTextarea}>
                                                {stripHtmlTags(section_42_data?.data?.rows[index][5])}
                                            </div>
                                        </td>

                                        <td colSpan={2} style={{ paddingLeft: '21px' }}>
                                            <div className={styles.readOnlyField}>
                                                {section_42_data?.data?.rows[index][2]}
                                            </div>
                                        </td>

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

export default Section_42;
