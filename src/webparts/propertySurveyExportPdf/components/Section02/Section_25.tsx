
import * as React from 'react';
import styles from './Section_24_25_26_27.module.scss';


interface Section25Props {
    section_25_data: any;
    NumberofOps: any;
}

const AvivAppLogologo = require('../Image/AvivAppLogo.jpg')
const AvivLogo = require('../Image/AvivLogo.png')

const Section_25: React.FC<Section25Props> = ({
    section_25_data,
    NumberofOps,
}) => {
    console.log(section_25_data);
    return (
        <>
            <div>
                {/* <div className="header-main">
                    <img src={AvivAppLogologo} alt="AVIV Logo" className="logo" />
                    <div className="center-info">
                        מינהלת הנכסים<br />
                        <a href="#">משרד הבריאות</a><br />
                        <span>אגף הנכסים</span>
                    </div>
                    <img src={AvivLogo} alt="Ministry Logo" className="logo" />
                </div> */}
                <div className="section-container page-section01">
                    <div className="header-main">
                        <img src={AvivAppLogologo} alt="AVIV Logo" className="logo" />
                        <div className="center-info">
                            מינהלת הנכסים<br />
                            <a href="#">משרד הבריאות</a><br />
                            <span>אגף הנכסים</span>
                        </div>
                        <img src={AvivLogo} alt="Ministry Logo" className="logo" />
                    </div>
                    <div className="header h_direction_24">2.5 -בעלי תפקידים בניהול ותחזוקת הנכס</div>
                    <div className="table-wrapper">
                        <table id='table25'>
                            <thead>
                                <tr>
                                    <th className={styles.section25th}>תפקיד</th>
                                    <th className={styles.section25th}>שם פרטי ושם משפחה</th>
                                    <th className={styles.section25th}>טלפון סלולרי</th>
                                    <th className={styles.section25th}>מספר טלפון משרד</th>
                                    <th className={styles.section25th}>כתובת מייל</th>
                                    <th className={styles.section25th}>הערות</th>
                                </tr>
                            </thead>
                            <tbody>
                                {section_25_data?.data?.flags?.map((isChecked: any, index: any) => {
                                    const row = section_25_data?.data?.rows[index];
                                    // [1, 2, 3, 4, 5, 6]
                                    const isRowEmpty = [1, 2, 3, 4, 5].every(colIndex => {
                                        const cellValue = row[colIndex];
                                        return cellValue === null || cellValue === undefined || cellValue?.toString()?.trim() === '';
                                    });
                                    if (isRowEmpty) return null;
                                    return (

                                        // <tr>
                                        //     <td className={styles.section25td}>
                                        //         <input type="text" readOnly value={section_25_data?.data?.rows[index][6]} style={{ position: "relative", bottom: "25px", borderRadius: '4px' }} />
                                        //     </td>
                                        //     <td className={styles.section25td}>
                                        //         <input type="text" readOnly value={section_25_data?.data?.rows[index][5]} style={{ position: "relative", bottom: "25px", borderRadius: '4px' }} />
                                        //     </td>
                                        //     <td className={styles.section25td} style={{ width: '145px' }}>
                                        //         <input type="text" readOnly value={section_25_data?.data?.rows[index][4]} style={{ position: "relative", bottom: "25px", borderRadius: '4px' }} />
                                        //     </td>
                                        //     <td className={styles.section25td} style={{ width: '145px' }}>
                                        //         <input type="text" readOnly value={section_25_data?.data?.rows[index][3]} style={{ position: "relative", bottom: "25px", borderRadius: '4px' }} />
                                        //     </td>
                                        //     <td className={styles.section25td}>
                                        //         <input type="text" readOnly value={section_25_data?.data?.rows[index][2]} style={{ position: "relative", bottom: "25px" }} />
                                        //     </td>
                                        //     <td style={{ float: 'right', minWidth: '100%' }} className={styles.section25td}>
                                        //         <textarea rows={4} readOnly value={section_25_data?.data?.rows[index][1]} cols={50} style={{ borderRadius: '4px', fontSize: '15px' }}>
                                        //         </textarea></td>
                                        // </tr>

                                        <tr>
                                            <td className={styles.section25td} style={{ width: '257px', fontWeight: 'normal' }}>
                                                <div className={styles.section25Box}>
                                                    {section_25_data?.data?.rows[index][6]}
                                                </div>
                                            </td>

                                            <td className={styles.section25td} style={{ width: '257px' }}>
                                                <div className={styles.section25Box}>
                                                    {section_25_data?.data?.rows[index][5]}
                                                </div>
                                            </td>

                                            <td className={styles.section25td} style={{ width: '257px' }}>
                                                <div className={styles.section25Box}>
                                                    {section_25_data?.data?.rows[index][4]}
                                                </div>
                                            </td>

                                            <td className={styles.section25td} style={{ width: '257px' }}>
                                                <div className={styles.section25Box}>
                                                    {section_25_data?.data?.rows[index][3]}
                                                </div>
                                            </td>

                                            <td className={styles.section25td} style={{ width: '257px' }}>
                                                <div className={styles.section25Box}>
                                                    {section_25_data?.data?.rows[index][2]}
                                                </div>
                                            </td>

                                            <td className={styles.section25td} style={{ width: '30%' }}>
                                                <div className={styles.section25TextAreaBox}>
                                                    {section_25_data?.data?.rows[index][1]}
                                                </div>
                                            </td>
                                        </tr>

                                    )
                                })}
                            </tbody>
                        </table>

                        <div className={styles['maintenance-detail']} style={{ display: 'none' }}>
                            <div className={styles.sec_25_last_lbl}>להוסיף שורה</div>

                            <div className={styles.sec_25_fld_lst_containder}>
                                <label htmlFor="" style={{ marginRight: "30px" }}>מספר עובדי תפעול ואחזקה</label>
                                <input type="checkbox" readOnly aria-label="בחר שורה" />
                            </div>
                            <input style={{ width: "777px", display: 'flex' }} type="text" readOnly value={NumberofOps} />
                        </div>
                    </div>
                </div>
            </div >

        </>
    );
};

export default Section_25;
