import * as React from 'react';
import styles from './Section02.module.scss';
import { formatDateToDDMMYYYY } from '../../Utility/utils';


interface FirstSectionProps {
    listitems: any;
    Lookup_Field_Section_1: any;
    Lookup_Field_Section_2: any;
    Lease_Expiration_Date: any;
    ContractNumber: string | any;
}

const FirstSection: React.FC<FirstSectionProps> = ({ listitems, Lookup_Field_Section_1, Lookup_Field_Section_2, Lease_Expiration_Date, ContractNumber }) => {

    function stripHtmlTags(html: string) {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    }


    const formatDate = (dateString: string): string => {
        if (!dateString) return '';

        try {
            const date = new Date(dateString);

            if (isNaN(date.getTime())) {
                return 'Invalid Date';
            }

            // Alternative to padStart - manually add leading zero
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            // Add leading zero manually
            const formattedDay = day < 10 ? '0' + day : day.toString();
            const formattedMonth = month < 10 ? '0' + month : month.toString();

            return `${formattedDay}/${formattedMonth}/${year}`;
        } catch (error) {
            console.error('Error formatting date:', error);
            return '';
        }
    };

    return (
        <>
            <div id='section2'>
                {/*פרטי הנכס, נתונים כמותיים של הנכס - 2.3, 2.2, 2.1*/}
                <div className={styles['container-section']}>
                    <div className={styles['header-section']}>
                        נתוני הנכס ותיאור
                    </div>
                    <div className={styles['sub-header-section']}>
                        פרטי הנכס, נתונים כמותיים של הנכס - 2.3, 2.2, 2.1
                    </div>

                    {/* First Row  */}
                    <div className={styles['section-21-22-23-Row-Container']}>
                        <div className={styles['form-group-section']}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '5px' }}>
                                <label>מספר ישות עסקית</label>
                                <input type="checkbox" style={{ width: '15px', height: '25px', marginTop: '10px' }} readOnly />
                            </div>
                            <input type="text" value={listitems?.BusinessEntity} readOnly />
                        </div>

                        <div className={styles['form-group-section']}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '5px' }}>
                                <label>כתובת (ישוב, רחוב ומספר בית)</label>
                                <input type="checkbox" style={{ width: '15px', height: '25px', marginTop: '0' }} readOnly />
                            </div>
                            <input type="text" value={Lookup_Field_Section_1[10]} readOnly />
                        </div>

                        <div className={styles['form-group-section']}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '5px' }}>
                                <label>שם היחידה/יחידות מאוכלסות</label>
                                <input type="checkbox" style={{ width: '15px', height: '25px', marginTop: '0' }} readOnly />
                            </div>
                            <input type="text" value={stripHtmlTags(Lookup_Field_Section_1[9])} readOnly />
                        </div>
                    </div>

                    {/* Second row  */}
                    <div className={styles['section-21-22-23-Row-Container']}>
                        <div className={styles['form-group-section']}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '5px' }}>
                                {/* <label>גוש</label> */}
                                <label> מועד סיום חוזה תחזוקה</label>
                                <input type="checkbox" style={{ width: '15px', height: '25px', marginTop: '0' }} readOnly />
                            </div>
                            <input type="text" value={formatDate(Lease_Expiration_Date)} readOnly />
                        </div>

                        <div className={styles['form-group-section']}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '5px' }}>
                                {/* <label>חלקה</label> */}
                                <label>מספר חוזה</label>
                                <input type="checkbox" style={{ width: '15px', height: '25px', marginTop: '0' }} readOnly />
                            </div>
                            <input type="text" value={ContractNumber} readOnly />
                        </div>

                        <div className={styles['form-group-section']}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '5px' }}>
                                <label>שם המבנה </label>
                                <input type="checkbox" style={{ width: '15px', height: '25px', marginTop: '0' }} readOnly />
                            </div>
                            <input type="text" value={Lookup_Field_Section_1[6]} readOnly />
                        </div>
                    </div>

                    {/* Third row  */}
                    <div className={styles['section-21-22-23-Row-Container']}>
                        <div className={styles['form-group-section']} style={{ maxWidth: '31.8vw' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '5px' }}>
                                <label>תיאור המבנה</label>
                                <input type="checkbox" style={{ width: '15px', height: '25px', marginTop: '0' }} readOnly />
                            </div>
                            <input type="text" value={stripHtmlTags(Lookup_Field_Section_1[5])} readOnly />
                        </div>
                        {/* 29.7 */}
                        <div className={styles['form-group-section']} style={{ maxWidth: '31.8vw' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '5px' }}>
                                <label>מועד סיום שכירות</label>
                                <input type="checkbox" style={{ width: '15px', height: '25px', marginTop: '0' }} readOnly />
                            </div>
                            <input type="text" value={formatDateToDDMMYYYY(Lookup_Field_Section_1[3])} readOnly />
                        </div>
                    </div>

                    {/*  fourth row  */}
                    <div className={styles['section-21-22-23-Row-Container']} style={{ width: '66%' }}>
                        <div className={`${styles['form-group-section']} ${styles['fourthRowFirst_Last_Col']}`} >
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '5px' }}>
                                <label>סוג הנכס</label>
                                <input type="checkbox" style={{ width: '15px', height: '25px', marginTop: '0' }} readOnly />
                            </div>
                            <input type="text" value={Lookup_Field_Section_1[2]} readOnly />
                        </div>

                        <div className={styles['form-group-section']}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '5px' }}>
                                <label>תיאור כללי</label>
                                <input type="checkbox" style={{ width: '15px', height: '25px', marginTop: '0' }} readOnly />
                            </div>
                            {/* <textarea rows={5} value={Lookup_Field_Section_1[1]} readOnly /> */}
                            <textarea rows={5} value={stripHtmlTags(Lookup_Field_Section_1[1])} readOnly />
                        </div>

                        {/* <div className={`${styles['form-group-section']} ${styles['fourthRowFirst_Last_Col']}`}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <label>אזור / שכונה </label>
                                <input type="checkbox" style={{ width: '15px', height: '25px', marginTop: '0' }} readOnly />
                            </div>
                            <input type="text" value={Lookup_Field_Section_1[0]} readOnly />
                        </div> */}
                    </div>
                </div>
            </div>

            <div>
                <div className={styles['container-section']}>
                    <div className={styles['form-row-section-after-21-22-23']} style={{
                        marginTop: "17px", marginLeft: "15px",
                        marginRight: "15px"
                    }}>

                        {/* <div className={styles['form-group-section']} style={{ maxWidth: "33%" }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <label>תיאור השירות (למי ניתן השירות)</label>
                                <input type="checkbox" style={{ width: "15px", height: "25px", marginTop: 0 }} readOnly />
                            </div>
                            <input type="text"  value={Lookup_Field_Section_2[21]} readOnly />
                        </div> */}
                    </div>

                    <div className={styles['form-row-section-after-21-22-23']} style={{
                        marginTop: "17px", marginLeft: "15px",
                        marginRight: "15px"
                    }}>
                        {/* <div className={styles['form-group-section']}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <label>קהל היעד</label>
                                <input type="checkbox" style={{ width: "15px", height: "25px", marginTop: 0 }} readOnly />
                            </div>
                            <input type="text"  value={Lookup_Field_Section_2[20]} readOnly />
                        </div> */}

                        {/* <div className={styles['form-group-section']}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <label>מספר מקבלי שירות</label>
                                <input type="checkbox" style={{ width: "15px", height: "25px", marginTop: 0 }} readOnly />
                            </div>
                            <input type="text"  value={Lookup_Field_Section_2[19]} readOnly />
                        </div> */}

                        <div className={styles['form-group-section']} style={{ maxWidth: '33%' }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <label>שעות פעילות </label>
                                <input type="checkbox" style={{ width: "15px", height: "25px", marginTop: 0 }} readOnly />
                            </div>
                            <input type="text" value={Lookup_Field_Section_2[18]} readOnly />
                        </div>

                    </div>

                    <div className={styles['form-row-section-after-21-22-23']} style={{
                        marginTop: "17px", marginLeft: "15px",
                        marginRight: "15px"
                    }}>
                        <div className={styles['form-group-section']}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <label>שטח מ"ר בחוזה השכירות</label>
                                <input type="checkbox" style={{ width: "15px", height: "25px", marginTop: 0 }} readOnly />
                            </div>
                            <input type="text" value={Lookup_Field_Section_2[17]} readOnly />
                        </div>

                        <div className={styles['form-group-section']}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <label>מספר הקומות בנכס </label>
                                {/* <label>שטח כולל היחידה+המגרש</label> */}
                                <input type="checkbox" style={{ width: "15px", height: "25px", marginTop: 0 }} readOnly />
                            </div>
                            <input type="text" value={Lookup_Field_Section_2[16]} readOnly />
                        </div>

                        <div className={styles['form-group-section']}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <label> הקומה בה נמצאת היחידה </label>
                                <input type="checkbox" style={{ width: "15px", height: "25px", marginTop: 0 }} readOnly />
                            </div>
                            <input type="text" value={Lookup_Field_Section_2[15]} readOnly />
                        </div>
                    </div>

                    <div className={styles['form-row-section-after-21-22-23']} style={{
                        marginTop: "17px", marginLeft: "15px",
                        marginRight: "15px"
                    }}>
                        {/* <div className={styles['form-group-section']}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <label> מספר חדרים / משרדים למתן שירות</label>
                                <input type="checkbox" style={{ width: "15px", height: "25px", marginTop: 0 }} readOnly />
                            </div>
                            <input type="text"  value={Lookup_Field_Section_2[14]} readOnly />
                        </div> */}

                        {/* <div className={styles['form-group-section']}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <label>(שטח המגרש - שטח פתוח מ"ר) </label>
                                <input type="checkbox" style={{ width: "15px", height: "25px", marginTop: 0 }} readOnly />
                            </div>
                            <input type="text"  value={Lookup_Field_Section_2[13]} readOnly />
                        </div> */}

                        <div className={styles['form-group-section']} style={{ maxWidth: '33%' }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <label> מקומות חניה צמודים למבנה / בהסדר </label>
                                <input type="checkbox" style={{ width: "15px", height: "25px", marginTop: 0 }} readOnly />
                            </div>
                            <input type="text" value={Lookup_Field_Section_2[12]} readOnly />
                        </div>
                    </div>


                    <div className={styles['form-row-section-after-21-22-23']} style={{
                        marginTop: "17px", marginLeft: "15px",
                        marginRight: "15px"
                    }}>
                        <div className={styles['form-group-section']}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <label> מקומות חניה - לאנשים עם מוגבלות </label>
                                <input type="checkbox" style={{ width: "15px", height: "25px", marginTop: 0 }} readOnly />
                            </div>
                            <input type="text" value={Lookup_Field_Section_2[11]} readOnly />
                        </div>

                        <div className={styles['form-group-section']}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <label> מקומות חניה - לעובדים </label>
                                <input type="checkbox" style={{ width: "15px", height: "25px", marginTop: 0 }} readOnly />
                            </div>
                            <input type="text" value={Lookup_Field_Section_2[10]} readOnly />
                        </div>

                        <div className={styles['form-group-section']}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <label> מקומות חניה - לאורחים / קהל </label>
                                <input type="checkbox" style={{ width: "15px", height: "25px", marginTop: 0 }} readOnly />
                            </div>
                            <input type="text" value={Lookup_Field_Section_2[9]} readOnly />
                        </div>

                    </div>


                    <div className={styles['form-row-section-after-21-22-23']} style={{
                        marginTop: "17px", marginLeft: "15px",
                        marginRight: "15px"
                    }}>
                        <div className={styles['form-group-section']}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <label>מקומות חניה של המשרד בנכס </label>
                                <input type="checkbox" style={{ width: "15px", height: "25px", marginTop: 0 }} readOnly />
                            </div>
                            <input type="text" value={Lookup_Field_Section_2[8]} readOnly />
                        </div>

                        <div className={styles['form-group-section']}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <label> מספר עובדים בנכס</label>
                                <input type="checkbox" style={{ width: "15px", height: "25px", marginTop: 0 }} readOnly />
                            </div>
                            <input type="text" value={Lookup_Field_Section_2[7]} readOnly />
                        </div>

                        <div className={styles['form-group-section']}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <label> שם החברה לניהול/תחזוקת הנכס </label>
                                <input type="checkbox" style={{ width: "15px", height: "25px", marginTop: 0 }} readOnly />
                            </div>
                            <input type="text" value={Lookup_Field_Section_2[6]} readOnly />
                        </div>
                    </div>

                    <div className={styles['form-row-section-after-21-22-23']} style={{
                        marginTop: "17px", marginLeft: "15px",
                        marginRight: "15px"
                    }}>
                        <div className={styles['form-group-section']}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <label>מס עובדים מתחזקים את הנכס ובאיזה משרה? מלאה/חלקית </label>
                                <input type="checkbox" style={{ width: "15px", height: "25px", marginTop: 0 }} readOnly />
                            </div>
                            <input type="text" value={Lookup_Field_Section_2[5]} readOnly />
                        </div>

                        <div className={styles['form-group-section']}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <label>סוג מבנה</label>
                                <input type="checkbox" style={{ width: "15px", height: "25px", marginTop: 0 }} readOnly />
                            </div>
                            <input type="text" value={listitems?.SealStructure.split('||')[0]} readOnly />
                        </div>

                        <div className={styles['form-group-section']}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <label>סוג גג ואיטום </label>
                                <input type="checkbox" style={{ width: "15px", height: "25px", marginTop: 0 }} readOnly />
                            </div>
                            <input type="text" value={listitems?.SealStructure.split('||')[1]} readOnly />
                        </div>

                    </div>

                    <div className={styles['form-row-section-after-21-22-23']} style={{
                        marginTop: "17px", marginLeft: "15px",
                        marginRight: "15px"
                    }}>

                        {/* <div className={styles['form-group-section']} style={{ maxWidth: "33%" }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <label>מספר מבנה</label>
                                <input type="checkbox" style={{ width: "15px", height: "25px", marginTop: 0 }} readOnly />
                            </div>
                            <input type="text"  value={Lookup_Field_Section_2[2]} readOnly />
                        </div> */}

                        <div className={styles['form-group-section']} style={{ maxWidth: "33%" }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <label>מספר קומה</label>
                                <input type="checkbox" style={{ width: "15px", height: "25px", marginTop: 0 }} readOnly />
                            </div>
                            <input type="text" value={Lookup_Field_Section_2[1]} readOnly />
                        </div>

                        <div className={styles['form-group-section']} style={{ maxWidth: '33%' }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <label>שטח המשרדים בארנונה</label>
                                <input type="checkbox" style={{ width: "15px", height: "25px", marginTop: 0, marginLeft: '5px' }} readOnly />
                            </div>
                            <input type="text" value={Lookup_Field_Section_2[0]} readOnly />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FirstSection;