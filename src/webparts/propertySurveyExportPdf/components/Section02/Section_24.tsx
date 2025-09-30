
import * as React from 'react';
import styles from './Section_24_25_26_27.module.scss';
import { formatDateToDDMMYYYY } from '../../Utility/utils';

// Rename the interface to avoid conflict with component name
interface Section24Props {
    Table_241: any;
    Table_242: any;
    Table_243: any;
    Table_244: any;
    Table_245: any;
    Table_246: any;
    Table_247: any;
    Table_248: any;
}

const Section_24: React.FC<Section24Props> = ({
    Table_241,
    Table_242,
    Table_243,
    Table_244,
    Table_245,
    Table_246,
    Table_247,
    Table_248
}) => {

    const getHebrewMonthLabel = (input: string): string => {
        if (!input) return "";

        const months = [
            "01 - ינואר", "02 - פברואר", "03 - מרץ", "04 - אפריל",
            "05 - מאי", "06 - יוני", "07 - יולי", "08 - אוגוסט",
            "09 - ספטמבר", "10 - אוקטובר", "11 - נובמבר", "12 - דצמבר"
        ];

        // 1. Check if already in "MM" format or "MM - <Hebrew>" format
        const monthOnly = input.trim().slice(0, 2);
        if (/^\d{2}$/.test(monthOnly) || /^\d{2} -/.test(input)) {
            const index = parseInt(monthOnly, 10) - 1;
            return months[index] || input;
        }

        // 2. Try parsing as full date
        const date = new Date(input);
        if (!isNaN(date.getTime())) {
            const monthIndex = date.getMonth();
            return months[monthIndex];
        }

        // 3. Fallback if nothing works
        return input;
    };

    return (
        <>
            <div>
                <div className={`${styles['section-container']}`}>
                    <div className={styles.header}>2.4 - תשלומים על הנכס </div>
                    {!Table_241?.isFirstRowEmpty && (
                        <>
                            <div style={{ display: 'flex' }}>
                                <div className={`${styles['sub-header']} ${styles.lable_direction_for_table} 'h_direction_24' 'pdf_lbl'`} style={{ width: '80%' }}>
                                    <span style={{ direction: 'ltr' }}>2.4.1 - מיסי עירייה ארנונה</span>
                                </div>
                            </div>
                            <div className={styles['table-wrapper']}>
                                <table id='table241'>
                                    <thead>
                                        <tr>
                                            <th>מס'</th>
                                            <th>שנה</th>
                                            <th>סכום התשלום</th>
                                            <th>עלות משוקללת למ"ר</th>
                                            <th>הערות</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Table_241?.data?.flags?.slice(0, 1)?.map((isChecked: any, index: any) => {

                                            const row = Table_241?.data?.rows[index];
                                            const requiredFields = [2, 3, 4, 5, 7];
                                            const isRowEmpty = requiredFields?.every(i => !row[i]);

                                            if (isRowEmpty) return null;

                                            return (
                                                <>
                                                    <tr key={index} className={styles.table_241}>
                                                        <td style={{float:'right'}} className={styles.table_241_td}><input style={{ width: "30px" }} type="text" value={index + 1} readOnly /></td>
                                                        <td className={styles.table_241_td}><input type="text" readOnly value={Table_241?.data?.rows[index][2] || ''} /></td>
                                                        <td className={styles.table_241_td}><input type="text" readOnly value={Table_241?.data?.rows[index][5]} /></td>
                                                        <td className={styles.table_241_td}><input type="text" readOnly value={Table_241?.data?.rows[index][6]} /></td>
                                                        <td><div><input style={{ width: "955px", direction: 'rtl', fontSize: '15px' }} type="text" readOnly value={Table_241?.data?.rows[index][8]} /></div></td>
                                                        <td className={styles.table_241_td}>
                                                            <input
                                                                type="checkbox"
                                                                checked={isChecked}
                                                                aria-label="בחר שורה"
                                                                value={isChecked.toString()}
                                                                onChange={() => { }}
                                                            />
                                                        </td>
                                                    </tr>
                                                </>
                                            )

                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </>

                    )}

                    {!Table_242?.isFirstRowEmpty && (
                        <>
                            <div style={{ display: 'flex', direction: 'ltr', justifyContent: 'end' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><label htmlFor="" style={{ fontSize: '15px', fontWeight: '600' }}>{Table_241?.data?.rows[0][2]}</label></div>
                                <div className={`${styles['sub-header']} 'h_direction_24' 'pdf_lbl'`} >2.4.2 - תאגיד המים</div>
                            </div>
                            <div className={styles['table-wrapper']}>
                                <table id='table242'>
                                    <thead>
                                        <tr>
                                            <th>מס'</th>
                                            <th>מתאריך</th>
                                            <th>עד תאריך</th>
                                            <th>סכום התשלום</th>
                                            <th>עלות ממוצעת של מ"ר לחודש</th>
                                            <th>הערות</th>
                                            {/* <th></th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Table_242?.data?.flags.slice(0, 6)?.map((isChecked: any, index: any) => {

                                            const row = Table_242?.data?.rows[index];
                                            const requiredFields = [2, 3, 4, 5, 7];
                                            const isRowEmpty = requiredFields.every(i => !row[i]);

                                            if (isRowEmpty) return null;

                                            return (
                                                <>
                                                    <tr key={index} className={styles.table_242}>
                                                        <td className={styles.table_242_td}>
                                                            <input style={{ width: "30px" }} type="text" value={index + 1} readOnly />
                                                        </td>
                                                        <td className={styles.table_242_td}>
                                                            <input className={styles.allInputFieldWidth} type="text" readOnly value={getHebrewMonthLabel(Table_242?.data?.rows[index][2])}/>
                                                        </td>
                                                        <td className={styles.table_242_td}>
                                                            <input className={styles.allInputFieldWidth} type="text" readOnly value={getHebrewMonthLabel(Table_242?.data?.rows[index][3])}/>
                                                        </td>
                                                        <td className={styles.table_242_td}>
                                                            <input className={styles.allInputFieldWidth} type="text" readOnly value={Table_242?.data?.rows[index][6]}/>
                                                        </td>
                                                        <td className={styles.table_242_td}>
                                                            <input className={styles.allInputFieldWidth} type="text" readOnly value={Table_242?.data?.rows[index][7]}/>
                                                        </td>
                                                        <td>
                                                            <div style={{float:'right'}}>
                                                                <input
                                                                    // style={{ width: "912px", fontSize: '15px' }}
                                                                    className={styles.lastFieldWidth}
                                                                    type="text"
                                                                    readOnly
                                                                    value={Table_242?.data?.rows[index][9]}
                                                                />
                                                            </div>
                                                        </td>
                                                        {/* <td className={styles.table_242_td}>
                                                            <input
                                                                type="checkbox"
                                                                checked={isChecked}
                                                                aria-label="בחר שורה"
                                                                value={isChecked.toString()}
                                                                onChange={() => { }}
                                                            />
                                                        </td> */}
                                                    </tr>
                                                </>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                    {!Table_243?.isFirstRowEmpty && (
                        <>
                            <div style={{ display: 'flex', direction: 'ltr', justifyContent: 'end' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><label htmlFor="" style={{ fontSize: '15px', fontWeight: '600' }}>{Table_241?.data?.rows[0][2]}</label></div>
                                <div className={`${styles['sub-header']} 'h_direction_24' 'pdf_lbl'`} >2.4.3 - חברת חשמל</div>
                            </div>
                            <div className={styles['table-wrapper']}>
                                <table id='table243'>
                                    <thead>
                                        <tr>
                                            <th>מס'</th>
                                            <th>מחודש</th>
                                            <th>עד חודש</th>
                                            <th>סכום התשלום</th>
                                            <th>עלות ממוצעת של מ"ר לחודש</th>
                                            <th>הערות</th>
                                            {/* <th></th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Table_243?.data?.flags.slice(0, 6)?.map((isChecked: any, index: any) => {

                                            const row = Table_243?.data?.rows[index];
                                            const requiredFields = [2, 3, 4, 5, 7];
                                            const isRowEmpty = requiredFields.every(i => !row[i]);

                                            if (isRowEmpty) return null;

                                            return (

                                                <>
                                                    <tr key={index} className={styles.table_243}>
                                                        <td className={styles.table_243_td}>
                                                            <input style={{ width: "30px" }} type="text" value={index + 1} readOnly />
                                                        </td>
                                                        <td className={styles.table_243_td}>
                                                            <input className={styles.allInputFieldWidth} type="text" readOnly value={getHebrewMonthLabel(Table_243?.data?.rows[index][2])} />
                                                        </td>
                                                        <td className={styles.table_243_td}>
                                                            <input className={styles.allInputFieldWidth} type="text" readOnly value={getHebrewMonthLabel(Table_243?.data?.rows[index][3])} />
                                                        </td>
                                                        <td className={styles.table_243_td}>
                                                            <input className={styles.allInputFieldWidth} type="text" readOnly value={Table_243?.data?.rows[index][6]} />
                                                        </td>
                                                        <td className={styles.table_243_td}>
                                                            <input className={styles.allInputFieldWidth} type="text" readOnly value={Table_243?.data?.rows[index][7]} />
                                                        </td>
                                                        <td>
                                                            <div style={{float:'right'}}>
                                                                <input
                                                                    // style={{ width: "744px", fontSize: '15px' }}
                                                                    className={styles.lastFieldWidth}
                                                                    type="text"
                                                                    readOnly
                                                                    value={Table_243?.data?.rows[index][9]}
                                                                />
                                                            </div>
                                                        </td>
                                                        {/* <td className={styles.table_243_td}>
                                                            <input
                                                                type="checkbox"
                                                                checked={isChecked}
                                                                aria-label="בחר שורה"
                                                                value={isChecked.toString()}
                                                                onChange={() => { }}
                                                            />
                                                        </td> */}
                                                    </tr>
                                                </>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                    {!Table_244?.isFirstRowEmpty && (

                        <>
                            <div className={`${styles['sub-header']} ${styles.lable_direction_for_table} 'h_direction_24' 'pdf_lbl'`}>2.4.4 - ניקיון</div>
                            <div className={styles['table-wrapper']}>
                                <table id='table244'>
                                    <thead>
                                        <tr>
                                            <th>מס'</th>
                                            <th>מחודש</th>
                                            <th>עד חודש</th>
                                            <th>סכום התשלום</th>
                                            <th>עלות ממוצעת של מ"ר לחודש</th>
                                            <th>הערות</th>
                                            {/* <th></th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Table_244?.data?.flags.slice(0, 6)?.map((isChecked: any, index: any) => {

                                            const row = Table_244?.data?.rows[index];
                                            const requiredFields = [2, 3, 4, 5, 7];
                                            const isRowEmpty = requiredFields.every(i => !row[i]);

                                            if (isRowEmpty) return null;

                                            return (

                                                <>
                                                    <tr key={index} className={styles.table_244}>
                                                        <td className={styles.table_244_td}>
                                                            <input style={{ width: "30px" }} type="text" value={index + 1} readOnly />
                                                        </td>
                                                        <td className={styles.table_244_td}>
                                                            <input className={styles.allInputFieldWidth} type="text" readOnly value={getHebrewMonthLabel(Table_244?.data?.rows[index][2])} />
                                                        </td>
                                                        <td className={styles.table_244_td}>
                                                            <input className={styles.allInputFieldWidth} type="text" readOnly value={getHebrewMonthLabel(Table_244?.data?.rows[index][3])} />
                                                        </td>
                                                        <td className={styles.table_244_td}>
                                                            <input className={styles.allInputFieldWidth} type="text" readOnly value={Table_244?.data?.rows[index][6]} />
                                                        </td>
                                                        <td className={styles.table_244_td}>
                                                            <input className={styles.allInputFieldWidth} type="text" readOnly value={Table_244?.data?.rows[index][7]} />
                                                        </td>
                                                        <td>
                                                            <div style={{float:'right'}}>
                                                                <input
                                                                    // style={{ width: "744px", fontSize: '15px' }}
                                                                    className={styles.lastFieldWidth}
                                                                    type="text"
                                                                    readOnly
                                                                    value={Table_244?.data?.rows[index][9]}
                                                                />
                                                            </div>
                                                        </td>
                                                        {/* <td className={styles.table_244_td}>
                                                            <input
                                                                type="checkbox"
                                                                checked={isChecked}
                                                                aria-label="בחר שורה"
                                                                value={isChecked.toString()}
                                                                onChange={() => { }}
                                                            />
                                                        </td> */}
                                                    </tr>
                                                </>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                    {!Table_245?.isFirstRowEmpty && (

                        <>
                            <div className={`${styles['sub-header']} ${styles.lable_direction_for_table} 'h_direction_24' 'pdf_lbl'`}>2.4.5 - אבטחה</div>
                            <div className={styles['table-wrapper']}>
                                <table id='table245'>
                                    <thead>
                                        <tr>
                                            <th>מס'</th>
                                            <th>מחודש</th>
                                            <th>עד חודש</th>
                                            <th>סכום התשלום</th>
                                            <th>עלות ממוצעת של מ"ר לחודש</th>
                                            <th>הערות</th>
                                            {/* <th></th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Table_245?.data?.flags.slice(0, 6)?.map((isChecked: any, index: any) => {

                                            const row = Table_245?.data?.rows[index];
                                            const requiredFields = [2, 3, 4, 5, 7];
                                            const isRowEmpty = requiredFields.every(i => !row[i]);

                                            if (isRowEmpty) return null;

                                            return (

                                                <>
                                                    <tr key={index} className={styles.table_245}>
                                                        <td className={styles.table_245_td}>
                                                            <input style={{ width: "30px" }} type="text" value={index + 1} readOnly />
                                                        </td>
                                                        <td className={styles.table_245_td}>
                                                            <input className={styles.allInputFieldWidth} type="text" readOnly value={getHebrewMonthLabel(Table_245?.data?.rows[index][2])} />
                                                        </td>
                                                        <td className={styles.table_245_td}>
                                                            <input className={styles.allInputFieldWidth} type="text" readOnly value={getHebrewMonthLabel(Table_245?.data?.rows[index][3])} />
                                                        </td>
                                                        <td className={styles.table_245_td}>
                                                            <input className={styles.allInputFieldWidth} type="text" readOnly value={Table_245?.data?.rows[index][6]} />
                                                        </td>
                                                        <td className={styles.table_245_td}>
                                                            <input className={styles.allInputFieldWidth} type="text" readOnly value={Table_245?.data?.rows[index][7]} />
                                                        </td>
                                                        <td>
                                                            <div style={{float:'right'}}>
                                                                <input
                                                                    // style={{ width: "744px", fontSize: '15px' }}
                                                                    className={styles.lastFieldWidth}
                                                                    type="text"
                                                                    readOnly
                                                                    value={Table_245?.data?.rows[index][9]}
                                                                />
                                                            </div>
                                                        </td>
                                                        {/* <td className={styles.table_245_td}>
                                                            <input
                                                                type="checkbox"
                                                                checked={isChecked}
                                                                aria-label="בחר שורה"
                                                                value={isChecked.toString()}
                                                                onChange={() => { }}
                                                            />
                                                        </td> */}
                                                    </tr>
                                                </>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                    {!Table_246?.isFirstRowEmpty && (
                        <>
                            <div className={`${styles['sub-header']} ${styles.lable_direction_for_table} 'h_direction_24' 'pdf_lbl'`}>2.4.6 - ועד הביניין</div>
                            <div className={styles['table-wrapper']}>
                                <table id='table246'>
                                    <thead>
                                        <tr>
                                            <th>מס'</th>
                                            <th>מחודש</th>
                                            <th>עד חודש</th>
                                            <th>סכום התשלום</th>
                                            <th>עלות ממוצעת למ"ר</th>
                                            <th>הערות</th>
                                            {/* <th></th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Table_246?.data?.flags.slice(0, 6)?.map((isChecked: any, index: any) => {

                                            const row = Table_246?.data?.rows[index];
                                            const requiredFields = [2, 3, 4, 5, 7];
                                            const isRowEmpty = requiredFields.every(i => !row[i]);

                                            if (isRowEmpty) return null;

                                            return (

                                                <>
                                                    <tr key={index} className={styles.table_246}>
                                                        <td className={styles.table_246_td}>
                                                            <input style={{ width: "30px" }} type="text" value={index + 1} readOnly />
                                                        </td>
                                                        <td className={styles.table_246_td}>
                                                            <input className={styles.allInputFieldWidth} type="text" readOnly value={getHebrewMonthLabel(Table_246?.data?.rows[index][2])} />
                                                        </td>
                                                        <td className={styles.table_246_td}>
                                                            <input className={styles.allInputFieldWidth} type="text" readOnly value={getHebrewMonthLabel(Table_246?.data?.rows[index][3])} />
                                                        </td>
                                                        <td className={styles.table_246_td}>
                                                            <input className={styles.allInputFieldWidth} type="text" readOnly value={Table_246?.data?.rows[index][6]} />
                                                        </td>
                                                        <td className={styles.table_246_td}>
                                                            <input className={styles.allInputFieldWidth} type="text" readOnly value={Table_246?.data?.rows[index][7]} />
                                                        </td>
                                                        <td>
                                                            <div style={{float:'right'}}>
                                                                <input
                                                                    // style={{ width: "744px", fontSize: '15px' }}
                                                                    className={styles.lastFieldWidth}
                                                                    type="text"
                                                                    readOnly
                                                                    value={Table_246?.data?.rows[index][9]}
                                                                />
                                                            </div>
                                                        </td>
                                                        {/* <td className={styles.table_246_td}>
                                                            <input
                                                                type="checkbox"
                                                                checked={isChecked}
                                                                aria-label="בחר שורה"
                                                                value={isChecked.toString()}
                                                                onChange={() => { }}
                                                            />
                                                        </td> */}
                                                    </tr>
                                                </>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>


                <div className={`${styles['section-container']}`}>
                    {!Table_247?.isFirstRowEmpty && (

                        <>
                            <div className={`${styles['sub-header']} ${styles.lable_direction_for_table} 'h_direction_24' 'pdf_lbl'`}>2.4.7 - חניות</div>
                            <div className={styles['table-wrapper']}>
                                <table id='table247'>
                                    <thead>
                                        <tr>
                                            <th>מס'</th>
                                            <th>מתאריך</th>
                                            <th>עד תאריך</th>
                                            <th>סכום התשלום</th>
                                            <th>עלות למקום חניה לחודש</th>
                                            <th>הערות</th>
                                            {/* <th></th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Table_247?.data?.flags?.map((isChecked: any, index: any) => (
                                            <tr key={index} className={styles.table_247}>
                                                <td className={styles.table_247_td}>
                                                    <input style={{ width: "30px" }} type="text" value={index + 1} readOnly />
                                                </td>
                                                <td className={styles.table_247_td}>
                                                    <input className={styles.allInputFieldWidth} type="text" readOnly value={formatDateToDDMMYYYY(Table_247?.data?.rows[index][2])} />
                                                </td>
                                                <td className={styles.table_247_td}>
                                                    <input className={styles.allInputFieldWidth} type="text" readOnly value={formatDateToDDMMYYYY(Table_247?.data?.rows[index][3])} />
                                                </td>
                                                <td className={styles.table_247_td}>
                                                    <input className={styles.allInputFieldWidth} type="text" readOnly value={Table_247?.data?.rows[index][4]} />
                                                </td>
                                                <td className={styles.table_247_td}>
                                                    <input className={styles.allInputFieldWidth} type="text" readOnly value={Table_247?.data?.rows[index][5]} />
                                                </td>
                                                <td>
                                                    <div style={{float:'right'}}>
                                                        <input
                                                            // style={{ width: "744px", fontSize: '15px' }}
                                                            className={styles.lastFieldWidth}
                                                            type="text"
                                                            readOnly
                                                            value={Table_247?.data?.rows[index][7]}
                                                        />
                                                    </div>
                                                </td>
                                                {/* <td className={styles.table_247_td}>
                                                    <input
                                                        type="checkbox"
                                                        checked={isChecked}
                                                        aria-label="בחר שורה"
                                                        value={isChecked.toString()}
                                                        onChange={() => { }}
                                                    />
                                                </td> */}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                    {!Table_248?.isFirstRowEmpty && (
                        <>
                            <div className={`${styles['sub-header']} ${styles.lable_direction_for_table} 'h_direction_24' 'pdf_lbl'`}>להוסיף אחר... - 2.4.8</div>
                            <div className={styles['table-wrapper']}>
                                <table id='table248'>
                                    <thead>
                                        <tr>
                                            <th>מס'</th>
                                            <th>מתאריך</th>
                                            <th>עד תאריך</th>
                                            <th>עלות ליח'</th>
                                            <th>עלות ל-ר"נ</th>
                                            <th>הערות</th>
                                            {/* <th></th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Table_248?.data?.flags?.map((isChecked: any, index: any) => {

                                            const row = Table_248?.data?.rows[index];
                                            const requiredFields = [2, 3, 4, 5, 7];
                                            const isRowEmpty = requiredFields.every(i => !row[i]);
                                            if (isRowEmpty) return null;
                                            return (
                                                <>
                                                    <tr key={index} className={styles.table_248}>
                                                        <td className={styles.table_248_td}>
                                                            <input style={{ width: "30px" }} type="text" value={index + 1} readOnly />
                                                        </td>
                                                        <td className={styles.table_248_td}>
                                                            <input className={styles.allInputFieldWidth} type="text" readOnly value={formatDateToDDMMYYYY(Table_248?.data?.rows[index][2])} />
                                                        </td>
                                                        <td className={styles.table_248_td}>
                                                            <input className={styles.allInputFieldWidth} type="text" readOnly value={formatDateToDDMMYYYY(Table_248?.data?.rows[index][3])} />
                                                        </td>
                                                        <td className={styles.table_248_td}>
                                                            <input className={styles.allInputFieldWidth} type="text" readOnly value={Table_248?.data?.rows[index][4]} />
                                                        </td>
                                                        <td className={styles.table_248_td}>
                                                            <input className={styles.allInputFieldWidth} type="text" readOnly value={Table_248?.data?.rows[index][5]} />
                                                        </td>
                                                        <td>
                                                            <div style={{float:'right'}}>
                                                                <input
                                                                    // style={{ width: "744px", fontSize: '15px' }}
                                                                    className={styles.lastFieldWidth}
                                                                    type="text"
                                                                    readOnly
                                                                    value={Table_248?.data?.rows[index][7]}
                                                                />
                                                            </div>
                                                        </td>
                                                        {/* <td className={styles.table_248_td}>
                                                            <input
                                                                type="checkbox"
                                                                checked={isChecked}
                                                                aria-label="בחר שורה"
                                                                value={isChecked.toString()}
                                                                onChange={() => { }}
                                                            />
                                                        </td> */}
                                                    </tr>
                                                </>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>
            </div >
        </>
    );
};

export default Section_24;
